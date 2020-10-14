<template>
    <div class="page">
        <div class="header" :class="{headerNav:isShowDepNav}">
                产品
         </div>
         <div class="wrap" ref="pageWrap">
             <!-- 背景部分 -->
              <div class="wrapBg">
                  <div class="warpBgImg">
                      <img src="../../assets/img/orders/0d5e5bb0.bg@3x.png" alt="">
                  </div>
              </div>
             <!-- 内容部分 -->
              <div class="wrapTxt">
                   <!--  顶部的mall -->
                   <div class="mallBox">
                         <div class="mallTitleBox">
                               <div class="mallTitleLeft">
                                    <div class="titleBox">
                                          <div class="title">河图超算 160T/台   可扩展 | 永久产权</div>
                                          <div class="icon"><img src="../../assets/img/orders/HOT@2x.png" alt=""></div>
                                    </div>
                                    <div class="des">可扩展到576T，含1台机器加1年托管运维费用</div>
                               </div>
                               <div class="mallTitleRight" @click="isShowIpfsModel=true">
                                     <a class="heyueLink">产品详情</a>
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
                                     <div class="tipDes">托管期限</div>
                               </div>
                               <div class="tipItem">
                                      <div class="tipTitle">30.00%</div>
                                      <div class="tipDes">托管运营费</div>
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
                         <div class="equalMoney">≈ ￥ {{(sz_all_usdt*6.7).toFixed(2)}}</div>
                         <!-- end -->
                         <div class="buyNumBox">
                                <div class="buyNumWrap">
                                     <div class="buyNumLess" @click="reduceCount()">-</div>
                                     <div class="buyNumCount">{{amount}}</div>
                                     <div class="buyNumAdd" @click="addCount()">+</div>
                                </div>
                                <div class="unit">台</div>
                         </div>
                         <!-- end -->
                         <div class="buyBtn" @click="isShowConfimModel=true">
                              <div class="btn">确定</div>
                         </div>
                   </div>

                   <!-- end -->
                    <!-- mall 2 -->
                    <div class="mall2Box">
                         <div class="mallTitleBox">
                               <div class="mallTitleLeft">
                                    <div class="titleBox">
                                          <div class="title">洛书云算</div>
                                          <div class="icon"><img src="../../assets/img/orders/HOT@2x.png" alt=""></div>
                                    </div>

                               </div>
                               <div class="mallTip"><img src="../../assets/img/mall/mall_tip.png" alt=""></div>
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
                                     <div class="tipTitle">365天</div>
                                     <div class="tipDes">合约期限</div>
                               </div>
                               <div class="tipItem">
                                      <div class="tipTitle">30.00%</div>
                                      <div class="tipDes">托管运营费</div>
                               </div>
                         </div>
                         <!-- end -->
            
                         <div class="precentBox">
                               <div class="precebtTip">总量：1000台</div>
                               <div class="precentView">
                                    <MallProgress :progress="0"></MallProgress>
                               </div>
                         </div>
                         <!-- end -->

                         <div class="buyMoney">
                             <span style="font-size:0.26rem;color:#2C395B;">金额:</span>
                               0.00 USDT
                         </div>
                         <div class="equalMoney">≈ ￥ 0.00</div>
                         <!-- end -->
                         <div class="buyNumBox">
                                <div class="buyNumWrap">
                                     <div class="buyNumLess" >-</div>
                                     <div class="buyNumCount">1</div>
                                     <div class="buyNumAdd" >+</div>
                                </div>
                                <div class="unit">台</div>
                         </div>
                         <!-- end -->
                         <div class="buyBtn" >
                              <div class="btn">确定</div>
                         </div>
                   </div>
                   <div class="botSep" style="width:100%;height:0.5rem;"></div>
                   <!-- end -->

              </div>  
         </div>
         <AppTabBar :tabIndex='1' @tabAction="tabAction"></AppTabBar>

         <!-- 确认订单 -->
         <div id="confimModel" v-show="isShowConfimModel">
              <div class="modelContent">
                    <div class="modelContentTitle">确认订单
                         <div class="closeBtn" @click="isShowConfimModel=false">
                              <div class="closeInner"><img src="../../assets/img/close_gray.png" alt=""></div>
                         </div>
                    </div>
                    <div class="txtItem" style="margin-top:0.3rem;">
                         <div class="textItemLeft">合约名称：</div>
                         <div class="textItemVal">
                                河图超算 160T/台   可扩展 | 永久产权</div>
                    </div>
                     <div class="txtItem">
                         <div class="textItemLeft">托管期限：</div>
                         <div class="textItemVal">一年一签，服务器物权属于用户</div>
                    </div>
                     <div class="txtItem">
                         <div class="textItemLeft">托管运营费:</div>
                         <div class="textItemVal">filecoin挖矿产出30%</div>
                    </div>
                     <div class="txtItem">
                         <div class="textItemLeft">结算周期：</div>
                         <div class="textItemVal">T+1</div>
                     </div>
                     <div class="txtItem">
                         <div class="textItemLeft">单价：</div>
                         <div class="textItemVal">${{sz_all_usdt}}/台</div>
                     </div>
                     <div class="buyNumItem">
                          <div class="buyNumItemLeft">购买数量：</div>
                           <div class="buyNumWrap">
                                  <div class="buyNumLess" @click="reduceCount()">-</div>
                                  <div class="buyNumCount">{{amount}}</div>
                                  <div class="buyNumAdd" @click="addCount()">+</div>
                            </div>
                     </div>
                     <div class="line"></div>
                      <div class="txtItem">
                         <div class="textItemLeft">总计金额</div>
                         <div class="textItemVal" style="color:#608AFF;font-size:0.4rem;font-weight: normal;">{{amount*sz_all_usdt}} USDT</div>
                     </div>
                     <div class="xieyibox">
                           <div class="checkBox" @click="changeAgree()">
                                 <img src="../../assets/img/mall/check_un.png" alt="" v-show="!isAgree">
                                 <img src="../../assets/img/mall/check_in.png" alt="" v-show="isAgree">
                           </div>
                           <div class="xieyiTitle">
                                我已阅读并同意
                                <span style="color:#7288FE;" @click="pushAction(4)">《用户托管协议》</span>
                            </div> 
                    </div>
                     <div class="buyBtn" @click="buyPowerAPI()">
                          <div class="btnTxt">立即购买</div>

                      </div>
              </div>
              <div class="maskView" @click="isShowConfimModel=false"></div>
         </div>
         <!-- end -->
         <!-- 去充值 -->
         <div id="chargeModel" v-show="isShowChargeModel">
               <div class="modelContent">
                     <div class="title">您的账户余额不足</div>
                     <div class="btnBox">
                         <div class="btnItem" style="border-right: 1px  solid #F7F8FC;" @click="isShowChargeModel=false">取消</div>
                         <div class="btnItem" style="color: #007AFF;" @click="pushAction(3)">去充值</div>
                     </div>
               </div>
               <div class="maskView" @click="isShowChargeModel=false"></div>
         </div>

          <!-- 去充值 -->
         <div id="chargeModel" v-show="isShowLoginModel">
               <div class="modelContent">
                     <div class="title">登录后才能购买哦</div>
                     <div class="btnBox">
                         <div class="btnItem" style="border-right: 1px  solid #F7F8FC;" @click="pushAction(2)">注册</div>
                         <div class="btnItem" style="color: #007AFF;" @click="pushAction(1)">去登录</div>
                     </div>
               </div>
               <div class="maskView" @click="isShowLoginModel=false"></div>
         </div>

          <!-- 购买成功 -->
         <div id="buySuccessModel" v-show="isShowBuySuccessModel">
               <div class="buySuccessBg"><img src="../../assets/img/buy_success.png" alt="">
                     <div class="closeBtn" @click="isShowBuySuccessModel=false">
                        <img src="../../assets/img/close_gray_01.png" alt="">
                    </div>
                    <div class="buySuccessTip">
                                恭喜您，成功购买<span style="color:#608AFF;">{{amount}}</span>台!</div>
               </div>
               
               <div class="maskView" @click="isShowBuySuccessModel=false"></div>
         </div>


          <!-- IPFS·Filecoin服务器 -->
         <div id="ipfsModel" v-show="isShowIpfsModel">
               <div class="modelContent">
                    <div class="modelContentTitle">河图超算服务器Filecoin
                         <div class="closeBtn" @click="isShowIpfsModel=false">
                              <div class="closeInner"><img src="../../assets/img/close_gray.png" alt=""></div>
                         </div>
                    </div>
                    <div class="textBox">
                         
                                服务器售价：86686 USDT /160TB/台（可扩展到576T）； <br><br>

