using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi.Models
{
    public class View_VoteCreate
    {
        public string VoteTitle { get; set; }
        public System.DateTime BeginTime { get; set; }
        public System.DateTime EndTime { get; set; }
        public int VoteMulti { get; set; }
        public int LimitTimes { get; set; }
        public string OpenID { get; set; }
        public string VoteItems { get; set; }
    }
}
