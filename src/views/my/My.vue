<template>
      <div class="page">
            <div class="header">
                     我的
             </div>
            <div class="wrap">
               
                 <div class="wrapTop">
                       <!-- 用户信息 -->
                       <div class="userInfoBox">
                             <div class="userPortDiv"><img src="../../assets/img/my/head1@2x.png" alt=""></div>
                             <div class="unLoginWrap" v-show="!loginFlag" @click="pushLogin()">请登录</div>
                             <!-- 登录后的 -->
                             <div class="loginedWrap" v-show="loginFlag">
                                 <div class="userInfoLevel">
                                      <div class="phoneNum">{{getPhoneDes()}}</div>
                                      <!-- <div class="levelIcon"><img src="../../assets/img/awardPool/v2@2x.png" alt=""></div> -->
                                 </div>
                                 <div class="userInfoPromote">
                                      <div class="zigou">自购 <span>{{self_buy}}</span></div>
                                      <!-- <div class="promoteBox">未达标</div> -->
                                      <div class="tuiguang">推广 <span>{{extend_buy}}</span></div>
                                      <!-- <div class="promoteBox">未达标</div> -->
                                 </div>
                             </div>
                       </div>
                       <!-- 底部的数量 -->
                       <div class="userCoinNumBox">
                             <div class="userCoinNumItem">
                                   <div class="title">Fil算力</div>
                                   <div class="val">{{fil.toFixed(2)}} TB</div>
                             </div>
                             <div class="userCoinNumItem">
                                    <div class="title">奖励收益</div>
                                    <div class="val">{{power.toFixed(2)}} Fil</div>
                             </div>
                       </div>

                        <!-- end -->
                 </div>

                 <div class="listBox">
                       <div class="itemCell" @click="pushItemAction(1)">
                            <div class="cellIcon"><img src="../../assets/img/my/list7@2x.png" alt=""></div>
                            <div class="cellTxt">资产管理</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(2)">
                            <div class="cellIcon"><img src="../../assets/img/my/list1@2x.png" alt=""></div>
                            <div class="cellTxt">订单管理</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(3)">
                            <div class="cellIcon"><img src="../../assets/img/my/list3@2x.png" alt=""></div>
                            <div class="cellTxt">奖励收益</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(4)">
                            <div class="cellIcon"><img src="../../assets/img/my/list6@2x.png" alt=""></div>
                            <div class="cellTxt">邀请好友</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(5)">
                            <div class="cellIcon"><img src="../../assets/img/my/list2@2x.png" alt=""></div>
                            <div class="cellTxt">实名认证</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                       <div class="itemCell" @click="pushItemAction(6)">
                            <div class="cellIcon"><img src="../../assets/img/my/list4@2x.png" alt=""></div>
                            <div class="cellTxt">退出登录</div>
                            <div class="cellHud"><img src="../../assets/img/my/hud_right.png" alt=""></div>
                       </div>
                 </div>
            </div>
            <AppTabBar :tabIndex='3' @tabAction="tabAction"></AppTabBar>
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
            self_buy:0,//自购
            level:0,
            power:0,//算力
            fil:0,//收益
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

                 }
                 //实名认证
                 else if(index==5){

                 }
                 //退出登录
                 else if(index==6){

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
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            this.phone = data.phone;
                            this.extend_buy = data.extend_buy;
                            this.self_buy = data.self_buy;
                            this.level = data.level;
                        }else{
                          
                        }
                }));
        },
        getMyAssetsAPI(){
                let that = this;
                request.get(`/user/assets`).then((res=>{
                        console.log('res',res);
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
        background: url(../../assets/img/my/mybg@2x.png) no-repeat;
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
                        width: 0.6rem;
                        height: 0.6rem;
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
                        width: 0.88rem;
                        height:0.3rem;
                        background: #E3E3E3;
                        border-radius: 0.15rem;
                        font-size: 0.24rem;
                        text-align: center;
                    }
                }
            }
        }
        .userCoinNumBox{
            margin-top: 0.2rem;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
            height: 1.93rem;
            background: url(../../assets/img/my/list5@2x.png);
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
            border-bottom:1px solid #E6E6E6;
            overflow: hidden;
            .cellIcon{
                float: left;
                margin-top: 0.33rem;
                width: 0.3rem;
                height: 0.3rem;
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

</style>