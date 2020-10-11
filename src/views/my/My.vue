<template>
      <div class="page">
            <div class="header">
                     我的
             </div>
            <div class="wrap">
               
                 <div class="wrapTop">
                       <!-- 用户信息 -->
                       <div class="userInfoBox">
                             <div class="userPortDiv"><img src="../../assets/img/my/head1.png" alt=""></div>
                             <div class="unLoginWrap" v-show="!loginFlag" @click="pushLogin()">请登录</div>
                             <!-- 登录后的 -->
                             <div class="loginedWrap" v-show="loginFlag">
                                 <div class="userInfoLevel">
                                      <div class="phoneNum">{{getPhoneDes()}}</div>
                                      <div class="level0Icon" v-show="level==0"><img src="../../assets/img/awardPool/level0.png" alt=""></div>
                                      <div class="levelIcon" v-show="level==1"><img src="../../assets/img/awardPool/V1@2x.png" alt=""></div>
                                      <div class="levelIcon" v-show="level==2"><img src="../../assets/img/awardPool/v2@2x.png" alt=""></div>
                                      <div class="levelIcon" v-show="level==3"><img src="../../assets/img/awardPool/v3@2x.png" alt=""></div>
                                 </div>
                                 <div class="userInfoPromote">
                                      <div class="zigou">自购 <span>{{self_buy}}/{{self_buy_target}}</span></div>
                                      <div class="promoteBox">
                                          <img src="../../assets/img/my/yidaobiao.png" v-show="self_buy_target_flag">
                                          <img src="../../assets/img/my/weidabiao.png" v-show="!self_buy_target_flag">
                                      </div>
                                      <div class="tuiguang">推广 <span>{{extend_buy}}/{{extend_buy_target}}</span></div>
                                      <div class="promoteBox">
                                          <img src="../../assets/img/my/yidaobiao.png" v-show="extend_target_flag">
                                          <img src="../../assets/img/my/weidabiao.png" v-show="!extend_target_flag">
                                      </div>
                                 </div>
                             </div>
                       </div>
                       <!-- 底部的数量 -->
                       <div class="userCoinNumBox">
                             <div class="userCoinNumItem">
                                   <div class="title">Fil算力</div>
                                   <div class="val">{{power.toFixed(2)}} TB</div>
                             </div>
                             <div class="userCoinNumItem">
                                    <div class="title">奖励收益</div>
                                    <div class="val">{{fil.toFixed(2)}} Fil</div>
                             </div>
                       </div>

                        <!-- end -->
                 </div>

                 <div class="listBox">
                       <div class="itemCell" @click="pushItemAction(1)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_01.png" alt=""></div>
                            <div class="cellTxt">资产管理</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(2)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_02.png" alt=""></div>
                            <div class="cellTxt">订单管理</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(3)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_03.png" alt=""></div>
                            <div class="cellTxt">收益明细</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(4)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_04.png" alt=""></div>
                            <div class="cellTxt">邀请好友</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(5)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_05.png" alt=""></div>
                            <div class="cellTxt">实名认证</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                        <div class="itemCell" @click="pushItemAction(7)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_07.png" alt=""></div>
                            <div class="cellTxt">在线客服</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(6)">
                            <div class="cellIcon"><img src="../../assets/img/my/myicon_06.png" alt=""></div>
                            <div class="cellTxt">退出登录</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                 </div>
            </div>
            <AppTabBar :tabIndex='3' @tabAction="tabAction"></AppTabBar>


             <!-- 推出登录 -->
            <div id="loginOutModel" v-show="isShowLoginOutModel">
                <div class="modelContent">
                        <div class="title">是否真的退出登录?</div>
                        <div class="btnBox">
                            <div class="btnItem" style="border-right: 1px  solid #F7F8FC;" @click="isShowLoginOutModel=false">取消</div>
                            <div class="btnItem" style="color: #007AFF;" @click="loginOut()">退出</div>
                        </div>
                </div>
                <div class="maskView" @click="isShowLoginOutModel=false"></div>
            </div>

             <!-- 显示vip的 -->
            <div id="vipShowModel" v-show="isShowVipShowModel">
                <div class="vipBigImg">
                      <img src="../../assets/img/my/vip_big_01.png" v-show="level==1">
                      <img src="../../assets/img/my/vip_big_02.png" v-show="level==2">
                      <img src="../../assets/img/my/vip_big_03.png" v-show="level==3">
                </div>
                <div class="levelTxt">成功升级为V.{{level}}</div>
                 <div class="confimBtn">
                    <div class="btnTxt">确定</div>
                </div>
                <div class="maskView" ></div>
            </div>


      </div>

      

      
