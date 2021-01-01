using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Quartz;

namespace Ztg.Loraq.Service.Scheduler.Jobs
{
    public class BatchCommandJob : IJob
    {
        // how to pass params to job: https://stackoverflow.com/a/13857396
        public async Task Execute(IJobExecutionContext context)
        {
            JobDataMap jobDataMap   = context.JobDetail.JobDataMap;
            JobDataMap triggerDataMap   = context.Trigger.JobDataMap;
            string     batchfile = triggerDataMap.GetString("batchfile");
            
            await Task.Run(() => ExecuteCommand(batchfile));

            if (_exitCode > 0)
                throw new Exception($"Batch run error: {_exitCode} on {batchfile}");
        }

        // https://stackoverflow.com/a/5519517
        public void ExecuteCommand(string command)
        {
            var processInfo = new ProcessStartInfo("cmd.exe", "/c " + command);
            processInfo.CreateNoWindow         = true;
            processInfo.UseShellExecute        = false;
            processInfo.RedirectStandardError  = true;
            processInfo.RedirectStandardOutput = true;

            var process = Process.Start(processInfo);
            if (process == null)
                throw new Exception("Cannot start process");

            process.OutputDataReceived += (sender, e) => Console.WriteLine("output>>" + e.Data);
            process.BeginOutputReadLine();
            process.ErrorDataReceived += (sender, e) => Console.WriteLine("error>>" + e.Data);
            process.BeginErrorReadLine();
            process.WaitForExit();
            _exitCode = process.ExitCode;
            Console.WriteLine("ExitCode: {0}", _exitCode);
            process.Close();
        }

        private int _exitCode;
    }
}
