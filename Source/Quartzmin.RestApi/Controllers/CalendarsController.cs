using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quartz;
using Microsoft.AspNetCore.Http;

namespace Quartzmin.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarsController : ControllerBase
    {
        private readonly IScheduler _scheduler;

        public CalendarsController(IScheduler scheduler)
        {
            _scheduler = scheduler ?? throw new ArgumentNullException(nameof(scheduler));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetCalendars()
        {
            var calendarNames = await _scheduler.GetCalendarNames();

            return Ok(calendarNames);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<ICalendar>> GetCalendarDetail([FromRoute] string name)
        {
            var detail = await _scheduler.GetCalendar(name);
            return Ok(detail);
        }

        [HttpPut("{name}")]
        public async Task<ActionResult> UpdateCalendar([FromRoute] string name, [FromQuery] string group)
        {
            return Ok();
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
    }
}
