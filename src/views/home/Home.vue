<template>
      <div class="page">
            <div class="wrap">
                 <!-- 背景部分 -->
                 <div class="wrapBg">
                     <div class="warpBgImg">
                         <img src="../../assets/img/home/banner@2x.png" alt="">
                     </div>
                 </div>
                 <!-- 内容部分 -->
                 <div class="wrapTxt">
                        <div class="banner">
                            <div class="bannerheader">
                                <div class="title">国际领先核心技术</div>
                                <div class="subtitle"> 专注ipfs&amp;filecoin技术应用、软件开发、策略集群挖矿软件开发、存储器研发销售、idc搭建运维等全生态建设服务商。 </div>
                            </div>
                        </div>
                        <!-- 选项box -->
                        <div class="itemBox">
                              <div class="item">
                                   <div class="itemLogo"><img src="../../assets/img/home/power.png" alt=""></div>
                                   <div  class="itemCount">
                                        {{data_all_calculate}}<span style="font-size:0.13rem;">PB</span>
                                   </div>
                                   <div class="itemDes">全网算力</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/award.png" alt=""></div>
                                   <div  class="itemCount">
                                       {{data_all_calculate}}<span style="font-size:0.13rem;">FIL</span>
                                   </div>
                                   <div class="itemDes">每区奖励</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/count.png" alt=""></div>
                                   <div  class="itemCount">
                                        {{data_all_calculate}}<span style="font-size:0.13rem;">FIL</span>
                                   </div>
                                   <div class="itemDes">24H区块产出量</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/24H.png" alt=""></div>
                                   <div  class="itemCount">
                                        {{data_all_calculate}}
                                   </div>
                                   <div class="itemDes">24H区块奖励</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/pledge.png" alt=""></div>
                                  <div  class="itemCount">
                                        {{data_all_calculate}}<span style="font-size:0.13rem;">FIL</span>
                                   </div>
                                   <div class="itemDes">当前质押量</div>
                              </div>
                              <div class="item">
                                  <div class="itemLogo"><img src="../../assets/img/home/Fil.png" alt=""></div>
                                  <div  class="itemCount">
                                       {{data_all_calculate}}<span style="font-size:0.13rem;">FIL</span>
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
                                           <div class="count">{{data_all_calculate}}<span>FiL</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                            <div class="text">24H平均收益</div>
                                            <div class="count">{{data_all_calculate}}<span>FiL</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                             <div class="text">Fil质押量</div>
                                             <div class="count">{{data_all_calculate}}<span>FiL</span></div>
                                       </div>
                                       <div class="poolCountItem">
                                              <div class="text">24H产出量</div>
                                              <div class="count">{{data_all_calculate}}<span>FiL</span></div>
                                       </div>
                                    
                                </div>
                        </div>
                        <div class="line" style="width:100%;height:1rem;"></div>
                 </div>
                
            </div>
            <AppTabBar :tabIndex='0' @tabAction="tabAction"></AppTabBar>
      </div>

      
</template>


<script>
import AppTabBar from '../../component/TabBar/TabBar';
export default {
    name: "home",
    components: {
        AppTabBar
    },
    data(){
        return{
            data_all_calculate:'--',//全网算力
            data_every_reward:'--',//每区奖励
            data_24h_output_block:'--',//24H区块产出量
            data_24h_block_reward:'--',//24H区块奖励
            data_current_pledge_count:'--',//当前质押量
            data_fil_pledge_count:'--',//Fil质押量
            data_effective_calculate:'--',//矿池有效算力
            data_24h_average_return:'--',//24H平均收益
        }
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
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    background: red;
}

.wrap{
    position: absolute;
    left: 0;
    top: 0;
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
    .wrapTxt .itemBox{
        margin-top: 0.2rem;
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
                background: url(../../assets/img/home/1.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(2) {
                background: url(../../assets/img/home/2.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(3) {
                background: url(../../assets/img/home/3.png); 
                background-size: 100% 100%;
             }
             .poolCountItem:nth-child(4) {
                background: url(../../assets/img/home/4.png); 
                background-size: 100% 100%;
             }
            
        }
    }
}
</style>