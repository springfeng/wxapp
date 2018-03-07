using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senparc.Weixin;
using Senparc.Weixin.WxOpen.AdvancedAPIs.Sns;
using wxApi.Models;

namespace wxApi.Controllers
{
    [Produces("application/json")]
    [Route("api/wechat")]
    public class wechatController : Controller
    {
        private EFDbContext DbContext;
        public wechatController(EFDbContext context)
        {
            DbContext = context;
        }
        // GET: api/wechat
        [HttpGet]
        public ReturnJsonResult Get(string jsCode)
        {
            string appId = "wx238f9629abbb4cc5";
            string secret = "a6f019c01cac981cb71d65b9efd2f549";

            JsCode2JsonResult ret = SnsApi.JsCode2Json(appId, secret, jsCode);
            if (ret.errcode==ReturnCode.请求成功)
            {
                //插入到用户表中
                Users users = new Users();
                users.OpenID = ret.openid;
                users.CreateTime = DateTime.Now;
                DbContext.Users.Add(users);
                DbContext.SaveChanges();

                //返回openid
                ReturnJsonResult retJson = new ReturnJsonResult();
                retJson.retCode = true;
                retJson.retMsg = "";
                retJson.retContent = ret.openid;
                return retJson;
            }
            else
            {
                ReturnJsonResult retJson = new ReturnJsonResult();
                retJson.retCode = false;
                retJson.retMsg = ret.errcode.ToString();
                retJson.retContent = "";
                return retJson;
            }
        }
    }    
}