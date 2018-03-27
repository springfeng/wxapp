// pages/voteList/votelist.js

//获取应用实例
var app = getApp();
var openID;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    var self = this;
    if (app.globalData.openID == undefined || app.globalData.openID == null) {
      openID = wx.getStorageSync('OpenID') 
      // console.log("从Storage获取OpenID");
    } else {
      openID = app.globalData.openID;
      // console.log("从globalData获取OpenID");
    }
    // wx.showModal({
    //   content: openID + "--" + wx.getStorageSync('OpenID') + "--" + app.globalData.openID,
    //   showCancel: false,
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // });
    //请求个人的投票数据
    wx.request({
      url: 'https://www.superiot.vip/api/Vote/?OpenID=' + openID + '&rn=' + Math.random(),
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        self.setData({ MyVoteList: res.data });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 点击投票列表
  itemClick: function (e) {
    // console.log(e.target.dataset.voteid);
    // console.log("你点击了");
    // console.log('/pages/vote/vote?VoteID=' + e.target.dataset.voteid);
    //跳转到详情页
    wx.navigateTo({
      url: '/pages/vote/vote?VoteID=' + e.target.dataset.voteid + '&OpenID=' + openID,
      success: function (res) {
        // success
        // console.log('onBtnClick success() res:');
      },
      fail: function () {
        // fail
        // console.log('onBtnClick fail() !!!');
      },
      complete: function () {
        // console.log('onBtnClick complete() !!!');
        // complete
      }
    })

  }
})