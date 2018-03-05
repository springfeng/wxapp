namespace wxApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class VoteItems
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public VoteItems()
        {
            //VoteStatistics = new HashSet<VoteStatistics>();
        }

        [StringLength(50)]
        public string VoteID { get; set; }

        [Key]
        [StringLength(50)]
        public string VoteItemID { get; set; }

        [StringLength(100)]
        public string ItemName { get; set; }

        public DateTime CreateTime { get; set; }

        public virtual Vote Vote { get; set; }


        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<VoteStatistics> VoteStatistics { get; set; }

    }
}
