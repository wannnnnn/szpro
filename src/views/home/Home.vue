<template>
      <div class="page">
            <div class="homeNav">
                    <div class="navTxt" >合盈矿池</div>
                     <!-- <div class="lanaguageItem" @click="isShowLaunagleModel=true">
                          <div class="logo"><img src="../../assets/img/language.png" alt=""></div>
                          <div class="logoTxt">语言</div>
                     </div> -->
            </div>
            <div class="wrap">

                 <!-- 内容部分 -->
                 <div class="wrapTxt">

                        <!-- 轮播图片 -->
                        <div class="suffuterView">
                               <mt-swipe :auto="4000" class="swipe">
                                    <mt-swipe-item v-for="n in 1" :key="n">
                                       <img src="../../assets/img/home/home_banner_01.png" alt="">
                                    </mt-swipe-item>
                                </mt-swipe>
                        </div>
                        <!-- 公告页面 -->
                        <div class="gonggaoView" @click="pushNewsList()">
                             <div class="ggIcon">
                                  <img src="../../assets/img/home/home_gonggao.png" alt="">
                             </div>
                             <div class="ggInfoView">关于河图超算服务器——第1批上线公告</div>
                             <div class="ggHud">
                                 <img src="../../assets/img/my/hud_right.png" alt="">
                             </div>
                        </div>
                        <!-- 选项box -->
                        <div class="itemBox">
                              <div class="item">
                                   <div class="itemLogo"><img src="../../assets/img/home/power.png" alt=""></div>
                                   <div  class="itemCount">
                                        {{total_power}}<span style="font-size:0.13rem;">TB</span>
                                   </div>
                                   <div class="itemDes">全网算力</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/award.png" alt=""></div>
                                   <div  class="itemCount">
                                       {{reward_per_block}}<span style="font-size:0.13rem;">FIL/TB</span>
                                   </div>
                                   <div class="itemDes">平均挖矿收益</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/count.png" alt=""></div>
                                   <div  class="itemCount">
                                         ${{fil_price.toFixed(2)}}
                                   </div>
                                   <div class="itemDes">最新价格</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/24H.png" alt=""></div>
                                   <div  class="itemCount">
                                        {{reward_per24h}}<span style="font-size:0.13rem;">FIL</span>
                                   </div>
                                   <div class="itemDes">24H区块奖励</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/pledge.png" alt=""></div>
                                  <div  class="itemCount">
                                        <!-- {{pledge_now}}<span style="font-size:0.13rem;">FIL</span> -->
                                        <!-- 31858 -->
                                        {{pledge_now}}
                                   </div>
                                   <div class="itemDes">总账户数</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/Fil.png" alt=""></div>
                                  <div  class="itemCount">
                                       {{total_pledge}}<span style="font-size:0.13rem;">FIL</span>
                                   </div>
                                   <div class="itemDes">Fil质押量</div>
                              </div>
                        </div>
                         <!-- 矿池数据 -->
                        <div class="poolCountBox">
                                <div  class="title">
                                    <div  class="titleImg"><img src="../../assets/img/home/icon.png" alt=""></div> 
                                    <span style="margin-left:0.1rem;">矿池数据</span>
                                </div>
                                <div class="poolCountItemBox">
                                       <div class="poolCountItem">
                                           <div class="text">矿池有效算力</div>
                                           <div class="count">{{pool_power}}<span>TB</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                            <div class="text">24H平均收益</div>
                                            <div class="count">{{pool_reward_per24h}}<span>FIL/TB</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                             <div class="text">Fil质押量</div>
                                             <div class="count">{{pool_pledge}}<span>FiL</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                              <div class="text">24H产出量</div>
                                              <div class="count">{{pool_num_per24h}}<span>FiL</span></div>
                                       </div>
                                    
                                </div>
                        </div>
                        <div class="line" style="width:100%;height:1rem;"></div>
                 </div>
                
            </div>
            <AppTabBar :tabIndex='0' @tabAction="tabAction"></AppTabBar>


                <!-- 语言 -->
            <div id="launagleModel" v-show="isShowLaunagleModel">
                <div class="modelContent">
                        <div class="langItem">
                             切换语言
                             <div class="cancelItem" @click="isShowLaunagleModel=false">取消</div>
                             <div class="confimItem" @click="isShowLaunagleModel=false">确定</div>
                        </div>
                        <div class="langagueTxtItem" :class="{langagueTxtItemAct:obj==langTxt}" v-for="(obj,index) in langList" :key="index">{{obj}}</div>

                </div>
                <div class="maskView" @click="isShowLaunagleModel=false"></div>
            </div>

            <canvas id="myCnavas"></canvas>
      </div>

      
</template>


