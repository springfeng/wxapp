// pages/voteCreate/votecreate.js

// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

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
    Begindate: "",
    BeginTime: "00:00",
    Enddate: "",
    EndTime: "00:00",
    checkboxList: [0, 1, 2],
    VoteMulti: true,
    LimitTimes: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
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
  createVote: function (e) {

  },
  /**
   * 多选
   */
  switchChange: function (e) {
    this.setData({
      VoteMulti: e.detail.value
    })
  },
  /**
   * 限制次数
   */
  switch1Change: function (e) {
    this.setData({
      LimitTimes: e.detail.value
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
    var formData = e.detail.value;
    var postData = {};
    // console.log(formData)
    postData["VoteItems"] = "";
    var tmp = "";
    for (var item in formData) {
      if (item.indexOf("VoteItems") >= 0) {
        tmp += formData[item] + ",";
      } else {
        postData[item] = formData[item];
      }
    }
    // console.log(tmp)
    // console.log(tmp.substring(0, tmp.length - 1))
    postData["VoteItems"] = tmp.substring(0, tmp.length - 1);

    // console.log(JSON.stringify(postData) + '------------')
    //
    if (postData["VoteMulti"] == "true") {
      postData["VoteMulti"] = 1;
    } else {
      postData["VoteMulti"] = 0;
    }
    //
    if (postData["LimitTimes"] == "true") {
      postData["LimitTimes"] = 1;
    } else {
      postData["LimitTimes"] = 0;
    }
    //

    postData["OpenID"] = app.globalData.openID;
    // console.log(JSON.stringify(postData))
    if (postData.VoteItems == "" || postData.VoteTitle == "") {
      wx.showModal({
            content: "请确认填写是否正确！",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
      return;
    }
    wx.request({
      url: 'https://www.superiot.vip/api/Vote',
      data: postData,
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 3000
        });
      }
    })
  }
})