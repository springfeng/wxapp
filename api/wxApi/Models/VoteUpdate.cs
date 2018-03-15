using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi.Models
{
    public class VoteUpdate
    {
        public string OpenID { get; set; }
        public string VoteID { get; set; }
        public string VoteItemIDs { get; set; }
    }
}
