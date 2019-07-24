using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Impl.Matchers;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Quartzmin.Models;

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


        [HttpGet("{name}")]
        public async Task<ActionResult> GetCalendarDetail([FromRoute] string name, [FromQuery] string group)
        {
            var detail = await GetTriggerDetail(name, group);

            if (detail == null)
            {
                return NotFound();
            }

            return Ok(detail);
        }

        [HttpPut("{name}")]
        public async Task<ActionResult> UpdateCalendar([FromRoute] string name, [FromQuery] string group)
        {
            var detail = await GetTriggerDetail(name, group);

            if (detail == null)
            {
                return NotFound();
            }

            return Ok(detail);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCalendar([FromQuery] int? year, [FromQuery] string ticker)
        {
            return Ok();
        }

        [HttpDelete("{name}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<object>> DeleteCalendar([FromRoute] string name)
        {
            ICalendar calendar = await _scheduler.GetCalendar(name);

            if (calendar == null)
            {
                return NotFound();
            }

            await _scheduler.DeleteCalendar(name);

            return NoContent();
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
    }
}
