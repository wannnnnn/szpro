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
                          <div class="poolPercent" id="liquidFill"></div> 
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
                                  自购3台存储服务器，累计推广业绩20台存储<br />服务器，统计直推和间推业绩。
                                </p>
                                 <p v-if="obj.level==2">
                                   自购5台存储服务器，累计推广业绩100台存储<br />服务器，统计直推和间推业绩。
                                </p>
                                 <p v-if="obj.level==3">
                                  自购10台存储服务器，累计推广业绩200台存储<br />服务器，统计直推和间推业绩。
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
    };
  },
  components: {
    AppTabBar,
  },
  mounted() {
     this.getDataAPI();
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
     getProgressVal(){
            var width = this.sell_num/1000*100;
            return width;
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
      // margin-left: -0.3rem;
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
          background: url(../../assets/img/awardPool/V1.png) no-repeat center;
      }
      .level2Img{
          background: url(../../assets/img/awardPool/v2.png) no-repeat center;
      }
      .level3Img{
          background: url(../../assets/img/awardPool/v3.png) no-repeat center;
      }
      .poolPercent{
          margin: 0 auto;
          height: 2.71rem;
          width: 2.71rem;
          margin-top: 0.4rem;
          border: 1px solid #000;
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