<script>
import Vue from "vue";
import AppTabBar from '../../component/TabBar/TabBar';
import request from "../../api/request";
import { Toast, Swipe, SwipeItem } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
    name: "home",
    components: {
        AppTabBar
    },
    data(){
        return{
            swiperOption: {
                // direction: "horizontal",
                // 分页器配置
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                // centeredSlides: true,
                initialSlide: 1,
                loopedSlides:3,
                loop: true
            },
            total_power:0,//全网算力
            reward_per_block:0,//每区奖励
            reward_per24h:0,//  //24小时区块奖励
            num_per24h:0,////24小时区块产出量
            pledge_now:0,// //当前质押量
            total_pledge:0,////FIL质押量
            pool_power:0, //矿池有效算力
            pool_reward_per24h:0, //24H平均收益
            pool_pledge:0, //FIL质押量
            pool_num_per24h:0,//24H产出量
            fil_price:0,
            isShowLaunagleModel:false,
            langList:['简体中文','English'],
            langTxt:'简体中文',
        }
    },
    mounted(){
        this.getHpDataAPI();
        
    },
    methods:{
        tabAction(index){
             if(index==0){

             }else if(index==1){
                this.$router.push('/mall');
             }else if(index==2){
                this.$router.push('/awardPool');
             }else{
                this.$router.push('/my');

             }
        },
        pushNewsList(){
           this.$router.push('/newsList');
        //    this.$router.push('/invateFriends');
        },
         getHpDataAPI(){
                let that = this;
                request.get(`/net_data/net_info`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            this.total_power = this.getValDelRem(data.total_power);
                            this.reward_per_block = this.getValDelRem(data.reward_per_block);
                            this.reward_per24h = this.getValDelRem(data.reward_per24h);
                            this.num_per24h = this.getValDelRem(data.num_per24h);
                            this.pledge_now = this.getValDelRem(data.pledge_now);
                            this.pool_power = this.getValDelRem(data.pool_power);
                            this.pool_reward_per24h = this.getValDelRem(data.pool_reward_per24h);
                            this.pool_pledge = this.getValDelRem(data.pool_pledge);
                            this.pool_num_per24h = this.getValDelRem(data.pool_num_per24h);
                            this.fil_price = data.fil_price;
                            
                        }else{
                          
                        }
                }));
        },
        getValDelRem(val){
           
            var list = val.split(" "); 
           
            if(list.length>0){
                return list[0];
            }else{
                return 0;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    background: #fff;
}
.homeNav{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.15rem;
    overflow: hidden;
    z-index: 900;
    background: #284698;
    background: #fff;
    .navTxt{
        position: absolute;
        left: 50%;
        top: 0;
        width: 3rem;
        margin-left: -1.5rem;
        height: 1.15rem;
        line-height: 1.15rem;
        text-align: center;
        color: #fff;
        color:#343434;
        font-weight: 500;
        font-size: 0.36rem;
    }
    .lanaguageItem{
        position: absolute;
        right: 0.2rem;
        top: 0;
        width: 0.8rem;
        height: 100%;
        .logo{
            margin: 0 auto;
            margin-top: 0.2rem;
            width: 0.3rem;
            height: 0.3rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .logoTxt{
            margin: 0 auto;
            margin-top: 0.2rem;
            width: 100%;
            line-height: 0.3rem;
            font-size: 0.26rem;
            color: #fff;
        }
    }
}
.wrap{
    position: absolute;
    left: 0;
    top: 1.15rem;
    bottom: 1.04rem;
    width: 100%;
    background: #fff;
    overflow: auto;
    padding-bottom: 0.5rem;
    .wrapBg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .warpBgImg{
            width: 100%;
            height: 6.15rem;
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
    }
    .wrapTxt .banner{
        width: 100%;
        overflow: hidden;
        .bannerheader{
            margin-left: 0.3rem;
            margin-top: 1.3rem;
            margin-right: 0.3rem;
            color: white;
            .title{
                font-size: 0.45rem;
                text-align: left;
            }
            .subtitle{
                margin-top: 0.3rem;
                font-size: 0.24rem;
                line-height: 0.5rem;
                text-align: left;
            }
        }
    }
    .wrapTxt .suffuterView{
        width: 100%;
        height: 3rem;
        overflow: hidden;
        position: relative;
        .bannerItem{
            margin-top:-1px;
            width: 100%;
            height: 3rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .pointView{
             position: absolute;
             left: 50%;
             bottom: 0.2rem;
             width: 3rem;
             margin-left: -1.5rem;
             height: 0.5rem;
            //  background: red;
            // border: 1px solid #000;
             z-index: 20;
             display: flex;
             align-items: center;
             justify-content: center;
             .pointItem{
                 margin-left: 0.2rem;
                 width: 0.3rem;
                 height: 0.3rem;
                 background: #608AFF;
                 border-radius:50%;
                 overflow: hidden;
             }
        }
    }
    .wrapTxt .gonggaoView{
        width: 100%;
        height: 0.8rem;
        position: relative;
        .ggIcon{
            position: absolute;
            left: 0.1rem;
            top: 0;
            width: 0.5rem;
            height: 0.8rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 0.3rem;
                height: 0.3rem;
            }
        }
        .ggInfoView{
            position: absolute;
            left: 0.7rem;
            right: 0.3rem;
            height: 100%;
            line-height: 0.8rem;
            font-size:0.24rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #010101;
            text-align: left;
        }
        .ggHud{
            position: absolute;
            right: 0.3rem;
            top: 0;
            width:0.3rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 0.14rem;
                height: 0.24rem;
            }
        }
    }
    .wrapTxt .itemBox{
        // margin-top: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.3rem;
        justify-content: space-between;
        .item{
            margin-top: 0.3rem;
            width: 2.09rem;
            height: 2.18rem;
            background: #FFFFFF;
            box-shadow: 0px 0px 0.12rem 0.04rem rgba(120, 120, 120, 0.1);
            border-radius: 0.3rem;
            position: relative;
            .itemLogo{
               margin-left: 0.1rem;
               margin-top: 0.1rem;
               width: 0.7rem;
               height: 0.7rem;
               img{
                   width: 100%;
                   height: 100%;
               }
            }
            .itemCount{
                width: 100%;
                padding-left: 0.27rem;
                margin-top: 0.36rem;
                font-size: 0.36rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #2D3A5C;
                line-height: 0.4rem;
                text-align: left;
            }
            .itemDes{
                margin-top: 0.1rem;
                width: 100%;
                padding-left: 0.27rem;
                font-size: 0.24rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #818894;
                line-height: 0.3rem;
                text-align: left;
            }
        }

    }
    .wrapTxt .poolCountBox{
        margin-top: 0.3rem;
        width: 100%;
        overflow: hidden;
        .title{
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.32rem;
            font-weight: bold;
            color: #343434;
            display: flex;
            align-items: center;
            overflow: hidden;
            .titleImg{
               margin-top: -0.02rem;
               width: 0.5rem;
               height: 0.23rem;
               display: flex;
               align-items: center;
               justify-content: center;
               img{
                   width: 100%;
                   height: 100%;
               }
            }
        }
        .poolCountItemBox{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .poolCountItem {
                margin-top: 0.1rem;
                width: 50%;
                height: 2rem;
                color: #828894;
                font-size: 0.693rem;
                .text{
                    width: 100%;
                    margin-top: 0.3rem;
                    margin-left: 0.4rem;
                    text-align: left;
                    height: 0.3rem;
                    font-size: 0.26rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #828894;
                    line-height: 0.3rem;

                }
                .count {
                    margin-top: 0.52rem;
                    margin-right: 0.49rem;
                    color: #2d3a5c;
                    font-size: 0.34rem;
                    font-weight: 700;
                    text-align: right;
                    span {
                        font-weight: 400;
                        font-size: 0.24rem;
                    }
                }
            }
             .poolCountItem:nth-child(1) {
                background: url(../../assets/img/home/bot_item1.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(2) {
                background: url(../../assets/img/home/bot_item2.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(3) {
                background: url(../../assets/img/home/bot_item3.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(4) {
                background: url(../../assets/img/home/bot_item4.png); 
                background-size: 100% 100%;
             }
            
        }
    }
}


//语言的modal
#launagleModel{
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
     bottom:0;
     width:100%;
     height:2.5rem; 
     background: #fff;
     animation: contentViewKeyAnimation 0.5s;
     overflow: hidden;
     .langItem{
        width: 100%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        position: relative;
        font-size: 0.28rem;
        .cancelItem{
            position: absolute;
            left: 0;
            top: 0;
            width: 1.2rem;
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            text-align: center;
            font-size: 0.26rem;
        }
        .confimItem{
            position: absolute;
            right: 0;
            top: 0;
            width: 1.2rem;
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            text-align: center;
            font-size: 0.26rem;
        }
     }
     .langagueTxtItem{
         width: 100%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        position: relative;
        font-size: 0.28rem;
        border-top: 1px solid rgba(230, 230, 230, 0.3);
     }
     .langagueTxtItemAct{
         color: rgba(96, 138, 255, 1);
     }
     
     
  }
  @keyframes  contentViewKeyAnimation{
      0%{
        //  transform: scale(0);
         transform: translate(0);
      }
      150%{
        //  transform: scale(1)z
         transform: translate(1rem);
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