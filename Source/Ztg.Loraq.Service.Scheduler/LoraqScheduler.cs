using System.Collections.Specialized;
using System.Threading.Tasks;
using Quartz;
using Quartz.Impl;
using Ztg.Loraq.Service.Scheduler.Jobs;

namespace Ztg.Loraq.Service.Scheduler
{
    public static partial class LoraqScheduler
    {
        public static async Task<IScheduler> Create(bool start = true)
        {
            NameValueCollection properties = new NameValueCollection
            {
                ["quartz.scheduler.instanceName"]="LqScheduler",
                ["quartz.scheduler.instanceId"]="11",
                ["quartz.serializer.type"]="json",
                // == configure thread pool info
                ["quartz.threadPool.type"]="Quartz.Simpl.SimpleThreadPool,Quartz",
                ["quartz.threadPool.threadCount"]="11",
                // == sample configuration based db provider
                ["quartz.jobStore.type"]="Quartz.Impl.AdoJobStore.JobStoreTX,Quartz",
                ["quartz.jobStore.dataSource"]="ztg",
                ["quartz.jobStore.tablePrefix"]="qrtz_",
                ["quartz.jobStore.misfireThreshold"]="60000",
                ["quartz.jobStore.driverDelegateType"]="Quartz.Impl.AdoJobStore.PostgreSQLDelegate,Quartz",
                ["quartz.dataSource.ztg.provider"]="Npgsql",
                ["quartz.dataSource.ztg.connectionString"]="Server=ztg-srv;Port=5432;Database=ZtgAts;Username=postgres;Password=Asztal15;",
                // == Postgres
                ["quartz.dbprovider.Npgsql.productName"]="Npgsql",
                ["quartz.dbprovider.Npgsql.assemblyName"]="Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.connectionType"]="Npgsql.NpgsqlConnection,Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.commandType"]="Npgsql.NpgsqlCommand,Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterType"]="Npgsql.NpgsqlParameter,Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterDbType"]="NpgsqlTypes.NpgsqlDbType,Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.parameterDbTypePropertyName"]="NpgsqlDbType",
                ["quartz.dbprovider.Npgsql.parameterNamePrefix"]=":",
                ["quartz.dbprovider.Npgsql.exceptionType"]="Npgsql.NpgsqlException,Npgsql,Version=4.1.6.0,Culture=neutral,PublicKeyToken=5d8b90d52f46fda7",
                ["quartz.dbprovider.Npgsql.useParameterNamePrefixInParameterCollection"]="true",
                ["quartz.dbprovider.Npgsql.bindByName"]="true",
                // == Trigger history config
                // ["quartz.plugin.triggHistory.type"]="Quartz.Plugin.History.LoggingTriggerHistoryPlugin,Quartz.Plugins",
                // ["quartz.plugin.triggHistory.triggerFiredMessage"]="Trigger {1}.{0} fired job {6}.{5} at: {4:HH:mm:ss MM/dd/yyyy}",
                // ["quartz.plugin.triggHistory.triggerCompleteMessage"]="Trigger {1}.{0} completed firing job {6}.{5} at {4:HH:mm:ss MM/dd/yyyy} with resulting trigger instruction code: {9}",
                // == Job initialization plugin handles our xml reading,without it defaults are used
                // ["quartz.plugin.xml.type"]="Quartz.Plugin.Xml.XMLSchedulingDataProcessorPlugin,Quartz.Plugins",
                // ["quartz.plugin.xml.fileNames"]="~/quartz_jobs.xml",
                // == Recent history
                ["quartz.plugin.recentHistory.type"]="Quartz.Plugins.RecentHistory.ExecutionHistoryPlugin,Quartz.Plugins.RecentHistory",
                ["quartz.plugin.recentHistory.storeType"]="Quartz.Plugins.RecentHistory.Impl.InProcExecutionHistoryStore,Quartz.Plugins.RecentHistory",
                // == export this server to remoting context
                // ["quartz.scheduler.exporter.type"]="Quartz.Simpl.RemotingSchedulerExporter,Quartz",
                // ["quartz.scheduler.exporter.port"]="555",
                // ["quartz.scheduler.exporter.bindName"]="QuartzScheduler",
                // ["quartz.scheduler.exporter.channelType"]="tcp",
                // ["quartz.scheduler.exporter.channelName"]="httpQuartz",
                // == job initialization plugin handles our xml reading,without it defaults are used
                // ["quartz.plugin.xml.type"]="Quartz.Plugin.Xml.XMLSchedulingDataProcessorPlugin,Quartz.Plugins",
                // ["quartz.plugin.xml.fileNames"]="quartz_jobs.xml",                
            };

            
            // First we must get a reference to a scheduler
            //var sf = new StdSchedulerFactory(properties);
            //var scheduler = await sf.GetDefaultScheduler();
            var sf = new StdSchedulerFactory(properties);
            var scheduler = await sf.GetScheduler();

            var job = JobBuilder.Create<DummyJob>()
                        .WithIdentity("Dummy", "Test")
                        .WithDescription("Dummy test.")
                        .StoreDurably()
                        .Build();
            await scheduler.AddJob(job, true);

            job = JobBuilder.Create<BatchCommandJob>()
                                .WithIdentity("BatchCmd", "Process")
                                .WithDescription("Execute any batch file on command terminal.")
                                .StoreDurably()
                                .Build();
            await scheduler.AddJob(job, true);
            

            if (start)
                await scheduler.Start();

            return scheduler;
        }
    }
}



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
