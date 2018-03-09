// pages/voteList/votelist.js

//获取应用实例
const app = getApp();

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
   var openID= app.globalData.openID;
   var self = this;
   //请求个人的投票数据
   wx.request({
     url: 'https://www.superiot.vip/api/Vote/?OpenID=' + openID,
     method: "GET",
     header: {
       'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
     },
     success: function (res) {
       console.log(res.data);
       self.setData({MyVoteList:res.data});
      
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

  }
})