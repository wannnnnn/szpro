<template>
  <div class="awardPool">
   
    <div class="wrap">
      <div class="banner">
            <div class="contentTxt">
                    <div class="awardPool-title"></div>
                    <div class="buy">立即<br />抢购</div>
                    <!-- <div class="progress">
                        <div class="count">已售<span>725</span><span>725/1000</span></div>
                    </div> -->
                    <div class="buyProgressBox">
                        <div class="buyProgressTop">
                            <div class="textLeft">
                                <span style="font-size:0.24rem;">已售</span>725
                            </div>
                            <div class="textRig">725/1000</div>
                        </div>
                        <div class="buyProgressBot">
                            <div class="progress"></div>
                        </div>
                    </div>
                    <p>
                      限1000台存储服务器，1000台存储服务器销售完毕后，统计达标用户数量，达标用户将享受不同奖励池的永久奖励。
                    </p>
            </div>
          
      </div>
    </div>


    <AppTabBar :tabIndex='2' @tabAction="tabAction"></AppTabBar>
  </div>
</template>

<script>
import AppTabBar from '../../component/TabBar/TabBar';
import echartsLiquidfill from "echarts-liquidfill"; //在这里引入
export default {
  name: "awardPool",
  data() {
    return {
      exist_buy: null,
      swiperOption: {
        direction: "horizontal",
        centeredSlides: true,
        initialSlide: 1
        // loop: true
      }
    };
  },
  components: {
    AppTabBar
  },
  computed: {
    getPercentage() {
      if (this.exist_buy != null) {
        let p = this.exist_buy / 20 || 0;
        return p;
      }
    }
  },
  mounted() {
    this.liquidFill();
    this.liquidFills();
    this.liquidFillss();
  },
  methods: {
    tabAction(index){
        if(index==0){
          this.$router.push('/home');
        }else if(index==1){
          this.$router.push('/mall');
        }else if(index==2){

        }else{
          this.$router.push('/my');
        }
    },
    liquidFill() {
      //方法
      var liquid = this.$echarts.init(document.getElementById("liquidFill"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
              {
                value: 0.25
              },
              0.25,
              0.24,
              0.23
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 30,
                  color: "#404C5A",
                  fontWeight: 500
                }
              }
            },
            outline: {
              //show: true , //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                //borderColor:'rgba(255,0,0,0.09)', //边框的颜色
                borderWidth: 0 //边框的宽度
                //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              }
            },
            backgroundStyle: {
              color: "#F4F6FF", //图表的背景颜色
              //borderWidth: '10',//图表的边框宽度
              //borderColor: '#000',//图表的边框颜色
              itemStyle: {
                shadowBlur: 100, //设置无用
                shadowColor: "#f60", //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#4B99E0" //阴影颜色
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },
            color: ["#4B99E0", "#4B99E0", "#4B99E0"], //水波的颜色 对应的是data里面值
            shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
            center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
            radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
            amplitude: 3, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            phase: 0, //波的相位弧度 默认情况下是自动
            period: (value, index) => {
              //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

              return index * 2000;
            },
            direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: "linear", //初始动画
            animationEasingUpdate: "quarticInOut", //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          }
        ]
        //backgroundColor: 'rgba(255,0,0,0.1)'容器背景颜色
      });
    },
    liquidFills() {
      //方法
      var liquid = this.$echarts.init(document.getElementById("level"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
              {
                value: 0.05
              },
              0.05,
              0.04,
              0.03
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 30,
                  color: "#404C5A",
                  fontWeight: 500
                }
              }
            },
            outline: {
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                borderWidth: 0 //边框的宽度
              }
            },
            backgroundStyle: {
              color: "#FFFAF3", //图表的背景颜色
              itemStyle: {
                shadowBlur: 100, //设置无用
                shadowColor: "#f60", //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#F5CA84" //阴影颜色
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },
            color: ["#F5CA84", "#F5CA84", "#F5CA84"], //水波的颜色 对应的是data里面值
            shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
            center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
            radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
            amplitude: 3, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            phase: 0, //波的相位弧度 默认情况下是自动
            period: (value, index) => {
              //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

              return index * 2000;
            },
            direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: "linear", //初始动画
            animationEasingUpdate: "quarticInOut", //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          }
        ]
      });
    },
    liquidFillss() {
      //方法
      var liquid = this.$echarts.init(document.getElementById("levels"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
              {
                value: 0.15
              },
              0.15,
              0.14,
              0.13
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 30,
                  color: "#404C5A",
                  fontWeight: 500
                }
              }
            },
            outline: {
              //show: true , //是否显示轮廓 布尔值
              borderDistance: 0, //外部轮廓与图表的距离 数字
              itemStyle: {
                //borderColor:'rgba(255,0,0,0.09)', //边框的颜色
                borderWidth: 0 //边框的宽度
                //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
                //shadowColor: '#000' //外部轮廓的阴影颜色
              }
            },
            backgroundStyle: {
              color: "#FBF1FF", //图表的背景颜色
              //borderWidth: '10',//图表的边框宽度
              //borderColor: '#000',//图表的边框颜色
              itemStyle: {
                shadowBlur: 100, //设置无用
                shadowColor: "#f60", //设置无用
                opacity: 1 //设置无用
              }
            },
            itemStyle: {
              opacity: 0.5, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#D599E1" //阴影颜色
            },
            emphasis: {
              itemStyle: {
                opacity: 1 //鼠标经过波浪颜色的透明度
              }
            },
            color: ["#D599E1", "#D599E1", "#D599E1"], //水波的颜色 对应的是data里面值
            shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
            center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
            radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
            amplitude: 3, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
            waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
            phase: 0, //波的相位弧度 默认情况下是自动
            period: (value, index) => {
              //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引

              return index * 2000;
            },
            direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
            waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
            animationEasing: "linear", //初始动画
            animationEasingUpdate: "quarticInOut", //数据更新的动画效果
            animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
            animationDurationUpdate: 300 //数据更新动画的时长
          }
        ]
        //backgroundColor: 'rgba(255,0,0,0.1)'容器背景颜色
      });
    }
  }
};
</script>

