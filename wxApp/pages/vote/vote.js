// pages/vote/vote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    votetitle:"投票包体放大范德萨"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // { "VoteItemsList":[{ "VoteItemID": "bd5535ec640f468787605ca286c650c4", "ItemName": "测试选项3" }, { "VoteItemID": "bd5535ec640f468787605ca286c650c4", "ItemName": "测试选项2" }, { "VoteItemID": "bd5535ec640f468787605ca286c650c4", "ItemName": "测试选项" }], "VoteID":"bd5535ec640f468787605ca286c650c4", "VoteTitle":"测试投票", "OpenID":"oHm4a0ZjlzDfwDP1CFPhge3XdAxM", "BeginTime":"2018-03-09T00:00:00", "EndTime":"2018-03-09T00:00:00", "CreateTime":"0001-01-01T00:00:00" }
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
  ,
  /**
   * 用户选择结束时间
   */
  demo: function (e) {
    
    var d=$("#ico_selected");
    console.log(d);
  },
})