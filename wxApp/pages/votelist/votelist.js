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
  //操作
  VoteClick: function (e) {
    var self = this;
    wx.showActionSheet({
      itemList: ['详情', '统计', '删除'],
      success: function (res) {
        // console.log(res.tapIndex)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
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
          } else if (res.tapIndex == 1) {
            //跳转到详情页
            wx.navigateTo({
              url: '/pages/Statistics/Statistics?VoteID=' + e.target.dataset.voteid + '&OpenID=' + openID,
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
          } else if (res.tapIndex == 2) {
            //删除
            wx.request({
              url: 'https://www.superiot.vip/api/Vote/?VoteID=' + e.target.dataset.voteid + '&OpenID=' + openID,
              method: 'delete', 
              header: {
                'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
              },
              success: function (json) {
                console.log(json)
                self.onLoad();
              }
            })
          }
        }
      }
    });
  }
})