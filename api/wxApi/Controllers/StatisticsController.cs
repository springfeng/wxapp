﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace wxApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Statistics")]
    public class StatisticsController : Controller
    {
        //[HttpGet]
        //public VoteDetail Get(string OpenID, string VoteID)
        //{
        //    if (OpenID == "" || OpenID == null)
        //    {
        //        return null;
        //    }
        //    else if (VoteID == "" || VoteID == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        Vote vote = DbContext.Vote.Where(e => e.OpenID == OpenID && e.VoteID == VoteID).FirstOrDefault();
        //        List<VoteItems> items = DbContext.VoteItems.Where(e => e.VoteID == VoteID).ToList();
        //        VoteDetail voteDetail = new VoteDetail();
        //        voteDetail.VoteID = vote.VoteID;
        //        voteDetail.VoteTitle = vote.VoteTitle;
        //        voteDetail.OpenID = vote.OpenID;
        //        voteDetail.VoteMulti = vote.VoteMulti;
        //        foreach (VoteItems item in items)
        //        {
        //            voteDetail.VoteItemsList.Add(new VoteItemDetail() { ItemName = item.ItemName, VoteItemID = item.VoteItemID });
        //        }
        //        return voteDetail;
        //    }
        //}
    }
}