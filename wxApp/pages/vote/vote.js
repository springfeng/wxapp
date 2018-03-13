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
      VoteItemsList: [
        { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "妇女但反对" }, 
        { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "543543" }
      ]
    }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var Items = this.data.Vote.VoteItemsList;
    console.log(this.data.Vote.VoteItemsList);
    for (var i = 0, len = Items.length; i < len; ++i) {
      Items[i].checked = Items[i].value == e.detail.value;
    }

    this.setData({
      radioItems: Items
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    // var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //   checkboxItems[i].checked = false;

    //   for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //     if (checkboxItems[i].value == values[j]) {
    //       checkboxItems[i].checked = true;
    //       break;
    //     }
    //   }
    // }

    // this.setData({
    //   checkboxItems: checkboxItems
    // });
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
        self.setData({ Vote: res.data });
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