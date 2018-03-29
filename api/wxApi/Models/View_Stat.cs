using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wxApi.Models
{
    /// <summary>
    /// 用于投票统计数据返回
    /// </summary>
    public class View_Stat
    {
        /// <summary>
        /// 投票标题
        /// </summary>
        public string VoteTitle { get; set; }
        /// <summary>
        /// 选项
        /// </summary>
        public List<View_VoteItemsStat> VoteItems = new List<View_VoteItemsStat>();
        /// <summary>
        /// 投票用户列表
        /// </summary>
        public List<View_VoteUserStat> VoteUsers = new List<View_VoteUserStat>();
    }

    /// <summary>
    /// 用于投票统计数据返回
    /// </summary>
    public class View_VoteItemsStat
    {
        /// <summary>
        /// 选项标题
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 投票个数
        /// </summary>
        public int value { get; set; }
    }

    /// <summary>
    /// 用于投票统计数据返回
    /// </summary>
    public class View_VoteUserStat
    {
        /// <summary>
        /// 用户昵称
        /// </summary>
        public string NickName { get; set; }
        /// <summary>
        /// 用户头像
        /// </summary>
        public string Header { get; set; }
        /// <summary>
        /// 投票时间
        /// </summary>
        public string CreateTime { get; set; }
    }
}
