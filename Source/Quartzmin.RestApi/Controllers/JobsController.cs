using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Impl.Matchers;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Quartz.Plugins.RecentHistory;

namespace Quartzmin.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly IScheduler _scheduler;

        public JobsController(IScheduler scheduler)
        {
            this._scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }

        [HttpGet("running")]
        public async Task<ActionResult<IEnumerable<object>>> GetRunningJobs()
        {
            var running = await this._scheduler.GetCurrentlyExecutingJobs();

            return Ok(running);
        }

        [HttpPost("running/{id}/interrupt")]
        public async Task<ActionResult<IEnumerable<object>>> StopRunningJob(string id)
        {
            var running = await this._scheduler.Interrupt(id);

            return NoContent();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetSchedulerJobs()
        {
            var jobKeys = await this._scheduler.GetJobKeys(GroupMatcher<JobKey>.AnyGroup());

            var asyncJobs = jobKeys.Select(async key => 
            {
                var detail = await GetJobDetail(key.Name, key.Group);

                var triggers = await this._scheduler.GetTriggersOfJob(key);
                var nextFires = triggers.Select(x => x.GetNextFireTimeUtc()?.UtcDateTime).ToArray();
                Dictionary<string, ExecutionHistoryEntry> historyByJob = await GetJobHistory();

                return new
                {
                    name = key.Name,
                    group = key.Group,
                    concurrent = !detail.ConcurrentExecutionDisallowed,
                    persist = detail.PersistJobDataAfterExecution,
                    recovery = detail.RequestsRecovery,
                    type = detail.JobType.FullName,
                    description = detail.Description,
                    History = historyByJob?.GetValueOrDefault(key.ToString(), null), //.ToHistogram(),
                    NextFireTime = nextFires.Where(x => x != null).OrderBy(x => x).FirstOrDefault()
                };
            });

            var jobTuples = await Task.WhenAll(asyncJobs);

            return Ok(jobTuples);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult> GetSchedulerJobDetail([FromRoute] string name, [FromQuery] string group)
        {
            var detail = await this.GetJobDetail(name, group);
            return Ok(detail);
        }

        [HttpPut("{name}")]
        public async Task<ActionResult> UpdateSchedulerJobDetail([FromRoute] string name, [FromQuery] string group)
        {
            var detail = await this.GetJobDetail(name, group);
            return Ok(detail);
        }

        [HttpPost]
        public async Task<ActionResult> CreateJob()
        {
            dynamic jobModel = null;

            IJobDetail BuildJob(JobBuilder builder)
            {
                return builder.OfType(Type.GetType(jobModel.Type, true))
                        .WithIdentity(jobModel.JobName, jobModel.Group)
                        .WithDescription(jobModel.Description)
                        // .SetJobData(jobDataMap.GetQuartzJobDataMap())
                        .RequestRecovery(jobModel.Recovery)
                        .Build();
            }

            await this._scheduler.AddJob(BuildJob(JobBuilder.Create().StoreDurably()), replace: false);

            return Ok();
        }

        [HttpPost("{name}/interrupt")]
        public async Task<ActionResult> InterruptRunningJob([FromRoute] string name, [FromQuery] string group)
        {
            var jobDetail = await this.GetJobDetail(name, group);

            if (jobDetail == null)
            {
                return NotFound();
            }

            await this._scheduler.Interrupt(jobDetail.Key);

            return Ok();
        }

        [HttpDelete("{name}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<object>> DeleteJob([FromRoute] string name, [FromQuery] string group)
        {
            var detail = await this.GetJobDetail(name, group);

            if (detail == null)
            {
                return NotFound();
            }

            await this._scheduler.DeleteJob(detail.Key);

            return NoContent();
        }

        private async Task<IJobDetail> GetJobDetail(string name, string group)
        {
            JobKey key = group != null ? new JobKey(name, group) : new JobKey(name);
            IJobDetail detail = await this._scheduler.GetJobDetail(key);

            return detail;
        }

        private async Task<Dictionary<string, ExecutionHistoryEntry>> GetJobHistory()
        {
            var store = this._scheduler.Context.GetExecutionHistoryStore();
            if (store == null)
            {
                return null;
            }

            var history = await store.FilterLastOfEveryJob(10);
            var historyByJob = history.ToDictionary(x => x.Job);

            return historyByJob;
        }
    }
}
