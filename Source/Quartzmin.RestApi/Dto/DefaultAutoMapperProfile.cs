using AutoMapper;
using Quartz;

namespace Quartzmin.RestApi.Dto
{
    public class DefaultAutoMapperProfile : Profile
    {
        public DefaultAutoMapperProfile()
        {
            CreateMap<IJob, JobDto>();
        }
    }
}
