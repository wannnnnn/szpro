<template>
  <div class="awardPool">
    <div class="wrap">
      <div class="banner">
        <div class="contentTxt">
          <div class="awardPool-title"></div>
          <div class="buy" @click="pushBuy()">立即<br />抢购</div>
          <div class="buyProgressBox">
            <div class="buyProgressTop">
              <div class="textLeft">
                <span style="font-size: 0.24rem">已售</span>{{sell_num}}
              </div>
              <div class="textRig">{{sell_num}}/1000</div>
            </div>
            <div class="buyProgressBot">
               <div class="progress" :style="{width:getProgressVal()+'%'}"></div>
            </div>
          </div>
          <p>
            限1000台存储服务器，1000台存储服务器销售完毕后，统计达标用户数量，达标用户将享受不同奖励池的永久奖励。
          </p>
        </div>
       
      </div>
      <!-- end -->

   
    </div>
       <div class="luboView">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(obj,index) in level_list" :key="index">
               <div class="swipePageView firstPage" :class="getPoolPageStyle(obj.level)">
                         <div class="titile">
                            <div class="img" :class="getLevelImg(obj.level)"></div>
                            V{{obj.level}} 奖励池
                          </div>
                          <div class="poolPercent" :class="getLevelPoolPercent(obj.level)" id="liquidFill" v-if="obj.level==1">
                               
                          </div> 
                          <div class="poolPercent" :class="getLevelPoolPercent(obj.level)" id="level" v-else-if="obj.level==2">
                               
                          </div> 
                          <div class="poolPercent" :class="getLevelPoolPercent(obj.level)" id="liquidFill3" v-else-if="obj.level==3">
                               
                          </div> 
                          <div class="group">
                                <div class="item">
                                    <div class="count">{{obj.today_fil}} Fil</div>
                                    <div class="text">今日新增</div>
                                </div>
                                <div class="item">
                                    <div class="count">{{obj.all_fil}} Fil</div>
                                    <div class="text">奖池累计</div>
                                </div>
                                <div class="item">
                                    <div class="count">{{obj.target_num}} 人</div>
                                    <div class="text">达标人数</div>
                                </div>
                                <div class="item">
                                    <div class="count">{{obj.pool_rate}} U</div>
                                    <div class="text">Fil当前价</div>
                                </div>
                          </div>
                          <div class="condition">
                                <div class="condition-title">达标条件</div>
                                <div class="line" :class="getLevelLine(obj.level)"></div>
                                <p v-if="obj.level==1">
                                  自购3台存储服务器，累计推广业绩20台存储<br />服务器。
                                </p>
                                 <p v-if="obj.level==2">
                                   自购5台存储服务器，累计推广业绩100台存储<br />服务器。
                                </p>
                                 <p v-if="obj.level==3">
                                  自购10台存储服务器，累计推广业绩200台存储<br />服务器。
                                </p>
                          </div>
               </div>
          </swiper-slide>
         
        </swiper>
      </div>

    <AppTabBar :tabIndex="2" @tabAction="tabAction"></AppTabBar>
  </div>
</template>

