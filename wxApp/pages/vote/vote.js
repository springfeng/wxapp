// pages/vote/vote.js

//获取应用实例
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Vote: {
      VoteID: '2f43ad5e92234905b1b0b4a65704eea9',
      VoteTitle: '文字猜谜',
      OpenID: "oHm4a0ZjlzDfwDP1CFPhge3XdAxM",
      VoteMulti: 1,
    },
    VoteItemsList: [
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "妇女但反对" },
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "543543" }
    ],
    ItemSelected: {},
    OpenID:'',
    VoteID:''
  },
  radioChange: function (e) {
    var Items = this.data.VoteItemsList;
    var itemsel = this.data.ItemSelected;
    for (var i = 0; i < Items.length; i++) {
      if (Items[i].VoteItemID == e.detail.value) {
        Items[i].checked = true;
        itemsel[Items[i].VoteItemID] = Items[i].VoteItemID;
      } else {
        Items[i].checked = false;
        delete itemsel[Items[i].VoteItemID];
      }
    }
    console.log(itemsel)
    this.setData({
      VoteItemsList: Items,
      ItemSelected: itemsel
    });
  },
  checkboxChange: function (e) {
    //所有投票项
    var Items = this.data.VoteItemsList;
    var itemsel = this.data.ItemSelected;
    //所有选中的项
    var values = e.detail.value;
    for (var i = 0; i < Items.length; i++) {
      Items[i].checked = false;
      delete itemsel[Items[i].VoteItemID];
      for (var j = 0; j < values.length; j++) {
        if (Items[i].VoteItemID == values[j]) {
          Items[i].checked = true;
          itemsel[Items[i].VoteItemID] = Items[i].VoteItemID;
          break;
        }
      }
    }
    console.log(itemsel)
    this.setData({
      VoteItemsList: Items,
      ItemSelected: itemsel
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("接收到的参数是str=" + options.VoteID + "-" + options.OpenID); 
    var self = this;

    //获取投票详情
    wx.request({
      url: 'https://www.superiot.vip/api/VoteDetail/?OpenID=' + options.OpenID + '&VoteID=' + options.VoteID + '&rn=' + Math.random(),
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        console.log(res);
        self.setData({
          Vote: res.data,
          VoteItemsList: res.data.VoteItemsList,
          ItemSelected: {},
          OpenID: options.OpenID,
          VoteID: options.VoteID
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
    var article_title="全民投票小助手-免费、协同、高效、投票";
      var path = '/pages/vote/vote?VoteID=' + this.data.VoteID + '&OpenID=' + this.data.OpenID;
    return {
      title: article_title,
      path: path
    }
  }
  ,
  /**
   * 用户选择结束时间
   */
  demo: function (e) {

    var d = $("#ico_selected");
    console.log(d);
  },
  /**
   * 提交表单
   */
  formSubmit: function (e) {
    var itemsel = this.data.ItemSelected;
    var arr = Object.keys(itemsel); 
    if (arr.length > 0) {
      //选中项 提交表单
      var postData ={};
      postData["VoteID"] = this.data.VoteID;
      postData["OpenID"] = this.data.OpenID;
      var itemsStr="";
      for (var tmp in itemsel){
        itemsStr +=tmp+",";
      } 
      itemsStr = itemsStr.substring(0, itemsStr.length - 1);
      postData["VoteItemIDs"] = itemsStr;
      
      console.log(postData);

      wx.request({
        url: 'https://www.superiot.vip/api/Vote',
        data: postData,
        method: "PUT",
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
    else {
      //没选中项 提示重选
      wx.showModal({
        content: '没选中任何选项！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            
          }
        }
      });
    }
  }
})