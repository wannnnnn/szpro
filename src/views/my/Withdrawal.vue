<template>
    <div class="page">
        <Header title="提币" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
              <div class="withdrawStyleBox">
                    <div class="styleBox">
                         <div class="styleBoxLeft">转账方式</div>
                         <div class="styleBoxRight">提现</div>
                    </div>
                     <div class="coinInfo">
                            <div class="coinIcon"><img src="../../assets/img/asset/USDT@2x.png" alt=""></div>
                            <div class="coinTitle">USDT</div>
                            <div class="coinStyle">ERC20</div>
                    </div>
              </div>
              <!-- end -->
              <div class="inputWrap">
                    <div class="moneyBox">
                         <div class="left">USDT</div>
                         <div class="right">余额：{{usdt.toFixed(2)}}</div>
                    </div>
                      <!-- 数量 -->
                    <div class="inputBox">
                        <div class="inputClass">
                            <input  type="number" class="inputVal" v-model="coinNum" placeholder="请输入提币数量">
                        </div>
                         <div class="regionBox">
                            全部提取
                        </div>
                    </div> 
                    <div class="tip">提币地址</div>
                       <!-- 数量 -->
                    <div class="inputBox">
                        <div class="inputClass">
                            <input  type="number" class="inputVal" v-model="coinAddress" placeholder="请输入或粘贴钱包地址">
                        </div>
                    </div> 
                    <div class="shouxufei">提币手续费：3USDT</div>
                    <!-- <div class="botInoutBox">
                        <div class="inoutLeft">手机号：</div>
                        <div class="inputRight">
                               <div class="inputClass">
                                    <input  type="number" class="inputVal" v-model="userPhone" placeholder="请输入您绑定的手机号">
                                </div>
                        </div>
                    </div> -->
                     <div class="botInoutBox">
                        <div class="inoutLeft">验证码：</div>
                        <div class="inputRight">
                                 <div class="inputClass">
                                    <input  type="number" class="inputVal" v-model="userCode" placeholder="输入短信验证码">
                                </div>
                                 <div class="getSmsBtnbot" style="color: #3094f8;" @click="getMsgAPI()" v-show="!isValidateing">{{buttonName}}</div>
                                 <div class="getSmsBtnbot getSmsGrayBtnbot"   v-show="isValidateing">{{buttonName}}</div>
                        </div>
                    </div>
              </div>
               <!-- end -->
                <div class="desView">
                    <div class="title">*温馨提示</div>
                    <div class="coinDes">
                        为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
                    </div>
                </div>
                 <div class="loginBtn" @click="tibiAPI()" >
                    <div class="btnTxt">提币</div>
                </div>
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
import { Toast } from "vant";
export default {
    name: "home",
    components: {
        Header
    },
    data(){
        return{
            coinNum:0,
            coinAddress:'',//地址
            userPhone:'',//手机号码
            userCode:'',//验证码：
            isValidateing:false,//是否在验证中
            buttonName: "获取验证码",
            isDisabled: false, //验证码再次发送
            time: 60,
            usdt:0,
        }
    },
    mounted(){
        this.getMyAssetsAPI();
        this.userPhone = localStorage.getItem('myPhone');
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         getMyAssetsAPI(){
                let that = this;
                request.get(`/user/assets`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                             this.usdt = data.assets.usdt;
                        }
                }));
        },
        tibiAPI(){
            if(this.coinNum<=0){
                 this.$toast({
                    message: "提币不能低于3USDT"
                });
                return;
            }
             if(this.coinNum>this.usdt){
                 this.$toast({
                    message: "提币数量大于资产数量"
                });
                return;
            }
            if(this.coinAddress.length==0){
                 this.$toast({
                    message: "请输入或粘贴钱包地址"
                });
                return;
            }
            if(this.userCode.length!=6){
                 this.$toast({
                    message: "输入6位短信验证码"
                });
                return;
            }
            let that = this;
            request.post(`/withdraw/commit`, 
            { 
              amount:this.coinNum,
              to_address:this.coinAddress, 
              code:this.userCode,
            }).then((res=>{
                   console.log('res',res);
                
                    if (res.data.Code == 0) {
                        
                    }else{
                        this.$toast({
                        message: res.data.Msg
                        });
                    }
            }));
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
    padding-bottom: 0.5rem;
}
.withdrawStyleBox{
    margin: 0 auto;
    margin-top: 0.3rem;
    width:6.8rem;
    height: 1.79rem;
    background: #FFFFFF;
    border-radius: 0.15rem;
    overflow: hidden;
    .styleBox{
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        margin-top: 0.37rem;
        height: 0.3rem;
        .styleBoxLeft{
            float: left;
            margin-left: 0.2rem;
            height:0.3rem;
            font-size: 0.3rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #13112A;
            line-height:0.3rem;
        }
        .styleBoxRight{
            float: right;
            margin-right: 0.2rem;
             height:0.3rem;
            font-size: 0.26rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #B6B6B9;
            line-height: 0.3rem;

        }
    }
     .coinInfo{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.42rem;
        height: 0.45rem;
        .coinIcon{
            float: left;
            width: 0.41rem;
            height: 0.41rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .coinTitle{
            float: left;
            margin-left: 0.2rem;
            width: 80px;
            height: 0.41rem;
            font-size: 0.3rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: #13112A;
            line-height: 0.41rem;
            text-align: left;
        }
        .coinStyle{
            float: right;
            width: 1rem;
            height: 0.4rem;
            border: 1px solid #608AFF;
            border-radius: 0.05rem;
            line-height: 0.4rem;
            text-align: center;
            color: #608AFF;
            font-size: 0.26rem;
        }
    }

}
.inputWrap{
     margin: 0 auto;
    margin-top: 0.3rem;
    width:6.8rem;
    height: 4.95rem;
    background: #FFFFFF;
    border-radius: 0.15rem;
    overflow: hidden;
    .moneyBox{
         margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.32rem;
        height: 0.3rem;
        .left{
            float: left;
            height: 0.3rem;
            font-size:0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #B6B4B9;
            line-height: 0.3rem;
        }
        .right{
            float: right;
            height: 0.3rem;
            font-size:0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #B6B4B9;
            line-height: 0.3rem;
        }
    }
    .inputBox{
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      height: 0.68rem;
    //   border: 1px solid #000;
      position: relative;
      border-bottom: 1px solid #EBEBEB;
      .regionBox{
         position: absolute;
         right: 0;
         top: 0;
         width: 1.3rem;
         height: 0.68rem;
         line-height: 0.68rem;
         font-size: 0.26rem;
         font-weight: 400;
         color: #608AFF;
         text-align: center;

      }
      
      .inputClass{
           position: absolute;
           left: 0;
           height: 100%;
           right: 1.1rem;
           top: 0;
           display: flex;
           align-items: center;
           .inputVal{
                outline: none;
                -webkit-appearance: none;
                border: 0;
                font-size: 0.3rem;
                padding-left: 0.1rem;
                width: 100%;
                height: 0.6rem;
                line-height: 0.6rem;
                box-sizing: border-box;
           }
      }

     
      .getSmsBtn{
           position: absolute;
           right:0;
           height: 0.6rem;
           width: 1.8rem;
           top: 0.2rem;
           font-size: 0.28rem;
           line-height: 0.6rem;
      }
      .getSmsGrayBtn{
          color: #B6B4B9;
      }
  }
  .tip{
       margin-top: 0.3rem;
       margin-left: 0.3rem;
       margin-top: 0.2rem;
       width: 100%;
       text-align: left;
        height: 0.4rem;
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #13112A;
        line-height:  0.4rem;

  }
  .shouxufei{
         margin-left: 0.3rem;
         margin-right: 0.3rem;
         margin-top: 0.22rem;
        height: 0.3rem;
        font-size:0.22rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #608AFF;
        line-height:  0.3rem;
        text-align: left;

  }
  .botInoutBox{
       margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-top: 0.3rem;
      height: 0.68rem;
      position: relative;
      .inoutLeft{
           position: absolute;
           left: 0;
           top: 0;
           width: 1.2rem;
           height: 0.68rem;
           line-height: 0.68rem;
            font-size:0.3rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #13112A;
           margin-left: 0.1rem;
      }
      .inputRight{
           position: absolute;
           left: 1.2rem;
           top: 0;
           right: 0.1rem;
           height: 0.68rem;
           border-bottom: 1px solid #EBEBEB;
           .inputClass{
                position: absolute;
                left: 0;
                height: 100%;
                right: 0;
                top: 0;
                display: flex;
                align-items: center;
                .inputVal{
                        outline: none;
                        -webkit-appearance: none;
                        border: 0;
                        font-size: 0.3rem;
                        padding-left: 0.1rem;
                        width: 100%;
                        height: 0.6rem;
                        line-height: 0.6rem;
                        box-sizing: border-box;
                }
            }
            .getSmsBtnbot{
                position: absolute;
                right:0;
                height: 0.6rem;
                width: 1.8rem;
                top: 0;
                font-size: 0.28rem;
                line-height: 0.6rem;
            }
            .getSmsGrayBtnbot{
                color: #B6B4B9;
            }
      }
  }
}
.desView{
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
    overflow: hidden;
    .title{
        width: 100%;
        height: 0.3rem;
        font-size: 0.24rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #343434;
        line-height:0.3rem;
        text-align: left;
    }
    .coinDes{
        text-align: left;
        width: 100%;
        margin-top: 0.2rem;
        font-size: 0.22rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #9A9A9A;
        line-height: 0.36rem;
    }
}
.loginBtn{
      margin-left: 0.8rem;
      margin-right: 0.8rem;
      margin-top: 0.7rem;
      height: 0.88rem;
      height:0.88rem;
      background: linear-gradient(90deg, #307AF4, #84C4FF);
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

  input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
               -webkit-appearance: none;
            }
            input {
               -moz-appearance: textfield;
            }
            input::-webkit-input-placeholder {
               color: #cccccc;
            }
            input::-moz-placeholder {
               color: #cccccc;
            }
            input:-moz-placeholder {
               color: #cccccc;
            }
            input:-ms-input-placeholder {
               color: #cccccc;
            }
            input:focus {
            //    border: 1px solid #383b45;
            }

</style>