</template>


<script>
import AppTabBar from '../../component/TabBar/TabBar';
import request from "../../api/request";
export default {
    name: "home",
    components: {
        AppTabBar
    },
    data(){
        return{
            loginFlag:false,//登录状态
            phone:'',
            extend_buy:0,//推广
            extend_buy_target:0,
            extend_target_flag:false,
            self_buy:0,//自购
            self_buy_target:0,//
            self_buy_target_flag:false,
            level:0,
            power:0,//算力
            fil:0,//收益
            isShowLoginOutModel:false,
            isShowVipShowModel:false,
            is_up:1,
        }
    },
    mounted(){
        if(localStorage.getItem('loginFlag')=='logined'){
            this.loginFlag = true;
            this.getUserInfoAPI();
            this.getMyAssetsAPI();
        }else{
            this.loginFlag = false;
        }
    },
    methods:{
        tabAction(index){
             if(index==0){
                this.$router.push('/home');
             }else if(index==1){
                this.$router.push('/mall');
             }else if(index==2){
                this.$router.push('/awardPool');
             }else{

             }
        },
        pushLogin(){
            this.$router.push('/login');
        },
        loginOut(){
            this.isShowLoginOutModel = false;
            this.loginFlag = false;
            localStorage.removeItem('loginFlag');
            this.extend_buy = 0;
            this.extend_buy_target = 0;
            this.self_buy = 0;
            this.self_buy_target = 0;
            this.level = 0;
            this.power = 0;
            this.fil = 0;

        },
        pushItemAction(index){
            if(this.loginFlag){
                //资产管理
                 if(index==1){
                    this.$router.push('/myAssets');
                 }
                 //订单管理
                 else if(index==2){
                    this.$router.push('/myOrders');
                 }
                 //算力管理
                 else if(index==3){
                    this.$router.push('/incomeDetail');
                 }
                 //邀请好友
                 else if(index==4){
                    this.$router.push('/invateFriends');
                 }
                 //实名认证
                 else if(index==5){
                    this.$router.push('/idIdentity');
                 }
                 //退出登录
                 else if(index==6){
                      this.isShowLoginOutModel = true;
                 }
                 //在线客服
                 else if(index==7){
                    this.$router.push('/kefu');
                 }

            }else{
                this.$router.push('/login');
            }
        },
        getPhoneDes(){
           if(this.phone.length!=11){
               return '--'
           }else{
               var showPhone =  this.phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
               return showPhone;
           }
        },
        getUserInfoAPI(){
                let that = this;
                request.get(`/user/info`).then((res=>{
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            this.phone = data.phone;
                            this.extend_buy = data.extend_buy;
                            this.extend_buy_target = data.extend_buy_target;
                            this.self_buy = data.self_buy;
                            this.self_buy_target = data.self_buy_target;
                            this.level = data.level;
                            this.is_up = data.is_up;
                            
                            if(this.extend_buy>0){
                                if(this.extend_buy>this.extend_buy_target){
                                     this.extend_target_flag = true;
                                }
                            }

                             if(this.self_buy>0){
                                if(this.self_buy>this.self_buy_target){
                                     this.self_buy_target_flag = true;
                                }
                            }

                            if(this.is_up==2){
                                this.isShowVipShowModel = true;
                            }
                            localStorage.setItem('myPhone',this.phone);
                        }else{
                          
                        }
                }));
        },
        getMyAssetsAPI(){
                let that = this;
                request.get(`/user/assets`).then((res=>{
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                             this.power = data.assets.power;
                             this.fil = data.assets.fil;
                        }else{
                          
                        }
                }));
        }
    }
}
</script>

