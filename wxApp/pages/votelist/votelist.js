// pages/voteList/votelist.js

//获取应用实例
var app = getApp();

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
    var openID;
    var self = this;
    if (app.globalData.openID == undefined || app.globalData.openID == null) {
      openID = wx.getStorageSync('OpenID') 
      console.log("从Storage获取OpenID");
    } else {
      openID = app.globalData.openID;
      console.log("从globalData获取OpenID");
    }

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
    console.log(e.target.dataset);
    console.log(e.target.dataset.voteid);
    console.log("你点击了");
    //跳转到详情页
    
  }
})