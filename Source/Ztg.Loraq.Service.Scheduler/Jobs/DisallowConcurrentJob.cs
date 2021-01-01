using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Quartz;

namespace Ztg.Loraq.Service.Scheduler.Jobs
{
    [DisallowConcurrentExecution, PersistJobDataAfterExecution]
    public class DisallowConcurrentJob : IJob
    {
        private static readonly Random Random = new Random();

        public async Task Execute(IJobExecutionContext context)
        {
            Debug.WriteLine("DisallowConcurrentJob > " + DateTime.Now);

            context.JobDetail.JobDataMap.Put("LastExecuted", DateTime.Now);

            await Task.Delay(TimeSpan.FromSeconds(Random.Next(1, 5)));

            if (Random.Next(4) == 0)
                throw new Exception("Fatal error example!");
        }
    }
}
