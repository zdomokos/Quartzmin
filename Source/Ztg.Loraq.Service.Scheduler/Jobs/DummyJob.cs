using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Quartz;

namespace Ztg.Loraq.Service.Scheduler.Jobs
{
    public class DummyJob : IJob
    {
        private static readonly Random Random = new Random();

        public async Task Execute(IJobExecutionContext context)
        {
            Debug.WriteLine("DummyJob > " + DateTime.Now);

            await Task.Delay(TimeSpan.FromSeconds(Random.Next(1, 20)));

            if (Random.Next(2) == 0)
                throw new Exception("Fatal error example!");
        }
    }
}
