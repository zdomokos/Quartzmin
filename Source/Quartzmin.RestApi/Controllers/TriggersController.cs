using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Impl.Matchers;
using System.Linq;
using Quartzmin.Models;
using Quartzmin.RestApi.Dto;
using System.Net;

namespace Quartzmin.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriggersController : ControllerBase
    {
        private readonly IScheduler _scheduler;

        public TriggersController(IScheduler scheduler)
        {
            _scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }

        [HttpGet("groups")]
        public async Task<ActionResult<IEnumerable<string>>> GetGroupNames()
        {
            var groupNames = await this._scheduler.GetTriggerGroupNames();

            return Ok(groupNames);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTriggers()
        {
            var triggerKeys = (await _scheduler.GetTriggerKeys(GroupMatcher<TriggerKey>.AnyGroup())).OrderBy(x => x.ToString());

            var asyncTriggers = triggerKeys.Select(async key =>
            {
                var detail = await GetTriggerDetail(key);
                var state = await this._scheduler.GetTriggerState(key);

                return new
                {
                    name = key.Name,
                    group = key.Group,
                    isPaused = state == TriggerState.Paused,
                    state,
                    jobKey = detail.JobKey.ToString(),
                    jobGroup = detail.JobKey.Group,
                    jobName = detail.JobKey.Name,
                    // scheduleDescription = detail.GetScheduleDescription(),
                    history = Histogram.Empty,
                    startTime = detail.StartTimeUtc.UtcDateTime,
                    endTime = detail.FinalFireTimeUtc?.UtcDateTime,
                    lastFireTime = detail.GetPreviousFireTimeUtc()?.UtcDateTime,
                    nextFireTime = detail.GetNextFireTimeUtc()?.UtcDateTime,
                    clrType = detail.GetType().Name,
                    description = detail.Description,
                };
            });

            var triggers = await Task.WhenAll(asyncTriggers);

            return Ok(triggers);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<object>>> CreateTrigger(TriggerDto triggerDto)
        {
            ITrigger trigger = BuildTriggerFromDto(triggerDto);
            await this._scheduler.ScheduleJob(trigger);

            return Ok(trigger);
        }

        [HttpPut("{triggerGroupAndName}")]
        public async Task<ActionResult<object>> UpdateTrigger([FromRoute]string groupAndName, TriggerDto triggerDto)
        {
            ITrigger trigger = BuildTriggerFromDto(triggerDto);
            var (groupName, triggerName) = GetGroupAndTriggerName(groupAndName);
            await this._scheduler.RescheduleJob(new TriggerKey(triggerName, groupName), trigger);

            return Ok(trigger);
        }

        private ITrigger BuildTriggerFromDto(TriggerDto triggerDto)
        {
            var builder = TriggerBuilder.Create()
                .WithIdentity(new TriggerKey(triggerDto.Name, triggerDto.Group))
                .ForJob(triggerDto.Job)
                .UsingJobData(GetQuartzJobDataMap(triggerDto))
                .WithDescription(triggerDto.Description)
                .WithPriority(triggerDto.PriorityOrDefault);

            // builder.StartAt(triggerModel.GetStartTimeUtc() ?? DateTime.UtcNow);
            // builder.EndAt(triggerModel.GetEndTimeUtc());

            var trigger = builder.Build();
            return trigger;
        }

        private JobDataMap GetQuartzJobDataMap(TriggerDto trigger)
        {
            var dataMap = new JobDataMap();

            foreach (var item in trigger.DataMap)
            {
                var value = 0;
                dataMap.Add(item.Name, value);
            }

            return dataMap;
        }

        private object GetScheduleData(ITrigger trigger)
        {
            if (trigger is ICronTrigger cr)
            {
                return new
                {
                    trigger.Description
                };
            }

            return trigger;
/*
                return CronExpressionDescriptor.ExpressionDescriptor.GetDescription(cr.CronExpressionString);
            if (trigger is IDailyTimeIntervalTrigger dt)
                return GetScheduleDescription(dt);
            if (trigger is ISimpleTrigger st)
                return GetScheduleDescription(st);
            if (trigger is ICalendarIntervalTrigger ct)
                return GetScheduleDescription(ct.RepeatInterval, ct.RepeatIntervalUnit);
*/
        }

        private async Task<ITrigger> GetTriggerDetail(TriggerKey triggerKey)
        {
            ITrigger trigger = await _scheduler.GetTrigger(triggerKey);
            return trigger;
        }

        private async Task<ITrigger> GetTriggerDetail(string name, string group)
        {
            TriggerKey key = group != null ? new TriggerKey(name, group) : new TriggerKey(name);
            return await GetTriggerDetail(key);
        }

        private (string, string) GetGroupAndTriggerName(string encodedUri)
        {
            var decoded = WebUtility.UrlDecode(encodedUri);
            var urlParts = decoded.Split("/");

            return (urlParts[0], urlParts[1]);
        }
    }
}
