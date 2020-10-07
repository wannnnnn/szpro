<template>
    <div class="page">

        <div class="header">
                云算力
         </div>
         <div class="wrap">
            
             <!-- 背景部分 -->
              <div class="wrapBg">
                  <div class="warpBgImg">
                      <img src="../../assets/img/orders/0d5e5bb0.bg@3x.png" alt="">
                  </div>
              </div>
             <!-- 内容部分 -->
              <div class="wrapTxt">
                   <div class="mallBox">
                         <div class="mallTitleBox">
                               <div class="mallTitleLeft">
                                    <div class="titleBox">
                                          <div class="title">合盈云算Filecoin 160T/台 3年合约</div>
                                          <div class="icon"><img src="../../assets/img/orders/HOT@2x.png" alt=""></div>
                                    </div>
                                    <div class="des">可扩展到576T，含1台机器加1年托管运维费用</div>
                               </div>
                               <div class="mallTitleRight">
                                     <a class="heyueLink">合约详情</a>
                               </div>
                         </div>
                         <!-- end -->

                         <div class="tipBox">
                               <div class="tipItem">
                                    <div class="tipTitle">Filecoin</div>
                                    <div class="tipDes">挖矿币种</div>
                               </div>
                               <div class="tipItem">
                                     <div class="tipTitle">T+1</div>
                                     <div class="tipDes">结算周期</div>
                               </div>
                               <div class="tipItem">
                                     <div class="tipTitle">一年一签</div>
                                     <div class="tipDes">合约期限</div>
                               </div>
                               <div class="tipItem">
                                      <div class="tipTitle">20.00%</div>
                                      <div class="tipDes">软件服务费</div>
                               </div>
                         </div>
                         <!-- end -->
            
                         <div class="precentBox">
                               <div class="precebtTip">总量：1000台</div>
                               <div class="precentView">
                                    <MallProgress :progress="sz_exist_buy"></MallProgress>
                               </div>
                         </div>
                         <!-- end -->

                         <div class="buyMoney">
                             <span style="font-size:0.26rem;color:#2C395B;">金额:</span>
                               {{sz_all_usdt.toFixed(2)}} USDT
                         </div>
                         <!-- end -->
                         <div class="buyNumBox">
                                <div class="buyNumWrap">
                                     <div class="buyNumLess" @click="reduceCount()">-</div>
                                     <div class="buyNumCount">{{amount}}</div>
                                     <div class="buyNumAdd" @click="addCount()">+</div>
                                </div>
                         </div>
                         <!-- end -->
                         <div class="buyBtn">
                              <div class="btn">确定</div>
                         </div>
                   </div>
              </div>  
         </div>
         <AppTabBar :tabIndex='1' @tabAction="tabAction"></AppTabBar>
    </div>
    
</template>

<script>
import { getOrder, getPrice } from "../../api/goods/goods";
import { getAssets } from "../../api/user/user";
import { Dialog } from "vant";
import AppTabBar from '../../component/TabBar/TabBar';
import MallProgress from './MallProgress';
import request from "../../api/request";
export default {
  name: "mall",
  components: {
    AppTabBar,
    MallProgress
  },
  data() {
    return {
      amount: 1,
      buy_type: "1",
      all_usdt: null,
      ehex: null,
      usdt: null,
      deposit_addr: null,
      my_usdt: 0, //我的资产
      my_ehex: 0, //我的资产
      show: false, //显示合约详情
      rate: null,
      currentRate: 1, //当前折扣
      exist_buy: null,

      sz_exist_buy:0,
      sz_all_usdt:0,//
    };
  },
  created() {
    // this.getPrices();
  },
  computed: {
    getLargeDiscount() {
      if (this.rate != null) {
        let r = this.rate[this.rate.length - 1].rate || 1;
        return r;
      }
    },
    getPercentage() {
      if (this.exist_buy != null) {
        let p = this.exist_buy / 20 || 0;
        return p;
      }
    }
  },
  mounted(){
      this.getPowerPriceAPI();
  },
  methods: {
    tabAction(index){
          if(index==0){
              this.$router.push('/home');
          }else if(index==1){
            
          }else if(index==2){
              this.$router.push('/awardPool');  
          }else{
              this.$router.push('/my');
          }
    },
    back() {
          if (window.history.length <= 1) {
            this.$router.push({ path: "/home" });
            return false;
          } else {
            this.$router.go(-1);
          } 
    },
    addCount() {
          this.amount++;
          this.getCurrentRate(this.amount);
    },
    reduceCount() {
          if (this.amount > 0) {
            this.amount--;
          } else {
            this.$toast({
              message: "不能小于0"
            });
          }
          this.getCurrentRate(this.amount);
    },
    getCurrentRate(v) {
          let arr = this.rate.filter((item, index) => {
            return v >= item.power;
          });
          let len = arr.length - 1;
          this.currentRate = arr[len] ? arr[len].rate : 1;
    },
    //获取我的资产
    getPowerPriceAPI(){
         let that = this;
          request.get(`/power/price`).then((res=>{
                  console.log('res',res);
                  let data = res.data.Data;
                  if (res.data.Code == 0) {
                      this.sz_exist_buy = data.exist_buy;
                      this.sz_all_usdt = data.all_usdt;
                  }else{
                    
                  }
          }));
    }
  }
};
</script>