1台起购，以1台为单位递增( 86686USDT / 台)<br><br>

托管运营费<br>
收取挖矿产出Filecoin数量的30%作为托管运营费。托管运营费包括：矿场维护、矿机部署、矿机维修、技术服务、人力资源支出、社群奖励等费用。<br><br>

服务器合约费用说明<br>
用户购买矿池的Filecoin服务器合约费用已包含第一年服务期限内的分布式存储服务器租赁费、IP地址费、电费、带宽费、网络安全、矿池挖矿系统使用费等费用。<br><br>

服务器有效挖币期为三年，第二年及第三年需按照每5元/T/月收取机房托管服务费，托管服务费须于第二年托管服务开始前7天内缴纳，否则算力合约失效。<br><br>

收益结算<br>
根据矿池的每日实际挖矿收益及用户购买Filecoin服务器合约的存储容量占矿池总存储容量的比例计算用户每日挖矿收益，扣除矿池收取的托管运营费后即为用户实际获得的挖矿收益。<br>

用户每天的挖矿收益=用户持有的算力T数（存储空间容量）÷矿池存储空间总容量×矿池每日产币量×（1-托管运营费30%）<br>

Filecoin服务器合约挖矿收益以Filecoin结算，挖矿产出收益T+1进入用户账户。<br>

