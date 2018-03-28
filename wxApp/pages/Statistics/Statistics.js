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
    OpenID: '',
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
      text: '同名数量统计',
      subtext: '纯属虚构',
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
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
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
  return chart;
}