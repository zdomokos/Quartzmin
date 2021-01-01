using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Ztg.Loraq.Service.Scheduler.Jobs;

namespace Ztg.Loraq.Service.Scheduler.Test
{
    [TestFixture]
    public class JobTest
    {
        [Test]
        public void BatchCommandJob()
        {
            var job = new BatchCommandJob();
            string command = @"c:\ZSDK\Projects\ZTG\analytics\jobs\_sample\sample_job_run.bat";
            job.ExecuteCommand(command);

        }
    }
}
