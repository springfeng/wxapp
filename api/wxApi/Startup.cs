using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace wxApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //添加entity sqlserver
            //services.AddEntityFrameworkSqlServer().AddDbContext<EFDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("SqlServer")));

            //添加entity mysql
            services.AddEntityFrameworkSqlServer().AddDbContext<EFDbContext>(options => options.UseMySQL(Configuration.GetConnectionString("MySql")));

            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc()
                //全局配置Json序列化处理
                .AddJsonOptions(options =>
                {
                    //忽略循环引用
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    //不使用驼峰样式的key
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    ////设置时间格式
                    //options.SerializerSettings.DateFormatString = "yyyy-MM-dd";
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            //设置自定义配置变量
            MySetting.SetAppSetting(Configuration.GetSection("MySetting"));
        }
    }
}