<style scoped lang="scss">
.page{
    background: rgba(239, 240, 246, 1);
}
.header{
    position: fixed;
    width: 100%;
    height: 1.28rem;
    left: 0;
    top: 0;
    line-height: 1.28rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 500;
    color: #fff;
    z-index: 100;
}
.wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 1.04rem;
    width: 100%;
    overflow: auto;
    padding-bottom: 0.5rem;
}
.wrapBg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .warpBgImg{
        width: 100%;
        height: 3.87rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.wrapTxt{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .mallBox{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 1.2rem;
        height: 7.32rem;
        background: #FFFFFF;
        box-shadow: 0px 0.1rem 0.4rem 0px rgba(130, 149, 180, 0.17);
        border-radius:0.15rem;
        .mallTitleBox{
            margin-left: 0.2rem;
            margin-right: 0.2rem;
            height: 1.41rem;
            border-bottom:1px solid #E6E6E6;
            .mallTitleLeft{
               float: left;
               margin-top: 0.3rem;
               height: 0.8rem;
               .titleBox{
                   height: 0.3rem;
                   display: flex;
                   align-items: center;
                  .title{
                      max-width: 4.6rem;
                      height: 0.3rem;
                      font-size: 0.28rem;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #0B0C12;
                      line-height: 0.3rem;
                      overflow: hidden;
                  }
                  .icon{
                       margin-left: 0.13rem;
                       width: 0.31rem;
                       height: 0.37rem;
                       img{
                         width: 100%;
                         height: 100%;
                       }
                  }
               }
               .des{
                  margin-top: 0.2rem;
                  height: 0.3rem;
                  font-size: 0.22rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #5D6877;
                  line-height: 0.3rem;
                  text-align: left;
               }
            }
            .mallTitleRight{
              float: right;
              width: 1rem;
              height: 100%;
              // border: 1px solid #000;
              .heyueLink{
                   margin-top: 0.37rem;
                   width: 1rem;
                   height:0.36rem;
                  font-size: 0.24rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  text-decoration: underline;
                  color: #608AFF;
                  line-height: 0.36rem;
                  display: block;
              }
            }
        }
        .tipBox{
             margin-left: 0.2rem;
             margin-right: 0.2rem;
             margin-top: 0.2rem;
             height: 1.21rem;
             overflow: hidden;
             display: flex;
             .tipItem{
                flex: 1;
                height: 100%;
                overflow: hidden;
                .tipTitle{
                     margin-top: 0.2rem;
                     width:100%;
                     height: 0.3rem;
                     font-size:0.26rem;
                     font-family: Source Han Sans CN;
                     font-weight: bold;
                     color: #2C395B;
                     line-height: 0.3rem;
                     text-align: center;
                }
                .tipDes{
                     margin-top: 0.1rem;
                     width:100%;
                     height:0.3rem;
                     font-size: 0.22rem;
                     font-family: PingFang SC;
                     font-weight: 400;
                     color: #656F96;
                     line-height: 0.3rem;
                     text-align: center;
                }
             }
        }
        .precentBox{
             margin-left: 0.2rem;
             margin-right: 0.2rem;
             margin-top: 0.2rem;
             height: 0.7rem;
             position: relative;
             .precebtTip{
                  position:absolute;
                  right: 0;
                  top: 0.3rem;
                  width:1.5rem;
                  height:0.3rem;
                  font-size: 0.22rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: #656F96;
                  line-height:0.3rem;
                  overflow: hidden;
             }
             .precentView{
                  position:absolute;
                  left: 0;
                  right: 1.6rem;
                  top: 0;
                  height: 100%;
                  // border: 1px solid #000;
             }
        }
        .buyMoney{
             margin-left: 0.2rem;
             margin-right: 0.2rem;
             margin-top: 0.3rem;
             height: 0.6rem;
             text-align: center;
             font-size: 0.42rem;
             line-height: 0.6rem;
             color: #2F94F8;
             font-weight:bolder;
             overflow: hidden;
        }
        .buyNumBox{
             margin-top: 0.3rem;
             width: 100%;
             height: 0.8rem;
              .buyNumWrap{
                margin: 0 auto;
                width: 2.77rem;
                height: 0.73rem;
                background: #FFFFFF;
                border: 1px solid #BDC3D7;
                border-radius: 0.05rem;
                display: flex;
                align-items: center;
                .buyNumLess{
                   width: 0.7rem;
                   height: 0.73rem;
                   line-height: 0.73rem;
                   text-align: center;
                   border-right: 1px solid #BDC3D7;
                }
                .buyNumCount{
                    width: 1.37rem;
                    height: 0.73rem;
                    line-height: 0.73rem;
                    text-align: center;
                    font-size: 0.36rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #2C395B;
                }
                .buyNumAdd{
                   width: 0.7rem;
                   height: 0.73rem;
                   line-height: 0.73rem;
                   text-align: center;
                    border-left: 1px solid #BDC3D7;
                }
             }
        }
        .buyBtn{
              margin: 0 auto;
              margin-top: 0.3rem;
              width: 4.03rem;
              height: 0.8rem;
              background: linear-gradient(0deg, #2F79F4, #83C3FF);
              border-radius: 0.4rem;
              .btn{
                 line-height: 0.8rem;
                 height: 0.8rem;
                 width: 100%;
                 text-align: center;
                 color: #fff;
                 font-size: 0.36rem;
              }
        }
    }
}
</style>
