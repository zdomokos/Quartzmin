﻿using Quartz;
using Quartz.Impl;
using Quartz.Impl.Matchers;
using System;
using System.Collections.Specialized;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace Quartzmin
{
    public static class DemoScheduler
    {
        public static async Task<IScheduler> Create(bool start = true)
        {
            NameValueCollection properties = new NameValueCollection
            {
                ["quartz.scheduler.instanceName"] = "TestScheduler",
                ["quartz.scheduler.instanceId"] = "1",
                ["quartz.jobStore.type"] = "Quartz.Impl.AdoJobStore.JobStoreTX, Quartz",
                //["quartz.jobStore.use"] = "true",
                ["quartz.jobStore.dataSource"] = "ztg",
                ["quartz.jobStore.tablePrefix"] = "qrtz_",
                ["quartz.jobStore.misfireThreshold"] = "60000",
                ["quartz.jobStore.driverDelegateType"] = "Quartz.Impl.AdoJobStore.PostgreSQLDelegate, Quartz",
                ["quartz.serializer.type"] = "json",
                // if running MS SQL Server we need this
                //["quartz.jobStore.lockHandler.type"] = "Quartz.Impl.AdoJobStore.UpdateLockRowSemaphore, Quartz",

                ["quartz.dataSource.ztg.provider"] = "Npgsql",
                ["quartz.dataSource.ztg.connectionString"] = "Server=localhost;Port=5432;Database=ZtgAts;Username=postgres;Password=xyz;",

                ["quartz.dbprovider.Npgsql.productName"] = "Npgsql",
                ["quartz.dbprovider.Npgsql.assemblyName"] = "Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.connectionType"] = "Npgsql.NpgsqlConnection, Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.commandType"] = "Npgsql.NpgsqlCommand, Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterType"] = "Npgsql.NpgsqlParameter, Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterDbType"] = "NpgsqlTypes.NpgsqlDbType, Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterDbTypePropertyName"] = "NpgsqlDbType",
                ["quartz.dbprovider.Npgsql.parameterNamePrefix"] = ":",
                ["quartz.dbprovider.Npgsql.exceptionType"] = "Npgsql.NpgsqlException, Npgsql, Version=4.1.6.0, Culture=neutral, PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.useParameterNamePrefixInParameterCollection"] = "true",
                ["quartz.dbprovider.Npgsql.bindByName"] = "true",
            };



            // First we must get a reference to a scheduler
            //var sf = new StdSchedulerFactory(properties);
            //var scheduler = await sf.GetDefaultScheduler();
            var sf = new StdSchedulerFactory(properties);
            var scheduler = await sf.GetScheduler();

            /*
            {
                var jobData = new JobDataMap();
                jobData.Put("DateFrom", DateTime.Now);
                jobData.Put("QuartzAssembly", File.ReadAllBytes(typeof(IScheduler).Assembly.Location));

                var job = JobBuilder.Create<DummyJob>()
                    .WithIdentity("Sales", "REPORTS")
                    .WithDescription("Hello Job!")
                    .UsingJobData(jobData)
                    .StoreDurably()
                    .Build();
                var trigger = TriggerBuilder.Create()                    .WithIdentity("MorningSales")
                    .StartNow()
                    .WithCronSchedule("0 0 8 1/1 * ? *")
                    .Build();
                await scheduler.ScheduleJob(job, trigger);

                trigger = TriggerBuilder.Create()
                    .WithIdentity("MonthlySales")
                    .ForJob(job.Key)
                    .StartNow()
                    .WithCronSchedule("0 0 12 1 1/1 ? *")
                    .Build();
                await scheduler.ScheduleJob(trigger);
                await scheduler.PauseTrigger(trigger.Key);

                trigger = TriggerBuilder.Create()
                    .WithIdentity("HourlySales")
                    .ForJob(job.Key)
                    .StartNow()
                    .WithSimpleSchedule(x => x.WithIntervalInHours(1).RepeatForever())
                    .Build();
                await scheduler.ScheduleJob(trigger);
            }

            {
                var job = JobBuilder.Create<DummyJob>().WithIdentity("Job1").StoreDurably().Build();
                await scheduler.AddJob(job, false);
                job = JobBuilder.Create<DummyJob>().WithIdentity("Job2").StoreDurably().Build();
                await scheduler.AddJob(job, false);
                job = JobBuilder.Create<DummyJob>().WithIdentity("Job3").StoreDurably().Build();
                await scheduler.AddJob(job, false);
                job = JobBuilder.Create<DummyJob>().WithIdentity("Job4").StoreDurably().Build();
                await scheduler.AddJob(job, false);
                job = JobBuilder.Create<DummyJob>().WithIdentity("Job5").StoreDurably().Build();
                await scheduler.AddJob(job, false);
                job = JobBuilder.Create<DummyJob>().WithIdentity("Send SMS", "CRITICAL").StoreDurably().RequestRecovery().Build();
                await scheduler.AddJob(job, false);

                var trigger = TriggerBuilder.Create()
                    .WithIdentity("PushAds  (US)")
                    .ForJob(job.Key)
                    .UsingJobData("Location", "US")
                    .StartNow()
                    .WithCronSchedule("0 0/5 * 1/1 * ? *")
                    .Build();
                await scheduler.ScheduleJob(trigger);

                trigger = TriggerBuilder.Create()
                    .WithIdentity("PushAds (EU)")
                    .ForJob(job.Key)
                    .UsingJobData("Location", "EU")
                    .StartNow()
                    .WithCronSchedule("0 0/7 * 1/1 * ? *")
                    .Build();
                await scheduler.ScheduleJob(trigger);
                await scheduler.PauseTriggers(GroupMatcher<TriggerKey>.GroupEquals("LONGRUNNING"));

                job = JobBuilder.Create<DummyJob>().WithIdentity("Send Push", "CRITICAL").StoreDurably().RequestRecovery().Build();
                await scheduler.AddJob(job, false);
            }

            {
                var job = JobBuilder.Create<DisallowConcurrentJob>()
                    .WithIdentity("Load CSV", "IMPORT")
                    .StoreDurably()
                    .Build();
                var trigger = TriggerBuilder.Create()
                    .WithIdentity("CSV_small", "FREQUENTLY")
                    .ForJob(job)
                    .StartNow()
                    .WithSimpleSchedule(x => x.WithIntervalInSeconds(5).RepeatForever())
                    .Build();
                await scheduler.ScheduleJob(job, trigger);
                trigger = TriggerBuilder.Create()
                    .WithIdentity("CSV_big", "LONGRUNNING")
                    .ForJob(job)
                    .StartNow()
                    .WithDailyTimeIntervalSchedule(x => x.OnMondayThroughFriday())
                    .Build();
                await scheduler.ScheduleJob(trigger);
            }
            */


            if (start)
                await scheduler.Start();

            return scheduler;
        }

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
}
