import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    userInfo: {},
    VoteTitle: '文字猜谜',
    VoteItemsList: [
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "妇女但反对" },
      { VoteItemID: "4176f2743561433abcf74049c7dc4e7c", ItemName: "543543" }
    ],
    ecBar: {
      // 如果想要禁止触屏事件，以保证在图表区域内触摸移动仍能滚动页面，
      // 就将 disableTouch 设为 true
      // disableTouch: true,

      onInit: initChart
    }
  },

  onReady() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onLoad: function (options) {
    // console.log("接收到的参数是str=" + options.VoteID + "-" + options.OpenID); 
    var self = this;

    //获取投票详情
    wx.request({
      url: 'https://www.superiot.vip/api/Statistics/?OpenID=' + options.OpenID + '&VoteID=' + options.VoteID + '&rn=' + Math.random(),
      method: "GET",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //必须修改才能post成功
      },
      success: function (res) {
        console.log(res);
        // self.setData({
        //   Vote: res.data,
        //   VoteItemsList: res.data.VoteItemsList,
        //   ItemSelected: {},
        //   OpenID: options.OpenID,
        //   VoteID: options.VoteID
        // });
      }
    })
  }
});

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "nihao"
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京：55'
      }, {
        value: 20,
        name: '武汉：20'
      }, {
        value: 10,
        name: '杭州：10'
      }, {
        value: 20,
        name: '广州：20'
      }, {
        value: 38,
        name: '上海：38'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  chart.on("click", function (e) {
    // console.log(e);
    // // 显示文字、图标，执行回调函数
    // console.log(wetoast);
    // wetoast.toast({
    //   // img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png',
    //   title: e.name + ':' + e.value +'百分比：'+ e.percent+'%',
    //   success(data) {
    //     // console.log(Date.now() + ': success')
    //   },
    //   fail(data) {
    //     // console.log(Date.now() + ': fail')
    //   },
    //   complete(data) {
    //     // console.log(Date.now() + ': complete')
    //   },
    //   duration:300
    // })
  })
  return chart;
}