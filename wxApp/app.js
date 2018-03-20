//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录开始--' + JSON.stringify(res) );
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.superiot.vip/api/wechat/?jsCode='+res.code,
            method: 'GET',
            success:function (json) {
              console.log('请求openID--' + JSON.stringify(json.data));
              if(json.data.retCode){
                // wx.showModal({
                //   content: json.data.retContent,
                //   showCancel: false,
                //   success: function (res) {
                //     if (res.confirm) {
                //       console.log('用户点击确定')
                //     }
                //   }
                // });
                //成功
                getApp().globalData.openID = json.data.retContent;
                //将openid存储到本地手机
                wx.setStorageSync('OpenID', json.data.retContent);

                console.log('获取用户登录态成功！' + json.data.retContent);
              }else{
                //失败
                console.log('获取用户登录态失败！' + res.errMsg);
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          //没有授权则调用授权界面
          wx.authorize({
            scope: 'scope.userInfo',
            success:res => {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId

                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            },
            fail:res=>{
              //授权失败则提示需要授权才能使用
              wx.showModal({
                title: '授权失败！',
                content: '本程序必须授权才能使用',
                confirmText: "授权",
                cancelText: "取消",
                success: function (res) {
                  if (res.confirm) {
                    //设置授权操作
                    wx.openSetting({
                      success: (res) => {
                         res.authSetting = {
                           "scope.userInfo": true,
                           "scope.userLocation": true
                         }
                         
                         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                         wx.getUserInfo({
                           success: res => {
                             // 可以将 res 发送给后台解码出 unionId

                             this.globalData.userInfo = res.userInfo

                             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                             // 所以此处加入 callback 以防止这种情况
                             if (this.userInfoReadyCallback) {
                               this.userInfoReadyCallback(res)
                             }
                           }
                         })
                      }
                    })
                  } else {
                    //取消操作
                  }
                }
              });
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openID:null
  }
})