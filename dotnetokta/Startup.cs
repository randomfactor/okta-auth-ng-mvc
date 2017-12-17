using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using dotnetokta.Models;

namespace dotnetokta
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
            services.Configure<OktaAuthenticationSettings>(Configuration.GetSection("OktaSettings")); ;

            services.AddCors(o => o.AddPolicy("WideOpen", builder =>
            {
                builder.WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var oktaSettings = Configuration.GetSection("OktaSettings").Get<OktaAuthenticationSettings>();
                options.Authority = oktaSettings.Authority;
                options.Audience = oktaSettings.Audience;
                // TODO: keeping the comment line below for reference. Eliminate when no longer needed
                //options.MetadataAddress = "https://dev-601445.oktapreview.com/oauth2/auscqc57v9LeLr25T0h7/.well-known/oauth-authorization-server";
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseCors("WideOpen");

            app.Use((context, next) =>
            {
                if (String.IsNullOrEmpty(context.Request.Path) || context.Request.Path == "/")
                {
                    context.Request.Path = "/index.html";       // angular initialization
                }

                return next();
            });
            app.UseStaticFiles();           // static files from wwwroot

            app.UseMvc();
        }
    }
}
