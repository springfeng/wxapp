// pages/vote/vote.js

//获取应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Vote:{
      VoteID:'2f43ad5e92234905b1b0b4a65704eea9',
      VoteTitle:'文字猜谜',
      OpenID: "oHm4a0ZjlzDfwDP1CFPhge3XdAxM",
      VoteMulti:1,
    },
    VoteItemsList: [
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "妇女但反对" },
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "543543" }
    ]
  },
  radioChange: function (e) {
    var Items = this.data.Vote.VoteItemsList;
    for (var i = 0; i< Items.length; i++) {
      if (Items[i].VoteItemID == e.detail.value){
        Items[i].checked=true;
      }else{
        Items[i].checked=false;
      }
    }
    // console.log(Items);
    this.setData({
      VoteItemsList: Items
    });
  },
  checkboxChange: function (e) {
    var Items = this.data.Vote.VoteItemsList;
    // console.log( Items);
    // console.log( e.detail.value);
    var values = e.detail.value;
    for (var i = 0; i < Items.length; i++) {
      Items[i].checked = false;
      // console.log(Items);
      for (var j = 0; j<values.length; j++) {
        if (Items[i].VoteItemID == values[j]) {
          Items[i].checked = true;
          break;
        }
      }
    }
    
    this.setData({
      VoteItemsList: Items
    });
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("接收到的参数是str=" + options.VoteID + "-" + options.OpenID); 
    var self=this;
    //获取投票详情
    wx.request({
      url: 'https://www.superiot.vip/api/VoteDetail/?OpenID=' + options.OpenID + '&VoteID=' + options.VoteID+'&rn=' + Math.random(),
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        console.log(res);
        self.setData({ Vote: res.data,
          VoteItemsList: res.data.VoteItemsList

         });
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
  ,
  /**
   * 用户选择结束时间
   */
  demo: function (e) {
    
    var d=$("#ico_selected");
    console.log(d);
  },
})