using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace wxApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();

        //public static IWebHost BuildWebHost(string[] args) =>WebHost.CreateDefaultBuilder(args)
        //    .UseKestrel(options => options.Listen(IPAddress.Any, 44311, listenOptions =>
        //    {
        //        listenOptions.UseHttps(new X509Certificate2("server.pfx", "linezero"));
        //        options.Limits.MaxConcurrentConnections = 100;
        //        options.Limits.MaxConcurrentUpgradedConnections = 100;
        //        options.Limits.MaxRequestBodySize = 10 * 1024;
        //    }))
        //    //.UseUrls("https://*:443")
        //    //.UseContentRoot(AppContext.BaseDirectory)
        //    .UseStartup<Startup>()
        //    .Build();
    }
}
