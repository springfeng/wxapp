// pages/vote/vote.js

//获取应用实例
const app = getApp();
var that = this;

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
  showTopTips: function () {
    
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    that.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    that.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    that.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    that.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    that.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    that.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    that.setData({
      isAgree: !!e.detail.value.length
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("接收到的参数是str=" + options.VoteID + "-" + options.OpenID); 
    //获取投票详情
    wx.request({
      url: 'https://www.superiot.vip/api/VoteDetail/?OpenID=' + options.OpenID + '&VoteID=' + options.VoteID+'&rn=' + Math.random(),
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        console.log(res);
        that.setData({ Vote: res.data });
      }
    })

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