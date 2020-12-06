using System.Runtime.Serialization;

namespace Quartzmin.RestApi.Dto
{
    public enum DataMapType
    {
        [EnumMember(Value = "string")]
        String,

        [EnumMember(Value = "stringMultiline")]
        StringMultiline,

        [EnumMember(Value = "boolean")]
        Boolean,

        [EnumMember(Value = "datetime")]
        DateTime,

        [EnumMember(Value = "datetimeUtc")]
        DateTimeUtc,

        [EnumMember(Value = "date")]
        Date,

        [EnumMember(Value = "binary")]
        Binary,

        [EnumMember(Value = "decimal")]
        Decimal,

        [EnumMember(Value = "double")]
        Double,

        [EnumMember(Value = "float")]
        Float,

        [EnumMember(Value = "integer")]
        Integer,

        [EnumMember(Value = "long")]
        Long
    }

    public class DataMapItemDto
    {
        public string Name { get; set; }
        public object Value { get; set; }
        public DataMapType Type { get; set; }
    }
}
