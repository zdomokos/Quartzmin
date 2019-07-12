using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Quartz.Impl.Matchers;
using Microsoft.AspNetCore.Http;

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
            var triggerKeys = await _scheduler.GetTriggerKeys(GroupMatcher<TriggerKey>.AnyGroup());

            return Ok(triggerKeys);
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

        private async Task<ITrigger> GetTriggerDetail(string name, string group)
        {
            TriggerKey key = group != null ? new TriggerKey(name, group) : new TriggerKey(name);
            ITrigger trigger = await _scheduler.GetTrigger(key);

            return trigger;
        }
    }
}
