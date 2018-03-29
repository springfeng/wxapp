using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wxApi.Models;

namespace wxApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Statistics")]
    public class StatisticsController : Controller
    {
        private EFDbContext DbContext;
        public StatisticsController(EFDbContext context)
        {
            DbContext = context;
        }

        [HttpGet]
        public View_Stat Get(string OpenID, string VoteID)
        {
            if (OpenID == "" || OpenID == null)
            {
                return null;
            }
            else if (VoteID == "" || VoteID == null)
            {
                return null;
            }
            else
            {
                View_Stat view_Stat = new View_Stat();
                Vote vote = DbContext.Vote.Where(e => e.OpenID == OpenID && e.VoteID == VoteID).FirstOrDefault();
                view_Stat.VoteTitle = vote.VoteTitle;

                List<VoteItems> items = DbContext.VoteItems.OrderByDescending(e=>e.CreateTime).Where(e => e.VoteID == VoteID).ToList();
                View_VoteDetail voteDetail = new View_VoteDetail();
                foreach (VoteItems item in items)
                {
                    int Value = DbContext.VoteStatistics.Count(e => e.VoteID == vote.VoteID && e.VoteItemID == item.VoteItemID);
                    view_Stat.VoteItems.Add(new View_VoteItemsStat() { name = item.ItemName+"："+ Value, value = Value });
                }

               List<VoteStatistics> Users= DbContext.VoteStatistics.Where(e => e.VoteID == vote.VoteID).ToList();
                foreach (VoteStatistics sta in Users)
                {
                    Users user = DbContext.Users.Find(sta.OpenID);
                    view_Stat.VoteUsers.Add(new View_VoteUserStat() { CreateTime = sta.CreateTime.ToString("yyyy-MM-dd HH:mm:ss"), Header = user.Header, NickName = user.NickName });
                }

                return view_Stat;
            }
        }
    }
}