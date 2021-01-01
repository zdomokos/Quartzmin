using Microsoft.Owin;
using Owin;
using Quartz.Impl;
using Quartzmin;
using System;
using Ztg.Loraq.Service.Scheduler;
using System.IO;
using System.Reflection;

[assembly: OwinStartup(typeof(Startup))]

namespace Ztg.Loraq.Service.Scheduler
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseQuartzmin(new QuartzminOptions()
                             {
                                 Scheduler    = LoraqScheduler.Create().Result,
                                 UseLocalTime = true,

                                 //DefaultDateFormat = "dd.MM.yyyy",
                                 VirtualPathRoot = "/quartzmin",
                             });
        }
    }
}
