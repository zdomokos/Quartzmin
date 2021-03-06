﻿using Microsoft.Owin;
using Owin;
using Quartzmin.AspNet;

[assembly: OwinStartup(typeof(Startup))]

namespace Quartzmin.AspNet
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseQuartzmin(new QuartzminOptions()
            {
                Scheduler = DemoScheduler.Create().Result,

                DefaultDateFormat = "dd.MM.yyyy",
                VirtualPathRoot = "/quartzmin",
            });
        }
    }
}