<style scoped lang="scss">
.awardPool {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.wrap {
  width:100%;
  height: 3.92rem;
  background: linear-gradient(62deg, #28261e, #201e18);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border: 1px solid #000;
  overflow: hidden;
  .banner {
    margin-left:0.2rem;
    margin-right:0.2rem;
    width: 100%;
    // margin-top:1rem;
    height: 3.23rem;
    border-top-left-radius:0.1rem;
    border-top-right-radius:0.1rem;
    border: 1px solid #000;
    background: url(../../assets/img/awardPool/pool_banner.png) no-repeat center;
    background-size: 100% 100%;
    .contentTxt {
      clear: both;
      width: 100%;
      height: 100%;
      position: relative;
      .awardPool-title {
          position: absolute;
          left: 0.2rem;
          top: 0.3rem;
          width: 1.68rem;
          height: 0.5rem;
          background: url(../../assets/img/awardPool/pool_front@2x.png) no-repeat center;
          background-size: 100% 100%;
      
      }
      .buyProgressBox{
          width: 3.98rem;
          position: absolute;
          left: 0.2rem;
          top: 1.2rem;
          height:1.1rem; 
          .buyProgressTop{
             width: 100%;
             height: 0.6rem;
             overflow: hidden;
             .textLeft{
                 float: left;
                 height: 0.6rem;
                 font-size: 0.48rem;
                 font-family: Source Han Sans CN;
                 font-weight: 500;
                 line-height: 0.6rem;
                 color: #604C3E;
             }
             .textRig{
                float: right;
                 height: 0.6rem;
                 line-height: 0.6rem;
                font-size: 0.22rem;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #604C3E;

             }
          }
          .buyProgressBot{
            margin-top: 0.15rem;
            width:100%;
            height:0.16rem;
            background: #EFCEA2;
            border-radius:0.08rem;
            overflow: hidden;
            .progress{
                width:50%;
                height:0.16rem;
                background: #624A38;
                border-radius:0.08rem;

            }
          }
      }
      .buy{
        position: absolute;
        right: 0px;
        top: 0px;
        width: 2.52rem;
        height: 2.02rem;
        margin-top: 0.2rem;
        text-align: center;
        padding-top: 0.65rem;
        font-size: 0.28rem;
        line-height: 0.35rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 1px 5px 9px #4c3828;
         background: url(../../assets/img/awardPool/top_img@2x.png) no-repeat center;
        background-size: 100% 100%;
      }
    }

    p {
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      bottom: 0.1rem;
      font-size: 0.24rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #806e62;
      line-height:0.38rem;
      opacity: 0.8;
      text-align: left;
    }

    
  }
}
</style>
