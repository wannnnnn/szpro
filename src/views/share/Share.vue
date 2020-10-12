<template>
  <div class="share" :style="{width:appWidth+'px',height:appHeight+'px'}">

         <div class="shareTitle">
                    构建数据价值<br>
                    助力新基建             
         </div>
         <div class="loginContent">
                <!-- 手机号 -->
                <div class="inputBox">
                    <div class="regionBox">+86
                        <div class="rightLine"></div>
                    </div>
                    <div class="inputClass">
                        <input @input="inputevent(this)" type="number" class="inputVal" v-model="userAccount" placeholder="请输入用户名">
                    </div>
                </div> 
                <!-- 验证码 -->
                <div class="inputBox">
                    <div class="validateClass">
                        <input @input="inputevent(this)" type="number" class="inputVal" v-model="userCode" placeholder="输入验证码">
                    </div>
                    <div class="getSmsBtn" style="color: #3094f8;" @click="getMsgAPI()" v-show="!isValidateing">{{buttonName}}</div>
                    <div class="getSmsBtn getSmsGrayBtn"   v-show="isValidateing">{{buttonName}}</div>
                </div>
                <div class="shareCodeBox">
                     <div class="shareCodeBoxLeft">邀请码</div>
                     <div class="shareCode">{{shareCode}}</div>
                </div>
                
         </div>
         <div class="shareDesView">
               <div class="topView">
                   <div class="topInnnerView">
                       <div class="num">1</div>
                       <div class="num">2</div>
                       <div class="num">3</div>
                       <div class="line"></div>
                   </div>
                  
               </div>
                <div class="botInnerView">
                    <div class="botItem">
                                分享活动<br>
                                给好友
                    </div>
                    <div class="botItem">
                                好友接受<br>
                                邀请
                    </div>
                    <div class="botItem">
                                好友登录并<br>
                                完成实名认证
                    </div>
                </div>
         </div>
         <div class="downloadApp" @click="regAPI()">
              <div class="btnTxt">注册并下载APP</div>
         </div>
         <div class="botSep" style="width:100%;height:0.8rem;"></div>
  </div>
</template>