<style lang="less" scoped>
.page{
    background: #fff;
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
    color: #000000;
}
.wrap{
    position: absolute;
    left: 0;
    top: 1.28rem;
    bottom: 1.04rem;
    width: 100%;
    background: #fff;
    overflow: auto;
    padding-bottom: 0.5rem;
    .wrapTop{
        width: 100%;
        height:3.5rem;
        background: url(../../assets/img/my/mybg.png) no-repeat;
        background-size: 100% 100%;
        background-position-y: 0.2rem;
        overflow: hidden;
        .userInfoBox{
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            height: 1.25rem;
            position: relative;
            .userPortDiv{
                position: absolute;
                left: 0;
                top: 0.13rem;
                width: 1rem;
                height: 1rem;
            }
            .unLoginWrap{
                position: absolute;
                left: 1.28rem;
                right: 0.3rem;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
            }
            .loginedWrap{
                position: absolute;
                left: 1.28rem;
                right: 0;
                top: 0;
                bottom: 0;
                .userInfoLevel{
                    margin-top: 0.1rem;
                    width: 100%;
                    height: 0.5rem;
                    display: flex;
                    align-items: center;
                    .phoneNum{
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-size: 0.34rem;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        color: #121319;
                    }
                    .levelIcon{
                        margin-left: 0.2rem;
                        width: 0.6rem;
                        height: 0.6rem;
                        img{
                            max-width: 100%;
                            max-height: 100%;
                        } 
                    }
                    .level0Icon{
                        margin-left: 0.2rem;
                         width: 0.98rem;
                         height: 0.27rem;
                         display: flex;
                         align-items: center;
                         justify-content: center;
                        img{
                            max-width: 100%;
                            max-height: 100%;
                        } 
                    }
                }
                .userInfoPromote{
                    margin-top: 0.1rem;
                    width: 100%;
                    height: 0.4rem;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    .zigou{
                       font-size: 0.26rem;
                       color: #343434;
                    }
                    .tuiguang{
                        margin-left: 0.5rem;
                        font-size: 0.26rem;
                       color: #343434;
                    }
                    .promoteBox{
                        margin-left: 0.2rem;
                        width: 0.89rem;
                        height: 0.31rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .userCoinNumBox{
            margin-top: 0.2rem;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            height: 1.93rem;
            background: url(../../assets/img/my/list5.png);
            background-size: 100% 100%;
            display: flex;
            .userCoinNumItem{
                flex: 1;
                height: 100%;
                .title{
                    margin-top: 0.5rem;
                    width: 100%;
                    height: 0.3rem;
                    font-size: 0.3rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #FFFFFF;
                }
                .val{
                    margin-top: 0.18rem;
                    width: 100%;
                    height: 0.6rem;
                    font-size:0.5rem;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 0.6rem;
                }
            }
        }
    }
    .listBox{
        margin-top:0.1rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        overflow: hidden;
        .itemCell{
            width: 100%;
            height: 0.96rem;
            border-bottom:1px solid rgba(230, 230, 230, 0.3);
            overflow: hidden;
            .cellIcon{
                float: left;
                margin-top: 0.33rem;
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
            .cellTxt{
                float: left;
                margin-top: 0.18rem;
                margin-left: 0.24rem;
                height: 0.6rem;
                font-size: 0.28rem;
                font-weight: 400;
                color: #333333;
                line-height:0.6rem;
            }
            .cellHud{
                float: right;
                margin-top: 0.26rem;
                width: 0.14rem;
                height: 0.24rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}


//推出登录的modal
#loginOutModel{
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

//显示vip的modal
#vipShowModel{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .vipBigImg{
     z-index:1992;
     margin: 0 auto;
     margin-top: 2.7rem;
     width:4.9rem;
     height:5.1rem; 
     overflow: hidden; 
     img{
         width: 100%;
         height: 100%;
     }
  }
  .levelTxt{
         margin: 0 auto;
         margin-top: 0.21rem;
         height:0.3rem;
         font-size: 0.28rem;
         font-family: Source Han Sans CN;
         font-weight: 400;
         color: #FFFFFF;
         text-align: center;
  }
  .confimBtn{
      margin-left: 0.8rem;
      margin-right: 0.8rem;
      margin-top: 0.37rem;
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
</style>