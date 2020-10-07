<template>
  <div class="awardPool">
   
    <div class="wrap">
      <div class="banner">
        <div class="contentTxt">
             <div class="awardPool-title"></div>
             <div class="buy">立即<br />抢购</div>
             <div class="progress">
              <div class="count">已售<span>725</span><span>725/1000</span></div>
              <van-progress
                color="#624A38"
                :percentage="getPercentage || 30"
                stroke-width="10px"
                :show-pivot="false"
                track-color="#EFCEA2"
              />
            </div>
        </div>
        <p>
          限1000台存储服务器，1000台存储服务器销售完毕后，统计达标用户数量，达标用户将享受不同奖励池的永久奖励。
        </p>
      </div>
    </div>


    <swiper :options="swiperOption">
      <swiper-slide>
        <div class="intro first">
          <div class="titile">
            <div class="img"></div>
            V1 奖励池
          </div>
          <div class="pool-percent" id="liquidFill"></div>
          <div class="group">
            <div class="item">
              <div class="count">22,325 Fil</div>
              <div class="text">今日新增</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 Fil</div>
              <div class="text">奖池累计</div>
            </div>
            <div class="item">
              <div class="count">20 人</div>
              <div class="text">达标人数</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 U</div>
              <div class="text">Fil当前价</div>
            </div>
          </div>
          <div class="condition">
            <div class="condition-title">达标条件</div>
            <div class="line"></div>
            <p>
              自购3台存储服务器，累计推广业绩20台存储<br />服务器，统计直推和间推业绩。
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="intro second">
          <div class="titile">
            <div class="img"></div>
            V2 奖励池
          </div>
          <div class="pool-percent" id="level"></div>
          <div class="group">
            <div class="item">
              <div class="count">22,325 Fil</div>
              <div class="text">今日新增</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 Fil</div>
              <div class="text">奖池累计</div>
            </div>
            <div class="item">
              <div class="count">20 人</div>
              <div class="text">达标人数</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 U</div>
              <div class="text">Fil当前价</div>
            </div>
          </div>
          <div class="condition">
            <div class="condition-title">达标条件</div>
            <div class="line"></div>
            <p>
              自购5台存储服务器，累计推广业绩100台存储<br />服务器，统计直推和间推业绩。
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="intro three">
          <div class="titile">
            <div class="img"></div>
            V3 奖励池
          </div>
          <div class="pool-percent" id="levels"></div>
          <div class="group">
            <div class="item">
              <div class="count">22,325 Fil</div>
              <div class="text">今日新增</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 Fil</div>
              <div class="text">奖池累计</div>
            </div>
            <div class="item">
              <div class="count">20 人</div>
              <div class="text">达标人数</div>
            </div>
            <div class="item">
              <div class="count">2,514.39 U</div>
              <div class="text">Fil当前价</div>
            </div>
          </div>
          <div class="condition">
            <div class="condition-title">达标条件</div>
            <div class="line"></div>
            <p>
              自购10台存储服务器，累计推广业绩200台存储<br />服务器，统计直推和间推业绩。
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>

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
@import "assets/style/common";
@import "assets/style/icon";
.swiper-container {
  margin-top: 0.1rem;
  width: 546px;
  height: 2rem;
  padding-left: 30px;
  overflow: visible !important;
}
.notice {
  position: absolute;
  left: 226px;
  top: 220px;
  font-size: 0.8rem;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #404c5a;
  z-index: 7;
}
.intro {
  width: 546px;
  height: 807px;
  padding-top: 22px;
  padding-left: 27px;
  .titile {
    display: flex;
    align-items: center;
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    font-style: italic;
    color: #3d2e57;
  }
  .img {
    width: 79px;
    height: 74px;
  }

  .pool-percent {
    height: 271px;
    width: 271px;
    margin-left: 105px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #404c5a;
    .counts {
      width: 223px;
      height: 223px;
      box-shadow: 0px 9px 24px 0px rgba(213, 153, 225, 0.53);
      border-radius: 50%;
      text-align: center;
      padding-top: 50px;
    }
  }
  .group {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 22px;
    margin-left: -20px;
    .item {
      width: 50%;
      text-align: center;
      font-size: 0.613rem;
      margin-bottom: 38px;
      font-family: Source Han Sans CN;
      .count {
        font-weight: 500;
        color: #313243;
        margin-bottom: 7px;
      }
      .text {
        font-weight: 500;
        color: #5d6877;
      }
    }
  }
  .condition {
    padding-left: 36px;
    .condition-title {
      font-size: 0.747rem;
      font-family: Source Han Sans CN;
      font-weight: bold;
      font-style: italic;
      color: #404c5a;
    }
    .line {
      width: 137px;
      height: 15px;
      margin-top: -15px;
      margin-left: -13px;
    }
    p {
      margin-top: 20px;
      font-size: 0.533rem;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #5d6877;
      line-height: 30px;
      opacity: 0.7;
    }
  }
}

