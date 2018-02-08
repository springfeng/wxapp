using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi.Models
{
    public class VoteStatistics
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(50)]
        public string VoteID { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(50)]
        public string VoteItemID { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(50)]
        public string OpenID { get; set; }

        [Key]
        [Column(Order = 3)]
        public DateTime CreateTime { get; set; }


        public virtual Users Users { get; set; }

        public virtual Vote Vote { get; set; }

        public virtual VoteItems VoteItems { get; set; }

    }
}
