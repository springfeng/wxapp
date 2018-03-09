using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi.Models
{
    public class VoteDetail
    {
        public string VoteID { get; set; }
        public string VoteTitle { get; set; }
        public string OpenID { get; set; }
        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreateTime { get; set; }

        public List<VoteItemDetail> VoteItemsList = new List<VoteItemDetail>();
    }
}
