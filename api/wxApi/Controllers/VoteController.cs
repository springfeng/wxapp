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
        public List<View_VoteList> Get(string OpenID,string rn)
        {
            if (OpenID == "" || OpenID == null)
            {
                return null;
            }
            else
            {
                return DbContext.Vote.OrderByDescending(p => p.CreateTime)
                    .Where(e => e.OpenID == OpenID)
                    .Select(o => new View_VoteList() { VoteID = o.VoteID, VoteTitle = o.VoteTitle })
                    .ToList();
            }
        }


        /// <summary>
        /// 创建用户投票
        /// </summary>
        /// <param name="voteCreate"></param>
        // POST: api/Vote
        [HttpPost]
        public ReturnJsonResult Post(View_VoteCreate voteCreate)
        {
            ReturnJsonResult retJson = new ReturnJsonResult();

            try
            { 
                //创建投票
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

                retJson.retCode = true;
                retJson.retMsg = "";
                retJson.retContent = "";
                return retJson;
            }
            catch (Exception e)
            {
                retJson.retCode = false;
                retJson.retMsg = "异常";
                return retJson;
            }
        }
        /// <summary>
        /// 更新投票
        /// </summary>
        /// <param name="voteUpdate"></param>
        // PUT: api/Vote/5
        [HttpPut]
        public ReturnJsonResult Put(View_VoteUpdate voteUpdate)
        {
            ReturnJsonResult retJson = new ReturnJsonResult();

            //更新投票
            List<string> items = voteUpdate.VoteItemIDs.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();

            if (items.Count == 0)
            {
                retJson.retCode = false;
                retJson.retMsg = "不存在投票";
                return retJson;
            }

            Vote vote = DbContext.Vote.Find(voteUpdate.VoteID);
            //判断是否存在该投票
            if (vote != null)
            {
                //判断投票单选选类型
                if (vote.VoteMulti == 0)
                {
                    if (items.Count > 1)
                    {
                        retJson.retCode = false;
                        retJson.retMsg = "单选类型";
                        return retJson;
                    }
                }
                //判断是否可重复投票
                if (vote.LimitTimes == 0)
                {
                    int Times = DbContext.VoteStatistics.Where(e => e.OpenID == vote.OpenID && e.VoteID == vote.VoteID).ToList().Count;
                    //没投票过
                    if (Times > 0)
                    {
                        retJson.retCode = false;
                        retJson.retMsg = "已经投过票了";
                        return retJson;
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
                retJson.retCode = true;
                retJson.retMsg = "";
                return retJson;
            }
            else
            {
                retJson.retCode = false;
                retJson.retMsg = "没有该投票";
                return retJson;
            }
        }

        // DELETE: api/Vote/
        [HttpDelete]
        public ReturnJsonResult Delete(string VoteID, string OpenID)
        {
            ReturnJsonResult retJson = new ReturnJsonResult();

            //删除投票
            try
            {
                //判断是否是创建人
                Vote vote = DbContext.Vote.Where(e => e.VoteID == VoteID && e.OpenID == OpenID).FirstOrDefault();
                if (vote != null)
                {
                    DbContext.VoteStatistics.RemoveRange(DbContext.VoteStatistics.Where(e => e.VoteID == VoteID));
                    DbContext.VoteItems.RemoveRange(DbContext.VoteItems.Where(e => e.VoteID == VoteID));
                    DbContext.Vote.RemoveRange(DbContext.Vote.Where(e => e.VoteID == VoteID && e.OpenID == OpenID));
                    DbContext.SaveChanges();
                    retJson.retCode = true;
                    retJson.retMsg = "";
                    return retJson;
                }
                else
                {
                    retJson.retCode = false;
                    retJson.retMsg = "参数不正确";
                    return retJson;
                }
            }
            catch (Exception ex)
            {
                retJson.retCode = false;
                retJson.retMsg = "异常"+ ex.Message+ex.Source+ex.StackTrace;
                return retJson;
            }
        }
    }
}
