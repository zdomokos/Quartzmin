using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Plugins.RecentHistory;
using System.Linq;

namespace Quartzmin.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IScheduler _scheduler;

        public HistoryController(IScheduler scheduler)
        {
            this._scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<object>>> GetJobsHistory([FromQuery] int? limit)
        {
            var store = this._scheduler.Context.GetExecutionHistoryStore();

            if (store == null)
            {
                return BadRequest();
            }

            IEnumerable<ExecutionHistoryEntry> history = await store.FilterLast(limit.GetValueOrDefault(100));

            var result = history.OrderByDescending(x => x.ActualFireTimeUtc)
                .Select(x => {
                    var jobKey = x.Job.Split('.');
                    var triggerKey = x.Trigger.Split('.');

                    string state;

                    if (x.Vetoed)
                    {
                        state = "Vetoed";
                    }
                    else if (!string.IsNullOrEmpty(x.ExceptionMessage))
                    {
                        state = "Failed";
                    }
                    else if (x.FinishedTimeUtc == null)
                    {
                        state = "Running";
                    }
                    else
                    {
                        state = "Finished";
                    }

                    return new
                    {
                        State = state,
                        Entity = x,

                        JobGroup = jobKey[0],
                        JobName = jobKey[1],

                        TriggerGroup = triggerKey[0],
                        TriggerName = triggerKey[1],

                        x.ScheduledFireTimeUtc,
                        x.ActualFireTimeUtc,
                        x.FinishedTimeUtc,
                        DurationInMs = ((x.FinishedTimeUtc.GetValueOrDefault(DateTime.UtcNow)) - x.ActualFireTimeUtc).TotalMilliseconds
                    };
                });

            return Ok(result);
        }
    }
}