<script>
import request from "../../api/request";
import AppTabBar from "../../component/TabBar/TabBar";
import echartsLiquidfill from "echarts-liquidfill"; //在这里引入
export default {
  name: "awardPool",
  data() {
    return {
      exist_buy: null,
      swiperOption: {
        direction: "horizontal",
        centeredSlides: true,
        initialSlide: 1,
        // loop: true
      },
      sell_num:0,
      level_list:[],
      level1_pool_rate:0,
      level2_pool_rate:0,
      level3_pool_rate:0,
    };
  },
  components: {
    AppTabBar,
  },
  mounted() {
     this.getDataAPI();
    
    //  setTimeout(() => {
    //      this.liquidFill();
    // }, 1000);
    //  setTimeout(() => {
    //      this.liquidFills();
    // }, 1000);
    //  setTimeout(() => {
    //      this.liquidFillss();
    // }, 1000);
  },
  methods: {
    tabAction(index) {
          if (index == 0) {
            this.$router.push("/home");
          } else if (index == 1) {
            this.$router.push("/mall");
          } else if (index == 2) {
          } else {
            this.$router.push("/my");
          }
    },
    pushBuy(){
         this.$router.push("/mall");
    },
    getDataAPI(){
            let that = this;
            request.get(`/net_data/reward_pool_info`).then((res=>{
                    console.log('res',res);
                    let data = res.data.Data;
                    if (res.data.Code == 0) {
                        this.sell_num = data.sell_num;
                        this.level_list = data.level_list;
                        var list = data.level_list; 
                        for(var i=0;i<list.length;i++){
                            var obj = list[i];
                            if(i==0){
                                  this.level1_pool_rate = obj.pool_rate/100;
                                  setTimeout(() => {
                                     this.liquidFill();
                                  }, 1000);
                            }else  if(i==1){
                                  this.level2_pool_rate = obj.pool_rate/100;
                                  setTimeout(() => {
                                     this.liquidFills();
                                  }, 1000);
                            }else{
                                  this.level3_pool_rate = obj.pool_rate/100;
                                  setTimeout(() => {
                                     this.liquidFillss();
                                  }, 1000);
                            }
                        }
                    }else{
                      
                    }
            }));
    },
    getPoolPageStyle(level){
        var str = '';
        if(level){
            if(level==1){
                str = 'firstPage';
            }else if(level==2){
                str = 'secondPage';
            }else{
                str = 'threePage';
            }
        }
        return str;
    },
    getLevelImg(level){
        var str = '';
        if(level){
            if(level==1){
                str = 'level1Img';
            }else if(level==2){
                str = 'level2Img';
            }else{
                str = 'level3Img';
            }
        }
        return str;
    },
    getLevelLine(level){
        var str = '';
        if(level){
            if(level==1){
                str = 'level1Line';
            }else if(level==2){
                str = 'level2Line';
            }else{
                str = 'level3Line';
            }
        }
        return str;
    },
    getLevelPoolPercent(level){
        var str = '';
        if(level){
            if(level==1){
                str = 'level1PoolPercent';
            }else if(level==2){
                str = 'level2PoolPercent';
            }else{
                str = 'level3PoolPercent';
            }
        }
        return str;
    },
     getProgressVal(){
            var width = this.sell_num/1000*100;
            return width;
    },
    liquidFill() {
      let level1_pool_rate_01 = this.level1_pool_rate+0.03;
      let level1_pool_rate_02 = this.level1_pool_rate+0.07;
      let level1_pool_rate_03 = this.level1_pool_rate+0.11;

      //方法
      var liquid = this.$echarts.init(document.getElementById("liquidFill"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
              {
                value: this.level1_pool_rate
              },
              level1_pool_rate_01,
              level1_pool_rate_02,
              level1_pool_rate_03
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 15,
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
       let level1_pool_rate_01 = this.level2_pool_rate+0.03;
      let level1_pool_rate_02 = this.level2_pool_rate+0.07;
      let level1_pool_rate_03 = this.level2_pool_rate+0.11;
      //方法
      var liquid = this.$echarts.init(document.getElementById("level"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
               {
                value:this.level2_pool_rate
              },
              level1_pool_rate_01,
              level1_pool_rate_02,
              level1_pool_rate_03
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 15,
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
       let level1_pool_rate_01 = this.level3_pool_rate+0.03;
      let level1_pool_rate_02 = this.level3_pool_rate+0.07;
      let level1_pool_rate_03 = this.level3_pool_rate+0.11;
      //方法
      var liquid = this.$echarts.init(document.getElementById("liquidFill3"));
      liquid.setOption({
        series: [
          {
            type: "liquidFill",
            name: " ",
            data: [
               {
                value: this.level3_pool_rate
              },
              level1_pool_rate_01,
              level1_pool_rate_02,
              level1_pool_rate_03
            ],
            label: {
              normal: {
                formatter: function(param) {
                  return "矿池:" + param.value * 100 + "%";
                },
                textStyle: {
                  fontSize: 15,
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
    },
    getTest(){

    },
  },
};
</script>

<style scoped lang="scss">
.awardPool {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.wrap {
  width: 100%;
  height: 3.92rem;
  background: linear-gradient(62deg, #28261e, #201e18);
  overflow: hidden;
  .banner {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    margin-top: 0.6rem;
    height: 3.33rem;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    // border: 1px solid #000;
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
        background: url(../../assets/img/awardPool/pool_front@2x.png) no-repeat
          center;
        background-size: 100% 100%;
      }
      .buyProgressBox {
        width: 3.98rem;
        position: absolute;
        left: 0.2rem;
        top: 1.2rem;
        height: 1.1rem;
        .buyProgressTop {
          width: 100%;
          height: 0.6rem;
          overflow: hidden;
          .textLeft {
            float: left;
            height: 0.6rem;
            font-size: 0.48rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: 0.6rem;
            color: #604c3e;
          }
          .textRig {
            float: right;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.22rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #604c3e;
          }
        }
        .buyProgressBot {
          margin-top: 0.15rem;
          width: 100%;
          height: 0.16rem;
          background: #efcea2;
          border-radius: 0.08rem;
          overflow: hidden;
          .progress {
            width: 50%;
            height: 0.16rem;
            background: #624a38;
            border-radius: 0.08rem;
          }
        }
      }
      .buy {
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
        background: url(../../assets/img/awardPool/top_img@2x.png) no-repeat
          center;
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
      line-height: 0.38rem;
      opacity: 0.8;
      text-align: left;
    }
  }
 
}

 .luboView{
      width:100%;
      height: 8rem;
      // border: 1px solid #000;
  }
  .swiper-container {
    margin-top: 0.1rem;
    width: 5.46rem;
    height: 8rem;
    padding-left: 0.3rem;

    overflow: visible !important;
  }
  .swiper-container .swiper-wrapper .swiper-slide {
      width: 5.46rem;
      transform: scale(0.9);
      padding-top: 0.2rem;
  }

  .swiper-slide-active {
      margin-right: -0.3rem;
      margin-left: -0.3rem;
      transform: scale(1) !important;
      height: 8.07rem !important;
      padding-top: 0 !important;
  }
  .swipePageView{
      width: 5.46rem;
      height: 8.07rem;
      padding-top: 0.22rem;
      padding-left: 0.27rem;
      .titile {
          display: flex;
          align-items: center;
          font-size: 0.28rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          font-style: italic;
          color: #3d2e57; 
      }
      .img {
          width:0.79rem;
          height: 0.74rem;
          background: url(../../assets/img/awardPool/V1.png) no-repeat center;
          background-size: 100% 100%;
      }
      .level1Img{
           width:0.68rem;
          height: 0.76rem;
          background: url(../../assets/img/awardPool/V1.png) no-repeat center;
      }
      .level2Img{
           width:0.63rem;
          height: 0.62rem;
          background: url(../../assets/img/awardPool/v2.png) no-repeat center;
      }
      .level3Img{
          width:0.79rem;
          height: 0.74rem;
          background: url(../../assets/img/awardPool/v3.png) no-repeat center;
      }
      .poolPercent{
          margin: 0 auto;
          height: 2.71rem;
          width: 2.71rem;
          margin-top: 0.4rem;
          line-height: 2.71rem;
          text-align: center;
          font-size: 0.5rem;
          // border: 1px solid #000;
      }
      .level1PoolPercent{
           background: url(../../assets/img/awardPool/v1_pool.png) no-repeat center;
           background-size: 100% 100%;
      }
      .level2PoolPercent{
           background: url(../../assets/img/awardPool/v2_pool.png) no-repeat center;
           background-size: 100% 100%;
      }
      .level3PoolPercent{
           background: url(../../assets/img/awardPool/v3_pool.png) no-repeat center;
           background-size: 100% 100%;
      }
      .group {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 0.22rem;
        margin-left: -0.2rem;
        overflow: hidden;
        .item {
          width: 50%;
          text-align: center;
          font-size: 0.22rem;
          margin-bottom: 0.38rem;
          font-family: Source Han Sans CN;
          .count {
            font-weight: 500;
            color: #313243;
            margin-bottom: 0.07rem;
          }
          .text {
            font-weight: 500;
            color: #5d6877;
          }
        }
      }
      .condition {
          padding-left:0.36rem;
          .condition-title {
            font-size: 0.28rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            font-style: italic;
            color: #404c5a;
            text-align: left;
          }
          .line {
            width:1.37rem;
            height: 0.15rem;
            margin-top: -0.15rem;
            margin-left: -0.13rem;
            background: url(../../assets/img/awardPool/V1_line.png) no-repeat center;
            background-size: 100% 100%;
          }
          .level1Line{
            background: url(../../assets/img/awardPool/V1_line.png) no-repeat center;
          }
          .level2Line{
            background: url(../../assets/img/awardPool/v2_line.png) no-repeat center;
          }
          .level3Line{
            background: url(../../assets/img/awardPool/v3_line.png) no-repeat center;
          }
          p {
            margin-top: 0.2rem;
            font-size: 0.2rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #5d6877;
            line-height:0.3rem;
            opacity: 0.7;
            text-align: left;
          }
    }

}
.firstPage{
      background: url(../../assets/img/awardPool/V1_box.png) no-repeat center;
      background-size: 100% 100%;
}
.secondPage{
      background: url(../../assets/img/awardPool/v2_box.png) no-repeat center;
      background-size: 100% 100%;
}
.threePage{
      background: url(../../assets/img/awardPool/v3_box.png) no-repeat center;
      background-size: 100% 100%;
}
</style>




