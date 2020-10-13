<template>
  <div class="register" :style="{width:appWidth+'px',height:appHeight+'px'}">
    <div class="closeBtn" @click="goBack()">
         <img src="../../assets/img/close_black.png" alt="">
    </div>
    <!-- 内容区域 -->
    <div class="login-content">
      <div class="logo">
        <img :src="require('../../assets/img/logo/app_logo.png')" alt="" />
      </div>
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

       <!-- 邀请码 -->
      <div class="inputBox">
           
           <div class="invateInputClass">
               <input @input="inputevent(this)" type="text" class="inputVal" v-model="userInviteCode" placeholder="请输入6位邀请码">
           </div>
      </div> 

      <div class="loginBtn" @click="regAPI()" v-show="isCanLogin">
           <div class="btnTxt">注册</div>
      </div>
      <div class="loginBtn uncheckBtn"  v-show="!isCanLogin">
           <div class="btnTxt">注册</div>
      </div>

     
      
      <router-link to="/login" class="register">
            <div>已有账号登录</div>
      </router-link>

    
    </div>
  </div>
</template>

<script>
import rules from "../../utils/rules";
import { setToken, getToken } from "../../utils/auth";
import request from "../../api/request";
import {Toast} from "mint-ui";
export default {
  name: "register",
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
      userAccount:'',//账号
      userCode:'',//验证码
      userInviteCode:'',//邀请吗
      isValidateing:false,//是否在验证中
      isCanLogin:false,//是否可以登录
      appWidth:200,
      appHeight:100,
    };
  },
  mounted(){
       this.appWidth = document.documentElement.clientWidth;
       this.appHeight = document.documentElement.clientHeight;
  },
  methods: {
    goBack(){
           if (window.history.length <= 1) {
            this.$router.push({ path: "/home" });
            return false;
          } else {
            this.$router.go(-1);
          }
    },
    getMsgAPI(){
        if(this.isDisabled){
            return;
        }
        if (!(/^1[34578]\d{9}$/.test(this.userAccount))) {
           Toast('请输入手机号')
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
                    Toast('发送成功!');
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
          invite_code:this.userInviteCode
        }).then((res=>{
               console.log('res',res);
               let data = res.data.Data;
               if (res.data.Code == 0) {
                    setToken(data.token);
                    this.$store.commit("setToken", data.token);
                    Toast('注册成功!');
                     localStorage.setItem('loginFlag','logined');
                    this.$router.push('/home');
                }else{
                    Toast(res.data.Msg);
                }
        }));
    },
    inputevent(){
       if(this.userAccount.length==11&&this.userCode.length==6&&this.userInviteCode.length==6){
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
.register {
  background-color: #fff;
  // position: relative;
}
.closeBtn{
    position: absolute;
    left: 0.26rem;
    top: 0.63rem;
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
.login-content {
      height: 100%;
      width: 100%;
      .logo {
          margin: 0 auto;
          margin-top: 1.2rem;
          width: 1.4rem;
          height: 1.8rem;
          img {
            width: 100%;
            height: 100%;
         }
  }
  .inputBox{
      margin-left: 0.8rem;
      margin-right: 0.8rem;
      margin-top: 0.7rem;
      height: 0.88rem;
    //   border: 1px solid #000;
      position: relative;
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
      .invateInputClass{
           position: absolute;
           left: 0;
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
               border: none;
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
               border: none;
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
               border: none;
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
  .uncheckBtn{
      background: #9CB8FB;
  }
  .register{
      display: block;
      margin-left: 0.8rem;
      margin-right: 0.8rem;
      margin-top: 0.5rem;
      height: 0.5rem;
      font-size:0.26rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: #B6B4B9;
      line-height:0.5rem;

  }

}
</style>