.swiper-container .swiper-wrapper .swiper-slide {
  width: 546px;
  transform: scale(0.9);
  padding-top: 20px;
}

.swiper-slide-active {
  margin-right: -30px;
  margin-left: -30px;
  transform: scale(1) !important;
  height: 807px !important;
  padding-top: 0 !important;
}

.first {
  @include imgRetina("awardPool/V1_box", png, 100%, 100%, no-repeat, center);
  .img {
    @include imgRetina("awardPool/V1", png, 100%, 100%, no-repeat, center);
  }
  .pool-percent {
    @include imgRetina("awardPool/v1_pool", png, 100%, 100%, no-repeat, center);
  }
  .counts {
    background: #f4f6ff;
  }
  .line {
    @include imgRetina("awardPool/V1_line", png, 100%, 100%, no-repeat, center);
  }
}

// .second {
//   @include imgRetina("awardPool/v2_box", png, 100%, 100%, no-repeat, center);
//   .img {
//     @include imgRetina("awardPool/v2", png, 100%, 100%, no-repeat, center);
//   }
//   .pool-percent {
//     @include imgRetina("awardPool/v2_pool", png, 100%, 100%, no-repeat, center);
//   }
//   .counts {
//     background: #fffaf3;
//   }
//   .line {
//     @include imgRetina("awardPool/v2_line", png, 100%, 100%, no-repeat, center);
//   }
// }

// .three {
//   @include imgRetina("awardPool/v3_box", png, 100%, 100%, no-repeat, center);
//   .img {
//     @include imgRetina("awardPool/v3", png, 100%, 100%, no-repeat, center);
//   }
//   .pool-percent {
//     @include imgRetina("awardPool/v3_pool", png, 100%, 100%, no-repeat, center);
//   }
//   .counts {
//     background: #fbf1ff;
//   }
//   .line {
//     @include imgRetina("awardPool/v3_line", png, 100%, 100%, no-repeat, center);
//   }
// }

.swiper-container .swiper-wrapper .swiper-slide img {
  width: 100%;
  height: 2rem;
  border-radius: 0.1rem;
}

.swiper-container .swiper-wrapper .swiper-slide-prev {
  height: 2rem !important;
}

.swiper-container .swiper-wrapper .swiper-slide-prev img {
  height: 2rem !important;
}

.swiper-container .swiper-wrapper .swiper-slide-next {
  height: 2rem !important;
}

.swiper-container .swiper-wrapper .swiper-slide-next img {
  height: 2rem !important;
}

.swiper-container .swiper-wrapper .swiper-slide-active {
  width: 546px;
}

.awardPool {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.wrap {
  width:100%;
  height: 192px;
  background: linear-gradient(62deg, #28261e, #201e18);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border: 1px solid #000;
  overflow: hidden;
  .banner {
    margin-left:15px;
    margin-right:15px;
    width: 100%;
    margin-top:50px;
    height: 182px;
    // border-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius:10px;
    // padding-left: 42px;
    border: 1px solid #000;
    @include imgRetina(
      "awardPool/pool_banner",
      png,
      100%,
      10.347rem,
      no-repeat,
      center
    );

    .contentTxt {
      // display: flex;
      clear: both;
      width: 100%;
      height: 120px;
      border: 1px solid red;
      position: relative;
      .awardPool-title {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 84px;
        height: 25px;
        @include imgRetina(
          "awardPool/pool_front",
          png,
          100%,
          100%,
          no-repeat,
          center
        );
      }

     

      .progress {
          // margin-top: 61px;
          border: 1px solid #000; 
          width: 200px;
          position: absolute;
          left: 20px;
          top: 61px;
          height: 50px; 
          .count {
            color: #604c3e;
            font-size: 15px;
            overflow: hidden;
            text-align: left;

            span:nth-child(1) {
              font-size: 20px;
              // margin-right: 160px;
              font-weight: 700;
              margin-left: 5px;
            }

            span:nth-child(2) {
              font-size: 15px;
            }
          }

          .van-progress {
            width: 100%;
            margin-top: 16px;
          }
      }

      .buy{
        position: absolute;
        right: 0px;
        top: 0px;
        width: 126px;
        height: 101px;
        margin-top: 10px;
        text-align: center;
        padding-top: 35px;
        font-size: 15px;
        line-height: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        text-shadow: 1px 5px 9px #4c3828;
        @include imgRetina(
          "awardPool/top_img",
          png,
          100%,
          100%,
          no-repeat,
          center
        );
      }
    }

    p {
      margin-top: 15px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #806e62;
      line-height: 20px;
      opacity: 0.8;
      text-align: left;
    }

    
  }
}
</style>
