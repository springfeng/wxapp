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

    }
}
