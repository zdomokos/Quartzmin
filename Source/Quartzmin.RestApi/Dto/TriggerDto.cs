using Quartz;
using Quartzmin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Quartzmin.RestApi.Dto
{
    public class TriggerDto
    {
        public TriggerType Type { get; set; }
        public string Job { get; set; }
        public string Name { get; set; }
        public string Group { get; set; }
        public string Description { get; set; }
        public string StartTimeUtc { get; set; }
        public string EndTimeUtc { get; set; }
        public int? Priority { get; set; }

        public ICollection<DataMapItemDto> DataMap { get; set; }

        public int PriorityOrDefault => Priority ?? 5;

        //        public DateTime? GetStartTimeUtc() => ParseDateTime(StartTimeUtc);
        //        public DateTime? GetEndTimeUtc() => ParseDateTime(EndTimeUtc);
    }
}
