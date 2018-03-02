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
        private EFDbContext _context;
        public VoteController(EFDbContext context)
        {
            _context = context;
        }
        //// GET: api/Vote
        //[HttpGet]
        //public List<Vote> Get()
        //{
        //    return _context.Vote.ToList();
        //}



        /// <summary>
        /// 获取用户投票列表
        /// </summary>
        /// <param name="OpenID">用户ID</param>
        /// <returns></returns>
        // GET: api/Vote/5
        [HttpGet("{OpenID}", Name = "Get")]
        public List<Vote> Get(string OpenID)
        {
            if (OpenID == "" || OpenID == null)
            {
                return _context.Vote.ToList();
            }
            else
            {
                return _context.Vote.Where(e => e.OpenID == OpenID).ToList();
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
            foreach (string ItemName in voteCreate.VoteItems)
            {
                vote.VoteItems.Add(new VoteItems() { CreateTime = DateTime.Now, ItemName = ItemName, VoteItemID = Guid.NewGuid().ToString("N") });
            }

            _context.SaveChanges();

        }

        //// PUT: api/Vote/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //    //更新投票
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    //删除投票
        //}
    }
}
