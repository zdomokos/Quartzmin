using System;
using System.Collections.Generic;

namespace Quartzmin.RestApi.Dto
{
    public class JobDto
    {
        public string Name { get; set; }
        public string Group { get; set; }
        public string Description { get; set; }
        public bool Persist { get; set; }
        public bool Recovery { get; set; }
        public bool Concurrent { get; set; }
        public bool Durable { get; set; }
        public ICollection<DataMapItemDto> DataMap { get; set; }
        public DateTime LastExecuted { get; set; }
        public DateTime? NextFireTime { get; set; }
        public string Type { get; set; }

        public string FullName  => Name + "." + Group;
    }
}
