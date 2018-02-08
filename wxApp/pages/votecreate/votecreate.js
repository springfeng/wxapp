// pages/voteCreate/votecreate.js

// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    Begindate:"",
    BeginTime: "00:00", 
    Enddate: "", 
    EndTime: "00:00",
    checkboxList:[0,1,2],
    voteMulti:true,
    voteCount: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = util.formatSingleDate(new Date());  

    this.setData({
      Begindate: date,
      Enddate: date
    });
    
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
  /**
   * 用户点击创建按钮
   */
  createVote: function (e){
    
  },
  /**
   * 多选
   */
  switchChange: function (e) {
    this.setData({
      voteMulti: e.detail.value
    })
  },
  /**
   * 限制次数
   */
  switch1Change: function (e) {
    this.setData({
      voteCount: e.detail.value
    })
  },
  /**
   * 添加选项
   */
  createItem: function (e) {
    var cb = this.data.checkboxList;
    cb.push(this.data.checkboxList.length + 1);
    this.setData({
      checkboxList: cb
    })
  },
  /**
   * 删除选项
   */
  deleteItem: function (e) {
    var cb = this.data.checkboxList;
    cb.pop(this.data.checkboxList.length);
    this.setData({
      checkboxList: cb
    })
  },
  /**
   * 用户选择开始日期
   */
  beginDateChange: function (e) {
    this.setData({
      Begindate: e.detail.value
    })
  },
  /**
   * 用户选择结束日期
   */
  EndDateChange: function (e) {
    this.setData({
      Enddate: e.detail.value
    })
  },
  /**
   * 用户选择结束时间
   */
  beginTimeChange: function (e) {
    this.setData({
      BeginTime: e.detail.value
    })
  },
  /**
   * 用户选择结束时间
   */
  EndTimeChange: function (e) {
    this.setData({
      EndTime: e.detail.value
    })
  },
  /**
   * 提交表单
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value;
    var postData={};
    postData["VoteItems"]="";
    for (var item in formData){
      var a = item.indexOf("VoteItems");
      if (item.indexOf("VoteItems")>=0){
        postData["VoteItems"]+=formData[item]+",";
      }else{
        postData[item]=formData[item];
      }
    }
    postData["VoteItems"] = postData["VoteItems"].substring(0, postData["VoteItems"].Length - 1);
    
    wx.request({
      url: 'https://share.ngrok.xiaomiqiu.cn/api/vote',
      data: postData,
      method:"POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

      }
    })  
  }
  
})