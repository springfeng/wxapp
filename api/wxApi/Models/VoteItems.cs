namespace wxApi.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public partial class VoteItems
    {
        [StringLength(50)]
        public string VoteID { get; set; }

        [Key]
        [StringLength(50)]
        public string VoteItemID { get; set; }

        [StringLength(100)]
        public string ItemName { get; set; }

        public DateTime CreateTime { get; set; }

        public virtual Vote Vote { get; set; }
    }
}
