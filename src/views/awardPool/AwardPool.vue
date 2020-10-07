<template>
  <div class="awardPool">
    <div class="wrap">
      <div class="banner">
        <div class="contentTxt">
          <div class="awardPool-title"></div>
          <div class="buy">立即<br />抢购</div>
          <div class="buyProgressBox">
            <div class="buyProgressTop">
              <div class="textLeft">
                <span style="font-size: 0.24rem">已售</span>725
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
      <!-- end -->

      <div class="luboView">
        <swiper :options="swiperOption">
          <swiper-slide> 11 </swiper-slide>
          <swiper-slide> 11 </swiper-slide>
          <swiper-slide> 11 </swiper-slide>
        </swiper>
      </div>
    </div>

    <AppTabBar :tabIndex="2" @tabAction="tabAction"></AppTabBar>
  </div>
</template>

<script>
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
    };
  },
  components: {
    AppTabBar,
  },
  mounted() {},
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
  .swiper-container {
    margin-top: 0.1rem;
    width: 5.46rem;
    height: 2rem;
    padding-left: 30px;
    border: 1px solid #000;
    overflow: visible !important;
  }
}
</style>




