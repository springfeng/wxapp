using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using log4net;
using Microsoft.AspNetCore.Hosting;
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
        //log4Net
        private ILog log;
        private EFDbContext DbContext;
        private readonly IHostingEnvironment _hostingEnvironment;
        public wechatController(EFDbContext context, IHostingEnvironment hostingEnvironment)
        {
            DbContext = context;
            _hostingEnvironment = hostingEnvironment;
            //log4Net
            this.log = LogManager.GetLogger(Startup.repository.Name, typeof(wechatController));
        }
        // GET: api/wechat
        [HttpGet]
        public ReturnJsonResult Get(string jsCode)
        {
            ReturnJsonResult retJson = new ReturnJsonResult();

            string appId = "wx238f9629abbb4cc5";
            string secret = "a6f019c01cac981cb71d65b9efd2f549";

            JsCode2JsonResult ret = SnsApi.JsCode2Json(appId, secret, jsCode);
            if (ret.errcode==ReturnCode.请求成功)
            {
                //插入到用户表中
                Users searchUser = DbContext.Users.Find(ret.openid);
                if (searchUser==null)
                {
                    Users users = new Users();
                    users.OpenID = ret.openid;
                    users.CreateTime = DateTime.Now;
                    DbContext.Users.Add(users);
                    DbContext.SaveChanges();
                }
                
                //返回openid
                retJson.retCode = true;
                retJson.retMsg = "";
                retJson.retContent = ret.openid;
                return retJson;
            }
            else
            {
                retJson.retCode = false;
                retJson.retMsg = ret.errcode.ToString();
                return retJson;
            }
        }

        /// <summary>
        /// 创建用户投票
        /// </summary>
        /// <param name="voteCreate"></param>
        // POST: api/wechat
        [HttpPost]
        public ReturnJsonResult Post(View_UserUpdate userUpdate)
        {
            ReturnJsonResult retJson = new ReturnJsonResult();

            try
            {
                log.Error("111");
                Users searchUser = DbContext.Users.Find(userUpdate.OpenID);
                //
                string HeaderName = userUpdate.OpenID + ".jpg";
                string webRootPath = _hostingEnvironment.WebRootPath+"/headers/";
                string FilePath = webRootPath + HeaderName;
                //设置服务器地址
                string UrlPath = MySetting.AppSetting("FileUrl") + "headers/" + HeaderName;

                WebClient client = new WebClient();
                client.DownloadFile(userUpdate.Header, FilePath); 

                searchUser.Header = UrlPath;
                searchUser.NickName = userUpdate.NickName;

                DbContext.Users.Update(searchUser);

                DbContext.SaveChanges();
                retJson.retCode = true;
                retJson.retMsg = "";
                return retJson;
            }
            catch (Exception e)
            {
                log.Error(e.Message + e.Source + e.StackTrace);

                retJson.retCode = false;
                retJson.retMsg = "异常";
                return retJson;
            }
        }
    }    
}