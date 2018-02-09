namespace wxApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Users
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Users()
        {
            Vote = new HashSet<Vote>();
            VoteStatistics = new HashSet<VoteStatistics>();
        }

        [Key]
        [StringLength(50)]
        public string OpenID { get; set; }

        [StringLength(50)]
        public string NickName { get; set; }

        [StringLength(50)]
        public string Header { get; set; }

        public DateTime? CreateTime { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Vote> Vote { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VoteStatistics> VoteStatistics { get; set; }

    }
}
