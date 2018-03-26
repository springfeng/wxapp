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
    [Route("api/Vote")]
    public class VoteController : Controller
    {
        private EFDbContext DbContext;
        public VoteController(EFDbContext context)
        {
            DbContext = context;
        }
        //// GET: api/Vote
        //[HttpGet]
        //public List<Vote> Get()
        //{
        //    return DbContext.Vote.ToList();
        //}

        /// <summary>
        /// 获取用户投票列表
        /// </summary>
        /// <param name="OpenID">用户ID</param>
        /// <returns></returns>
        // GET: api/Vote/5
        [HttpGet]
        public List<VoteList> Get(string OpenID,string rn)
        {
            if (OpenID == "" || OpenID == null)
            {
                return null;
            }
            else
            {
                return DbContext.Vote.OrderByDescending(p => p.CreateTime)
                    .Where(e => e.OpenID == OpenID)
                    .Select(o => new VoteList() { VoteID = o.VoteID, VoteTitle = o.VoteTitle })
                    .ToList();
            }
        }


        /// <summary>
        /// 创建用户投票
        /// </summary>
        /// <param name="voteCreate"></param>
        // POST: api/Vote
        [HttpPost]
        public void Post(VoteCreate voteCreate)
        {
            try
            { //创建投票
                Vote vote = new Vote();
                vote.OpenID = voteCreate.OpenID;
                vote.BeginTime = voteCreate.BeginTime;
                vote.EndTime = voteCreate.EndTime;
                vote.CreateTime = DateTime.Now;
                vote.LimitTimes = voteCreate.LimitTimes;
                vote.VoteMulti = voteCreate.VoteMulti;
                vote.VoteTitle = voteCreate.VoteTitle;
                vote.VoteID = Guid.NewGuid().ToString("N");
                List<string> items = voteCreate.VoteItems.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();
                foreach (string ItemName in items)
                {
                    vote.VoteItems.Add(new VoteItems() { CreateTime = DateTime.Now, ItemName = ItemName, VoteItemID = Guid.NewGuid().ToString("N"),VoteID= vote.VoteID});
                }
                DbContext.Vote.Add(vote);

                DbContext.SaveChanges();
            }
            catch (Exception e)
            {
                
            }
        }

        // PUT: api/Vote/5
        [HttpPut]
        public void Put(VoteUpdate voteUpdate)
        {
            //更新投票
            List<string> items = voteUpdate.VoteItemIDs.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();

            if (items.Count == 0)
            {
                return;
            }

            Vote vote= DbContext.Vote.Find(voteUpdate.VoteID);
            //判断是否存在该投票
            if (vote != null)
            {
                //判断投票单选选类型
                if (vote.VoteMulti==0)
                {
                    if (items.Count>1)
                    {
                        return;
                    }
                }
                //判断是否可重复投票
                if (vote.LimitTimes == 0)
                {
                   int Times= DbContext.VoteStatistics.Where(e => e.OpenID == vote.OpenID && e.VoteID == vote.VoteID).ToList().Count;
                    //没投票过
                    if (Times >0)
                    {
                        return;
                    }
                }

                DateTime dateTime = DateTime.Now;
                foreach (string item in items)
                {
                    VoteStatistics voteStatistics = new VoteStatistics();
                    voteStatistics.ID = Guid.NewGuid().ToString("N");
                    voteStatistics.OpenID = voteUpdate.OpenID;
                    voteStatistics.VoteID = voteUpdate.VoteID;
                    voteStatistics.VoteItemID = item;
                    voteStatistics.CreateTime = dateTime;
                    DbContext.VoteStatistics.Add(voteStatistics);
                }

                DbContext.SaveChanges();
            }
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    //删除投票
        //}
    }
}
