<template>
      <div class="page">
           <Header title="实名认证" @handleLeft="handleLeft()"></Header>
            <div class="wrap" v-if="status==4">
                 <div class="inputWrap">
                       <!-- 姓名 -->
                       <div class="inputBox">
                           <div class="inputBoxLeft">姓名</div>
                           <div class="inputBoxRight">
                                 <input  type="text" class="inputVal" v-model="userName" placeholder="请输入姓名">
                           </div>
                       </div>
                       <!-- 证件号 -->
                        <div class="inputBox">
                           <div class="inputBoxLeft">证件号</div>
                           <div class="inputBoxRight">
                                 <input  type="text" class="inputVal" v-model="userID" placeholder="请输入证件号码">
                           </div>
                       </div>
                       <div class="tipTxt">请拍摄并上传你的身份证照片</div>
                       <div class="idCardBox">
                           <div class="idCardItem" v-if="!frontUrl">
                               <img src="../../assets/img/idcard/idcard_up.png" alt="">
                               <div class="btnTitle">拍摄正面</div>
                               <input type="file" accept="image/*" multiple="multiple" class="file" @change="uploadFrontImgAPI($event)">
                           </div>
                           <div class="idCardItem" v-if="frontUrl">
                               <div class="logo"><img :src="frontUrl" alt=""></div>
                           </div>
                           <div class="idCardItem" v-if="!backUrl">
                                <img src="../../assets/img/idcard/idcard_down.png" alt="">
                                <div class="btnTitle">拍摄反面</div>
                                <input type="file" accept="image/*" multiple="multiple" class="file" @change="uploadBackImgAPI($event)">
                           </div>
                            <div class="idCardItem" v-if="backUrl">
                               <div class="logo"><img :src="backUrl" alt=""></div>
                           </div>
                       </div>
                 </div>
                 <!-- end -->
                 <div class="tipBox">
                        <div class="title">拍摄身份证要求：</div>
                        <div class="dex">
                            大陆公民持有的本人有效二代身份证；<br>
                            拍摄时确保身份证 <span style="color:#E73146;">
                                边框完整，字体清晰，亮度均匀；
                            </span>
                        </div>
                        <div class="photoBox">
                            <div class="photoItem">
                                <div class="logo" style="height:1.17rem;margin-top: 0.17rem;"><img src="../../assets/img/idcard/idcard_01.png" ></div>
                                <div class="itenTxt">标准</div>
                            </div>
                            <div class="photoItem">
                                <div class="logo"><img src="../../assets/img/idcard/idcard_02.png" ></div>
                                <div class="itenTxt">边框缺失</div>
                            </div>
                            <div class="photoItem">
                                <div class="logo" style="height:1.17rem;margin-top: 0.17rem;"><img src="../../assets/img/idcard/idcard_03.png" alt=""></div>
                                <div class="itenTxt">对焦模糊</div>
                            </div>
                            <div class="photoItem">
                                <div class="logo" style="height:1.17rem;margin-top: 0.17rem;"><img src="../../assets/img/idcard/idcard_04.png" alt=""></div>
                                <div class="itenTxt">闪光强烈</div>
                            </div>
                        </div>
                 </div>

                <div class="loginBtn" @click="submitAPI()" >
                    <div class="btnTxt">提交审核</div>
                </div>
                <!-- end -->

           </div> 
           <!-- 等待页面 -->
           <div class="waitView" v-else>
                     <div class="noDataImg">
                          <div class="txt" v-show="status==1">实名认证审核中</div>
                          <div class="txt" v-show="status==2">已通过实名认证！</div>
                          <div class="txt" v-show="status==3">实名认证审核失败</div>
                      </div>
           </div>


      </div>

      
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
import upLoaderImg from "../../api/upLoaderImg";
import { formateDate } from "../../utils/time";
import { Toast } from "vant";
export default {
    name: "ididentifty",
    components: {
        Header
    },
    data(){
        return{
            status:4,//1、审核中  2、审核成功  3、审核失败 4、未认证
            userName:'',
            userID:'',
            frontUrl:null,
            backUrl:null,
        }
    },
    mounted(){
        this.getIdentifyAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
          uploadFrontImgAPI(event){
             if(event.target.files.length>0){
                    let file = event.target.files[0]; // 对象，上传的文件
                    let that = this;
                    upLoaderImg(file).then((res=>{
                         let data = res.Data;
                         if (res.Code == 0) {
                            this.frontUrl = data.url;
                         }
                    }));
              }
          },
          uploadBackImgAPI(event){
             if(event.target.files.length>0){
                    let file = event.target.files[0]; // 对象，上传的文件
                    let that = this;
                    upLoaderImg(file).then((res=>{
                          let data = res.Data;
                         if (res.Code == 0) {
                            this.backUrl = data.url;
                         }
                    }));
              }
          },
          getIdentifyAPI(){
                let that = this;
                request.get(`/user/identify_info`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                              this.status = data.status;
                        }
                }));
        },
          submitAPI(){
                if(!this.frontUrl){
                    this.$toast({
                        message: "请上传正面身份证"
                    });
                    return;
                }
                if(!this.backUrl){
                    this.$toast({
                        message: "请上传反面身份证"
                    });
                    return;
                }
                let that = this;
                request.post(`/user/identify`,{
                    card_id:this.userID,
                    card_name:this.userName,
                    front_url:this.frontUrl,
                    back_url:this.backUrl
                }).then((res=>{
                        console.log('res',res);
                        if (res.data.Code == 0) {
                            this.$toast({
                                message: "提交成功"
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
    top: 1.2rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
    padding-bottom: 0.5rem;
    
}

.inputWrap{
    margin: 0 auto;
    width: 6.9rem;
    height: 6.16rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 0.23rem 0.04rem rgba(119, 119, 119, 0.1);
    border-radius: 0.15rem;
    overflow: hidden;
    .inputBox{
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        height: 0.96rem;
        border-bottom:1px solid #EBEBEB;
        position: relative;
        .inputBoxLeft{
            position: absolute;
            left: 0.23rem;
            top: 0;
            height: 100%;
            width: 1.2rem;
            font-size: 0.3rem;
            text-align: left;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #191919;
            line-height: 0.96rem;

        }
        .inputBoxRight{
             position: absolute;
             left: 1.5rem;
             right: 0.23rem;
             top: 0;
             height: 100%;
             overflow: hidden;
             display: flex;
             align-items: center;
             .inputVal{
                outline: none;
                -webkit-appearance: none;
                border: 0;
                font-size: 0.3rem;
                padding-left: 10px;
                text-align: right;
                width: 100%;
                height: 0.8rem;
                line-height: 0.8rem;
                box-sizing: border-box;
           }
        }
    }
    .tipTxt{
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-top: 0.45rem;
        height: 0.3rem;
        font-size: 0.26rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #656F96;
        line-height: 0.3rem;
        text-align: left;
    }
    .idCardBox{
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-top: 0.3rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .idCardItem{
            width: 2.82rem;
            height: 2.43rem;
            overflow: hidden;
            position: relative;
            .logo{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            img{
                width: 100%;
                height: 100%;
            }
            .btnTitle{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 0.5rem;
                font-size: 0.24rem;
                text-align: center;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
                line-height:0.5rem;
            }
            .file{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
            }
        }
    }
}
.tipBox{
     margin: 0 auto;
     margin-top: 0.3rem;
    width: 6.9rem;
    height: 3.83rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 0.23rem 0.04rem rgba(119, 119, 119, 0.1);
    border-radius: 0.15rem;
    overflow: hidden;
    .title{
        margin-left: 0.32rem;
        margin-top: 0.32rem;
        text-align: left;
        height: 0.4rem;
        font-size:0.26rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #2C395B;
        line-height: 0.4rem;

    }
    .dex{
         margin-left: 0.32rem;
         margin-top: 0.12rem;
         width: 6rem;
        font-size: 0.24rem;
        font-family: PingFangSC;
        font-weight: 400;
        color: #919191;
        text-align: left;
        line-height:0.4rem;

    }
    .photoBox{
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        margin-top: 0.17rem;
        height: 1.7rem;
        // border: 1px solid #000;
        display: flex;
        align-items: center;
        .photoItem{
            flex: 1;
            height: 100%;
            // border: 1px solid #000;
            .logo{
                width: 1.6rem;
                height: 1.4rem;
                // border: 1px solid #000;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .itenTxt{
                width:100%;
                height: 0.3rem;
                font-size: 0.24rem;
                font-family: PingFangSC;
                font-weight: 400;
                color: #919191;
                line-height: 0.3rem;
                text-align: center;
            }
        }
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


.waitView{
    position: absolute;
    left: 0;
    top: 1.02rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
    border: 1px solid #000;
    background: #fff;
    .noDataImg{
        margin: 0 auto;
        margin-top: 30%;
        width: 5.56rem;
        height: 4.1rem;
        background: url(../../assets/img/my/Identity_success.png) no-repeat center;
        background-size: 100% 100%;
        overflow: hidden;
        .txt{
            margin: 0 auto;
            margin-top: 3.28rem;
            width: 100%;
            font-size: 0.3rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height:0.4rem;
            text-align: center;
        }
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