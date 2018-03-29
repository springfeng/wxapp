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
    VoteTitle: '',
    VoteItems: [
      { ItemName: "", Value: "" }
    ],
    VoteUsers: [],
    ecBar: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
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
        // console.log(res);
        self.setData({
          VoteTitle: res.data.VoteTitle,
          VoteItems: res.data.VoteItems,
          VoteUsers: res.data.VoteUsers
        });

        // 获取组件
        self.ecComponent = self.selectComponent('#mychart-dom-move-bar');
        var colors = [];
        for (var i = 0; i < res.data.VoteItems.length; i++) {
          var color = getColor();
          colors.push(color);
        }


        self.ecComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);

          var option = {
            title: {
              text: self.data.VoteTitle,
              subtext: '',
              x: 'center'
            },
            backgroundColor: "#ffffff",
            color: colors,
            series: [{
              label: {
                normal: {
                  fontSize: 14
                }
              },
              type: 'pie',
              center: ['50%', '50%'],
              radius: [0, '60%'],
              data: self.data.VoteItems,
              // data: [{
              //   value: 55,
              //   name: '北京：55'
              // }, {
              //   value: 20,
              //   name: '武汉：20'
              // }, {
              //   value: 10,
              //   name: '杭州：10'
              // }, {
              //   value: 20,
              //   name: '广州：20'
              // }, {
              //   value: 38,
              //   name: '上海：38'
              // },
              // ],
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
          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });
      }
    })
  }
});

function getColor() {

  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}


// function initChart(canvas, width, height) {
//   const chart = echarts.init(canvas, null, {
//     width: width,
//     height: height
//   });
//   canvas.setChart(chart);

//   console.log(1)

//   var option = {
//     title: {
//       text: '',
//       subtext: '',
//       x: 'center'
//     },
//     tooltip: {
//       trigger: 'item',
//       formatter: "nihao"
//     },
//     backgroundColor: "#ffffff",
//     color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
//     series: [{
//       label: {
//         normal: {
//           fontSize: 14
//         }
//       },
//       type: 'pie',
//       center: ['50%', '50%'],
//       radius: [0, '60%'],
//       data: [{
//         value: 55,
//         name: '北京：55'
//       }, {
//         value: 20,
//         name: '武汉：20'
//       }, {
//         value: 10,
//         name: '杭州：10'
//       }, {
//         value: 20,
//         name: '广州：20'
//       }, {
//         value: 38,
//         name: '上海：38'
//       },
//       ],
//       itemStyle: {
//         emphasis: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 2, 2, 0.3)'
//         }
//       }
//     }]
//   };

//   chart.setOption(option);

//   return chart;
// }