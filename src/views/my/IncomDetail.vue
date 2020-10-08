<template>
    <div class="page">
        <Header title="收益明细" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
               <div class="tabBarView">
                   <div class="tabBarItem" :class="{tabBarItemAct:tabBarIndex==0}" @click="changeTabBarAction(0)">
                         FIL算力
                         <div class="line" v-show="tabBarIndex==0"></div>
                   </div>
                   <div class="tabBarItem" :class="{tabBarItemAct:tabBarIndex==1}" @click="changeTabBarAction(1)">
                        奖励池收益
                        <div class="line" v-show="tabBarIndex==1"></div>
                   </div>
               </div>
               <!-- 列表 -->
               <div class="listBox">
                     <!-- FIL算力 -->
                     <div class="filCalculateListBox" v-show="tabBarIndex==0">
                           <div class="filItem" v-for="n in 20">
                                 <div class="filItemLeft">
                                      <div class="text1">活动奖励</div>
                                      <div class="text2">2020-09-14</div>
                                 </div>
                                 <div class="filItemRight">0.01TB</div>
                           </div>
                     </div>
                     <!-- 奖励池收益 -->
                     <div class="poolIncomeListBox" v-show="tabBarIndex==1">
                           <div class="filItem" v-for="n in 20">
                                 <div class="filItemLeft">
                                      <div class="text1">收益</div>
                                      <div class="text2">2020-09-14</div>
                                 </div>
                                 <div class="filItemRight">0.01TB</div>
                           </div>
                     </div>
               </div>
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
export default {
    name: "incomeDetail",
    components: {
        Header
    },
    data(){
        return{
            list:[],
            tabBarIndex:0,
        }
    },
    mounted(){
        // this.getHpDataAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         changeTabBarAction(index){
             this.tabBarIndex = index;
         },
         getMsgAPI(){
            if(this.isDisabled){
                return;
            }
            
            let that = this;
            request.post(`/account/send_code`, 
            { 
              account:this.userPhone 
            }).then((res=>{
                console.log('res',res);
                
                if (res.data.Code == 0) {
                        that.isValidateing = true;
                        that.isDisabled = true;
                        let interval = window.setInterval(function() {
                        that.buttonName = "重新发送(" + that.time + "s)";
                        --that.time;
                        if (that.time < 0) {
                            that.buttonName = "获取验证码";
                            that.time = 60;
                            that.isDisabled = false;
                            window.clearInterval(interval);
                            that.isValidateing = false;
                        }
                        }, 1000);
                        this.$toast({
                        message: "发送成功!"
                        });
                    }else{
                        this.$toast({
                        message: res.data.Msg
                        });
                    }
            }));
        },
    }
}
</script>

<style lang="less" scoped>
.page{
   background: rgba(239, 240, 249, 1);
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
    color: #fff;
    z-index: 100;
}
.wrap{
    position: absolute;
    left: 0;
    top: 1.04rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
}
.tabBarView{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 0.93rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E6E6E6;
    .tabBarItem{
        flex: 1;
        height: 100%;
        height: 0.93rem;
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 0.93rem;
        color:#999999;
        text-align: center;
        position: relative;
        .line{
            position: absolute;
            left: 0;
            bottom: 0;
            width:100%;
            height:0.05rem;
            background: #608AFF;
        }
    }
    .tabBarItemAct{
        color: #333333;
    }
}
.listBox{
    position: absolute;
    left: 0;
    top:0.93rem;
    width: 100%;
    bottom: 0;
    overflow: auto;
    .filCalculateListBox{
         width: 100%;
         overflow: hidden;
         .filItem{
             margin-left: 0.3rem;
             margin-right: 0.3rem;
             height: 1.16rem;
             border-bottom:1px solid #E6E6E6;
             .filItemLeft{
                 float: left;
                 height: 100%;
                 text-align: left;
                 .text1{
                     margin-top: 0.24rem;
                     height: 0.3rem;
                     font-size: 0.28rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #0B0C12;
                     line-height:0.3rem;
                 }
                  .text2{
                     margin-top: 0.1rem;
                     height: 0.3rem;
                     font-size: 0.24rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #5A6375;
                     line-height:0.3rem;
                 }
             }
             .filItemRight{
                 float: right;
                 height: 100%;
                 margin-right: 0.1rem;
                 font-size:0.28rem;
                 font-family: Source Han Sans CN;
                 font-weight: bold;
                 color: #0B0C12;
                 line-height:1.16rem;

             }
         }
    }

    .poolIncomeListBox{
          width: 100%;
          overflow: hidden;
         .filItem{
             margin-left: 0.3rem;
             margin-right: 0.3rem;
             height: 1.16rem;
             border-bottom:1px solid #E6E6E6;
             .filItemLeft{
                 float: left;
                 height: 100%;
                 text-align: left;
                 .text1{
                     margin-top: 0.24rem;
                     height: 0.3rem;
                     font-size: 0.28rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #0B0C12;
                     line-height:0.3rem;
                 }
                  .text2{
                     margin-top: 0.1rem;
                     height: 0.3rem;
                     font-size: 0.24rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #5A6375;
                     line-height:0.3rem;
                 }
             }
             .filItemRight{
                 float: right;
                 height: 100%;
                 margin-right: 0.1rem;
                 font-size:0.28rem;
                 font-family: Source Han Sans CN;
                 font-weight: bold;
                 color: #0B0C12;
                 line-height:1.16rem;

             }
         }
    }
}


</style>