所有的规则及收益都是公开透明的，矿池节点的地址也是公开透明且不可篡改的。矿池也将按照Filecoin官方既定规则给予算力持有用户分配收益。<br><br>

合约期限及终止<br>
1、Filecoin服务器合约有效期自Filecoin主网上线后产生收益之日起开始计算。Filecoin服务器有效期为三年，即每台服务器包含365天的算力空间租赁费用，第二年开始需按照每5元/T/月收取机房托管费，须于第二年托管服务开始前7天内缴纳，否则服务器合约失效。<br><br>

2、如发生不可抗力事件，矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。<br><br>

风险提示<br>
1 、Filecoin通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致Filecoin服务器合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。<br>
2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。<br>
3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致Filecoin挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失须自行承担。<br>
<br>

合约发行方对本合约条款保留所有解释。
                            
                    </div>
               </div>
               <div class="maskView" @click="isShowIpfsModel=false"></div>
         </div>

         <!-- end -->


    </div>
    
</template>

<script>


import {Toast} from "mint-ui";
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
      sz_exist_buy:0,
      sz_all_usdt:0,//
      isShowConfimModel:false,
      isShowChargeModel:false,
      isShowLoginModel:false,
      isShowIpfsModel:false,
      isAgree:false,//是否同意
      loginFlag:false,
      isShowBuySuccessModel:false,
      isShowDepNav:false,
    };
  },
  mounted(){
       this.getPowerPriceAPI();
       if(localStorage.getItem('loginFlag')=='logined'){
            this.loginFlag = true;
        }else{
            this.loginFlag = false;
        }
        // window.addEventListener('scroll',this.handleScroll)

        let pageWrap = this.$refs.pageWrap
        var $this = this
        // 监听这个dom的scroll事件
        pageWrap.onscroll  = () => {
            $this.handleScroll()
        }

  },
  destroyed() {
		window.removeEventListener("scroll", this.handleScroll); //销毁滚动事件
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
    handleScroll(){
             let box = this.$refs.pageWrap;
             if(box.scrollTop>=30){
                 this.isShowDepNav = true;
             }else{
                 this.isShowDepNav = false;
             }
    },
    changeAgree(){
        this.isAgree = !this.isAgree;
    },
    back() {
          if (window.history.length <= 1) {
            this.$router.push({ path: "/home" });
            return false;
          } else {
            this.$router.go(-1);
          } 
    },
    pushAction(index){
          if(index==1){
              this.$router.push('/login');
          }else if(index==2){
              this.$router.push('/register');
          }else if(index==3){
              this.$router.push('/recharge');
          }else if(index==4){
              this.$router.push('/agreement');
          }
    },
    addCount() {
          this.amount++;
        //   this.getCurrentRate(this.amount);
    },
    reduceCount() {
          if (this.amount > 1) {
            this.amount--;
          } else {
            Toast("不能小于1");
          }
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
    },
    //购买
    buyPowerAPI(){
          if(!this.isAgree){
                Toast("请先阅读用户云算力租赁协议");
                return;
          }
          if(!this.loginFlag){
              this.isShowLoginModel = true;
              return;
          }
          let that = this;
          request.post(`/power/buy`,{
            amount:this.amount,
          }).then((res=>{
                  console.log('res',res);
                  let data = res.data.Data;
                  if (res.data.Code == 0) {
                      Toast('购买成功');
                      this.isShowBuySuccessModel = true;
                      this.isShowConfimModel = false;
                      this.getPowerPriceAPI();
                  }else if(res.data.Code==2002){
                      this.isShowChargeModel = true;
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
.headerNav{
    background:#2F79F4;
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
        margin-top: 1.5rem;
        // height: 7.32rem;
        padding-bottom: 0.5rem;
        background: #FFFFFF;
        box-shadow: 0px 0.1rem 0.4rem 0px rgba(130, 149, 180, 0.17);
        border-radius:0.15rem;
        .mallTitleBox{
            margin-left: 0.2rem;
            margin-right: 0.2rem;
            height: 1.61rem;
            border-bottom:1px solid #E6E6E6;
            .mallTitleLeft{
               float: left;
               margin-top: 0.3rem;
               height: 0.6rem;
               .titleBox{
                   height: 0.6rem;
                  .title{
                      float: left;
                      max-width: 4.6rem;
                      height: 0.6rem;
                      font-size: 0.28rem;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #0B0C12;
                      line-height: 0.4rem;
                      overflow: hidden;
                      text-align: left;
                  }
                  .icon{
                       float: left;
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
                     font-size:0.3rem;
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
        .equalMoney{
             margin-left: 0.2rem;
             margin-right: 0.2rem;
             margin-top: 0.1rem;
            height: 0.35rem;
            font-size: 0.26rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #656F96;
            line-height: 0.35rem;

        }
        .buyNumBox{
             margin-top: 0.3rem;
             width: 100%;
             height: 0.8rem;
             display: flex;
             align-items: center;
             justify-content: center;
             .buyNumWrap{
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
             .unit{
                 height: 0.73rem;
                 line-height: 0.73rem;
                 margin-left: 0.2rem;
                 font-size: 0.36rem;
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



    .mall2Box{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.3rem;
        padding-bottom: 0.5rem;
        background: #FFFFFF;
        box-shadow: 0px 0.1rem 0.4rem 0px rgba(130, 149, 180, 0.17);
        border-radius:0.15rem;
        .mallTitleBox{
            margin-left: 0.2rem;
            margin-right: 0.2rem;
            height: 1.31rem;
            border-bottom:1px solid #E6E6E6;
            position: relative;
            .mallTip{
                position: absolute;
                right: 0.24rem;
                top: 0rem;
                width: 0.72rem;
                height: 0.76rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .mallTitleLeft{
               float: left;
               margin-top: 0.3rem;
               height: 0.8rem;
               .titleBox{
                   height: 0.4rem;
                  .title{
                      float: left;
                      max-width: 4.6rem;
                      height: 0.8rem;
                      font-size: 0.28rem;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #0B0C12;
                      line-height: 0.4rem;
                      overflow: hidden;
                      text-align: left;
                  }
                  .icon{
                       float: left;
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
                     font-size:0.3rem;
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
        .equalMoney{
             margin-left: 0.2rem;
             margin-right: 0.2rem;
             margin-top: 0.1rem;
            height: 0.35rem;
            font-size: 0.26rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #656F96;
            line-height: 0.35rem;

        }
        .buyNumBox{
             margin-top: 0.3rem;
             width: 100%;
             height: 0.8rem;
             display: flex;
             align-items: center;
             justify-content: center;
             .buyNumWrap{
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
             .unit{
                 height: 0.73rem;
                 line-height: 0.73rem;
                 margin-left: 0.2rem;
                 font-size: 0.36rem;
             }
        }
        .buyBtn{
              margin: 0 auto;
              margin-top: 0.3rem;
              width: 4.03rem;
              height: 0.8rem;
              opacity: 0.7;
              background:linear-gradient(0deg, #2F79F4, #83C3FF);
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



//确认订单的modal
#confimModel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .modelContent{
     z-index:1992;
     position: absolute;
     left:0;
     bottom: 0;
     width:100%;
     height:10rem; 
     border-radius: 0.15rem 0.15rem 0px 0px;
     background: #fff;
     animation: contentViewKeyAnimation 0.5s;
     overflow: hidden;
     .modelContentTitle{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         height: 1.09rem;
         font-size:0.32rem;
         font-family: PingFangSC;
         font-weight: 400;
         color: #343434;
         line-height: 1.09rem;
         text-align: center;
         border-bottom:1px solid #E6E6E6;
         position: relative;
         .closeBtn{
             position: absolute;
             right: 0.2rem;
             top: 0.3rem;
             width: 0.5rem;
             height: 0.5rem;
             display: flex;
             align-items: center;
             justify-content: center;
             .closeInner{
                  width: 0.3rem;
                  height: 0.3rem;
                  display: flex;
                  align-items: center;
                  img{
                    width: 100%;
                    height: 100%;
                  }
             }
             
         }
     }
     .txtItemTwoLine{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.3rem;
         height:0.74rem;
         line-height: 0.5rem;
         overflow: hidden;
         .textItemLeft{
            float: left;
            font-size: 0.3rem;
            color: #667096;
         }
         .textItemVal{
            float: right;
            height:0.74rem;
            line-height: 0.4rem;
            font-size: 0.3rem;
            color: #2D3A5C;
            text-align: left;
         }
     }
     .txtItem{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.3rem;
         height:0.5rem;
         line-height: 0.5rem;
         overflow: hidden;
         .textItemLeft{
            float: left;
            font-size: 0.3rem;
            color: #667096;
         }
         .textItemVal{
            float: right;
            font-size: 0.3rem;
            color: #2D3A5C;
         }
     }
     .buyNumItem{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.2rem;
         height:0.8rem;
         line-height: 0.8rem;
         overflow: hidden;
         .buyNumItemLeft{
            float: left;
            font-size: 0.3rem;
            color: #667096;
         }
         .buyNumWrap{
                float: right;
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
     .line{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.3rem;
         height: 1px;
         background: #E6E6E6;
     }
     .xieyibox{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.3rem;
         height:0.5rem;
         overflow: hidden;
         .checkBox{
             margin-top: 0.1rem;
             float: left;
             width: 0.3rem;
             height: 0.3rem;
             display: flex;
             align-items: center;
             overflow: hidden;
             img{
                width: 100%;
                height: 100%;
             }
         }
         .xieyiTitle{
            float: left;
            margin-left: 0.37rem;
            margin-top: 0.1rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.26rem;
         }
     }
     .buyBtn{
        margin-left: 0.8rem;
        margin-right: 0.8rem;
        margin-top: 0.38rem;
        height: 0.88rem;
        height:0.88rem;
        background: linear-gradient(0deg, #307AF4, #84C4FF);
        border-radius: 0.44rem;
        .btnTxt{
            width: 100%;
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;
            color: white;
            font-size: 0.34rem;
        }
    }
  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.3;
  }
}



//去充值的modal
#chargeModel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .modelContent{
     z-index:1992;
     position: absolute;
     left:50%;
     top: 50%;;
     width:5.4rem;
     height:2.8rem; 
     margin-left: -2.7rem;
     margin-top: -1.4rem;
     border-radius: 0.15rem ;
     background: #fff;
     animation: contentViewKeyAnimation 0.5s;
     overflow: hidden;
     .title{
        width: 100%;
        height: 1.92rem;
        line-height: 1.92rem;
        text-align: center;
        border-bottom: 1px  solid #F7F8FC;
     }
     .btnBox{
        width: 100%;
        height: 0.88rem;
        display: flex;
        align-items: center;
        .btnItem{
            flex: 1;
            height: 100%;
            color:#70747C;
            font-size: 0.34rem;
            line-height: 0.88rem;
            text-align: center;
            font-weight: bold;
        }
     }
     
  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.3;
  }
}


//去充值的modal
#buySuccessModel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .buySuccessBg{
     z-index:1992;
     margin: 0 auto;
     margin-top: 50%;
     width:5.88rem;
     height:4.59rem; 
     overflow: hidden;
     position: relative;
     .closeBtn{
        position: absolute;
        right: 0.26rem;
        top: 0.23rem;
        width: 0.6rem;
        height: 0.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
        width: 0.3rem;
        height: 0.3rem;
        }
    }
     img{
         width: 100%;
         height: 100%;
     }
     .buySuccessTip{
         position: absolute;
         left: 0;
         bottom: 0.8rem;
         width: 100%;
         height: 0.5rem;
         line-height:0.5rem;
         text-align: center;
         color: rgba(93, 104, 119, 1);
         font-size: 0.3rem;
     }
     
  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.5;
  }
}

//IPFS·Filecoin服务器的modal
#ipfsModel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .modelContent{
     z-index:1992;
     position: absolute;
     left:50%;
     top: 50%;
     width:5.8rem;
     height:9.6rem; 
     margin-left: -2.9rem;
     margin-top: -4.8rem;
     border-radius: 0.15rem;
     background: #fff;
     animation: contentViewKeyAnimation 0.5s;
     overflow: hidden;
     .modelContentTitle{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         height: 1.09rem;
         font-size:0.32rem;
         font-family: PingFangSC;
         font-weight: 400;
         color: #343434;
         line-height: 1.09rem;
         text-align: center;
         border-bottom:1px solid #E6E6E6;
         position: relative;
         .closeBtn{
             position: absolute;
             right: 0.1rem;
             top: 0.3rem;
             width: 0.5rem;
             height: 0.5rem;
             display: flex;
             align-items: center;
             justify-content: center;
             .closeInner{
                  width: 0.3rem;
                  height: 0.3rem;
                  display: flex;
                  align-items: center;
                  img{
                    width: 100%;
                    height: 100%;
                  }
             }
             
         }
     }

     .textBox{
         margin-top: 0.27rem;
         margin-left: 0.2rem;
         margin-right: 0.2rem;
         height: 7.8rem;
         overflow: auto;
         text-align: left;
         color: #2D3A5C;
         font-size:0.26rem;
         line-height: 0.32rem;
     }
     
  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.3;
  }
}
</style>