<script>
import rules from "../../utils/rules";
import { setToken, getToken } from "../../utils/auth";
import request from "../../api/request";
import {Toast} from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "",
        code: ""
      },
      buttonName: "获取验证码",
      isDisabled: false, //验证码再次发送
      time: 60,
      rules,
      userAccount:'',
      userCode:'',
      isValidateing:false,//是否在验证中
      isCanLogin:false,//是否可以登录
      appWidth:200,
      appHeight:100,
      shareCode:'',//邀请好友
    };
  },
  components:{
    //   Button
  },
  mounted(){
       this.appWidth = document.documentElement.clientWidth;
       this.appHeight = document.documentElement.clientHeight;
        if (this.$route.query.code) {
           this.shareCode = this.$route.query.code;
        }
  },
  methods: {
    goBack(){
         this.$router.go(-1);
    },
    getMsgAPI(){
        if(this.isDisabled){
            return;
        }
        
        let that = this;
        request.post(`/account/send_code`, 
        { 
          account:this.userAccount 
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
                    Toast("发送成功!");
                }else{
                   Toast(res.data.Msg);
                }
        }));
    },
    regAPI(){
        let that = this;
        request.post(`/account/register`, 
        { 
          account:this.userAccount,
          code:this.userCode,
          invite_code:this.shareCode
        }).then((res=>{
               console.log('res',res);
               let data = res.data.Data;
               if (res.data.Code == 0) {
                    Toast("注册成功!");
                    this.$router.push('/appDownload');
                }else{
                   Toast(res.data.Msg);
                }
        }));
    },
    inputevent(){
       if(this.userAccount.length==11&&this.userCode.length==6){
          this.isCanLogin = true;
       }else{
          this.isCanLogin = false;
       }
    },
  },
  computed: {
    regDisabled() {
      let { account, code } = this.loginForm;
      if (account && code) return false;
      return true;
    }
  }
};
</script>
<style scoped lang="scss">
// @import "assets/style/common";
.share {
  background-color: #fff;
  background: url(../../assets/img/register_bg.png) no-repeat center; 
  background-size: 100% 100%;
  overflow: auto;
}
.shareTitle{
    margin-top:1.5rem;
    width: 100%;
    font-size:0.8rem;
    font-family: JLinXin;
    font-weight: 400;
    color: #FFFFFF;
    line-height:1.1rem;
    background: linear-gradient(0deg, #DDD1E4 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}
.loginContent{
    margin: 0 auto;
    margin-top: 1.16rem;
    width: 6.75rem;
    height:4.35rem;
    background: #D42A44;
    border-radius:0.15rem;
    overflow: hidden;
     .inputBox{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.5rem;
        height: 0.88rem;
        position: relative;
        background: #fff;
        border-radius:0.1rem;
        border-bottom: 1px solid #EBEBEB;
        .regionBox{
            position: absolute;
            left: 0;
            top: 0;
            width: 0.96rem;
            height: 0.88rem;
            line-height: 0.88rem;
            font-size: 0.3rem;
            font-weight: 400;
            color: #191919;
            .rightLine{
                position: absolute;
                right: 0;
                top: 20%;
                bottom: 20%;
                width:1px;
                background: #F1F1F1;
            }

        }
        
        .inputClass{
            position: absolute;
            left: 0.96rem;
            height: 100%;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
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
            .inputVal{
                    outline: none;
                    -webkit-appearance: none;
                    border: 0;
                    font-size:0.3rem;
                    padding-left: 0.3rem;
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    box-sizing: border-box;
            }
        }

        .validateClass{
            position: absolute;
            left:0;
            height: 100%;
            right: 1.2rem;
            top: 0;
            display: flex;
            align-items: center;
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
            .inputVal{
                    outline: none;
                    -webkit-appearance: none;
                    border: 0;
                    font-size:0.3rem;
                    padding-left: 0.1rem;
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
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
  .shareCodeBox{
       margin-left: 0.3rem;
       margin-right: 0.3rem;
       margin-top: 0.5rem;
       height: 0.84rem;
       background: #C5273E;
       border-radius: 0.1rem;
       .shareCodeBoxLeft{
            float: left;
            margin-left: 0.24rem;
            height:0.84rem;
            font-size:0.3rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 0.84rem;
       }
       .shareCode{
            float: left;
            margin-left: 0.6rem;
            height:0.84rem;
            font-size:0.3rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFC547;
            line-height: 0.84rem;
            text-align: left;
            font-weight: 500;
       }
  }
  

}
.shareDesView{
    margin: 0 auto;
    margin-top: 0.31rem;
    width:6.75rem;
    height:1.98rem;
    background: #D42A44;
    border-radius:0.15rem;
    overflow: hidden;
    .topView{
        margin-left: 0.8rem;
        margin-right: 0.8rem;
        margin-top: 0.33rem;
        height: 0.36rem;
        overflow: hidden;
        .topInnnerView{
            width: 100%;
            height: 0.36rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            .num{
                width: 0.36rem;
                height: 0.36rem;
                line-height: 0.36rem;
                text-align: center;
                font-size: 0.24rem;
                color: #D42A44;
                background: #FFFFFF;
                border-radius: 50%;
                z-index: 999;
            }
            .line{
                position: absolute;
                left: 0;
                right: 0;
                top: 0.16rem;
                height: 0.02rem;
                background: #fff;
            }
        }
        
    }
    .botInnerView{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.25rem;
        height: 0.75rem;
        display: flex;
        justify-content: space-between;
        .botItem{
            width: 1.6rem;
            height: 0.75rem;
            font-size:0.24rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 0.38rem;
            text-align: center;
        }
    }
}

.downloadApp{
    margin: 0 auto;
    margin-top: 0.4rem;
    width:4.9rem;
    height:0.96rem;
    background: linear-gradient(0deg, #FFC442, #FCED86);
    box-shadow: 0px 0.1rem 0.3rem 0px rgba(26, 25, 26, 0.2);
    border-radius:0.46rem;
    overflow: hidden;
    .btnTxt{
          width: 100%;
          height: 0.96rem;
          line-height: 0.96rem;
          text-align: center;
          color: #D32246;
          font-size: 0.34rem;
    }

}

</style>
