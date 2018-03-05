namespace wxApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Vote")]
    public partial class Vote
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Vote()
        {
            VoteItems = new HashSet<VoteItems>();
            //VoteStatistics = new HashSet<VoteStatistics>();

        }

        [StringLength(50)]
        public string VoteID { get; set; }

        [StringLength(500)]
        public string VoteTitle { get; set; }

        [StringLength(50)]
        public string OpenID { get; set; }

        public DateTime BeginTime { get; set; }

        public DateTime EndTime { get; set; }

        public int VoteMulti { get; set; }

        public int LimitTimes { get; set; }

        public DateTime CreateTime { get; set; }

        public virtual Users Users { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VoteItems> VoteItems { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<VoteStatistics> VoteStatistics { get; set; }

    }
}
