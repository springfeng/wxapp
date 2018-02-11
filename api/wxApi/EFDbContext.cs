using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wxApi.Models;

namespace wxApi
{
    public class EFDbContext :  DbContext
    {
        public EFDbContext(DbContextOptions<EFDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Vote> Vote { get; set; }
        public virtual DbSet<VoteItems> VoteItems { get; set; }

        public virtual DbSet<VoteStatistics> VoteStatistics { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Users>()
            //       .HasMany(e => e.VoteStatistics)
            //       .WithRequired(e => e.Users)
            //       .WillCascadeOnDelete(false);

            //modelBuilder.Entity<Vote>()
            //    .HasMany(e => e.VoteStatistics)
            //    .WithRequired(e => e.Vote)
            //    .WillCascadeOnDelete(false);

            //modelBuilder.Entity<VoteItems>()
            //    .HasMany(e => e.VoteStatistics)
            //    .WithRequired(e => e.VoteItems)
            //    .WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);
        }
    }
}
