using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi
{
    public class MySetting
    {
        private static IConfigurationSection appSections = null;

        public static string AppSetting(string key)
        {
            string str = "";
            if (appSections.GetSection(key) != null)
            {
                str = appSections.GetSection(key).Value;
            }
            return str;
        }


        public static void SetAppSetting(IConfigurationSection section)
        {
            appSections = section;
        }

    }
}
