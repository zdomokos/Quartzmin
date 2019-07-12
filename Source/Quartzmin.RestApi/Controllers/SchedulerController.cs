using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Impl.Matchers;
using Quartz.Plugins.RecentHistory;
using Microsoft.AspNetCore.Http;

namespace Quartzmin.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerController : ControllerBase
    {
        private readonly IScheduler _scheduler;

        public SchedulerController(IScheduler scheduler)
        {
            this._scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }

        [HttpGet()]
        public async Task<ActionResult<object>> GetInfo()
        {
            var metadata = await this._scheduler.GetMetaData();
            var historyStore = this._scheduler.Context.GetExecutionHistoryStore();
            var jobKeys = await this._scheduler.GetJobKeys(GroupMatcher<JobKey>.AnyGroup());
            var triggerKeys = await this._scheduler.GetJobKeys(GroupMatcher<JobKey>.AnyGroup());
            var runningJobs = await this._scheduler.GetCurrentlyExecutingJobs();

            return Ok(new
            {
                Status = new
                {
                    metadata.InStandbyMode,
                    RunningSince = metadata.RunningSince?.UtcDateTime ?? null,
                    metadata.Shutdown,
                    metadata.Started,
                    metadata.SchedulerName,
                    metadata.SchedulerInstanceId,
                    metadata.SchedulerRemote,
                    metadata.SchedulerType,
                    metadata.Version,
                    Environment.MachineName,
                },
                Stats = new
                {
                    ExecutedJobs = metadata.NumberOfJobsExecuted,
                    RunningJobs = runningJobs.Count,

                }
            });
        }

        [HttpPost("{operation}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> PerformOperation([FromRoute] string operation)
        {
            switch (operation)
            {
                case "shutdown":
                    await this._scheduler.Shutdown();
                    break;
                case "standby":
                    await this._scheduler.Standby();
                    break;
                case "start":
                    await this._scheduler.Start();
                    break;
                case "pause":
                    await this._scheduler.PauseAll();
                    break;
                case "resume":
                    await this._scheduler.ResumeAll();
                    break;
            }


            return NoContent();
        }

        [HttpPost("pause")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Pause()
        {
            await this._scheduler.PauseAll();

            return NoContent();
        }

        [HttpPost("resume")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Resume()
        {
            await this._scheduler.ResumeAll();

            return NoContent();
        }
    }
}
