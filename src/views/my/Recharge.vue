<template>
    <div class="page">
        <Header title="充币" :isShowCharge="true" @handleLeft="handleLeft()" @handleCharge="handleCharge()"></Header>
        <div class="wrap">
                <!-- 背景部分 -->
                 <div class="wrapBg">
                     <div class="warpBgImg">
                         <img src="../../assets/img/recharge_bg.png" alt="">
                     </div>
                 </div>
                 <!-- 内容部分 -->
                 <div class="wrapTxt">
                      <div class="chrageBox">
                            <div class="coinInfo" v-show="type==1">
                                 <div class="coinIcon"><img src="../../assets/img/asset/USDT@2x.png" alt=""></div>
                                 <div class="coinTitle">USDT</div>
                            </div>
                             <div class="coinInfo" v-show="type==2">
                                 <div class="coinIcon"><img src="../../assets/img/asset/FIL@2x.png" alt=""></div>
                                 <div class="coinTitle">FIL</div>
                            </div>
                            <div class="coinName">
                                 <div class="coinNameLeft">链名</div>
                                 <div class="coinNameRight">ERC20</div>
                            </div>
                            <div class="address">扫描二维码获取充币地址</div>
                            <div class="qrCodeBox">
                                <div class="code" ref="code"></div>
                            </div>
                            <div class="copyBox">
                                 <div class="addressVal">
                                      <div class="text">{{address}}</div>
                                      <!-- <div class="text">请勿向，上述地址充值任何非USDT资产， 否则资产将不可找回。</div> -->
                                 </div>
                                 <div class="copyBtn" v-clipboard:copy="address" v-clipboard:success="onCopy" v-clipboard:error="onError">复制地址</div>
                            </div>
                      </div>
                      <!-- end -->
                      <div class="desView">
                           <div class="title">*温馨提示</div>
                           <div class="coinDes">
                                请勿向，上述地址充值任何非USDT资产， 否则资产将不可找回。<br>
                                您充值至，上述地址后，需要整个网络节点的确认，12次网络确认后到账，12次网络确认后可提币。<br>
                                最小充值金额: 1 USDT,小于最小金额的充值将不会.上账且无法退回。<br>
                                您的充值地址不会经常改变，可以重复充值;如有更改，我们会尽量通过网站公告或邮件通知您。<br>
                                请务必确认电脑及浏览器安全，防止信息被篡改或泄露。<br>
                            
                           </div>
                      </div>
                      <!-- end -->
                        <div class="uploadChargeBox">
                              <div class="titleView">上传充值凭证</div>
                              <div class="botView">
                                   <div class="photoView">
                                       <div class="photoInner" v-if="!uploadImgUrl"><img src="../../assets/img/take_photo.png" alt="">
                                            <input type="file" accept="image/*" multiple="multiple" class="file" @change="uploadFrontImgAPI($event)">
                                       </div>
                                       <div class="photoShow" v-if="uploadImgUrl">
                                           <img :src="uploadImgUrl" alt="">
                                       </div>
                                   </div>
                              </div>
                        </div>
                        <div class="loginBtn" @click="submitAPI()" >
                            <div class="btnTxt">确认上传</div>
                        </div>
                        <div class="botSep" style="width:100%;height:0.5rem;"></div>
                 </div>
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
import upLoaderImg from "../../api/upLoaderImg";
let QRCode = require('js-qrcode');
import VueClipboard from 'vue-clipboard2';
import { Toast } from "vant";
export default {
    name: "home",
    components: {
        Header
    },
    data(){
        return{
            address:'',
            type:1,//类型
            uploadImgUrl:null,
        }
    },
    mounted(){
        this.getMyAssetsAPI();
        this.makeCode(this.address);
        // if (this.$route.query.address) {
        //    this.address = this.$route.query.address;
        //    this.makeCode(this.address);
        // }
         if (this.$route.query.type) {
           this.type = this.$route.query.type;
        }
        
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         handleCharge(){
             this.$router.push('/rechargeRecord');
         },
         onCopy: function (e) {
              this.$toast({
                message: "复制成功"
              });
		},
		onError: function (e) {
			this.$toast({
                message: "复制失败"
              });
        },
        uploadFrontImgAPI(event){
             if(event.target.files.length>0){
                    let file = event.target.files[0]; // 对象，上传的文件
                    let that = this;
                    upLoaderImg(file).then((res=>{
                         let data = res.Data;
                         if (res.Code == 0) {
                            this.uploadImgUrl = data.url;
                         }
                    }));
              }
        },
        submitAPI(){
                if(!this.uploadImgUrl){
                    this.$toast({
                        message: "请上传凭证"
                    });
                    return;
                }
                
                let that = this;
                request.post(`/deposit/commit`,{
                    url:this.uploadImgUrl
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
        getMyAssetsAPI(){
                let that = this;
                request.get(`/user/assets`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                             
                            //  this.address = data.assets.deposit_addr;
                            //  this.makeCode(this.address);
                        }else{
                          
                        }
                }));
        },
        makeCode(text){
			let dom=this.$refs.code;
			var qr = new QRCode(dom, {
				width: 138,
				height: 138
			});
			qr.make(text);
		}
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
 .wrapBg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .warpBgImg{
        width: 100%;
        //1516 1528
        height: 7.64rem;
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
    .chrageBox{
         width: 100%;
        height: 7.64rem;
        .coinInfo{
            margin-left: 0.6rem;
            margin-right: 0.3rem;
            margin-top: 0.42rem;
            height: 0.45rem;
            display: flex;
            align-items: center;
            .coinIcon{
                width: 0.41rem;
                height: 0.41rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .coinTitle{
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
        }
        .coinName{
            margin: 0 auto;
            margin-top: 0.57rem;
            width: 5.9rem;
            height: 0.6rem;
            background: #FFFFFF;
            box-shadow: 1px 10px 13px 0px rgba(130, 149, 180, 0.1);
            border-radius: 0.3rem;
            .coinNameLeft{
                float: left;
                font-size: 0.26rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: #2D3A5C;
                line-height: 0.6rem;
                padding-left: 0.3rem;
            }
            .coinNameRight{
                float: right;
                font-size: 0.26rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: #608AFF;
                line-height:0.6rem;
                padding-right: 0.3rem;
            }

        }
        .address{
            margin: 0 auto;
            margin-top: 0.48rem;
            height: 0.4rem;
            font-size: 0.26rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #B6B4B9;
            line-height: 0.4rem;
            text-align: center;
        }
        .qrCodeBox{
             margin: 0 auto;
             margin-top: 0.26rem;
             width: 2.4rem;
             height: 2.4rem;
        }
        .copyBox{
             margin: 0 auto;
             margin-top: 0.39rem;
             width: 5.9rem;
             height: 0.88rem;
             background: #F5F6FF;
             display: flex;
             align-items: center;
            //  border: 1px solid #000;
             overflow: hidden;
             position: relative;
             .addressVal{
                position: absolute;
                left: 0;
                top: 0;
                width: 4.3rem;
                height: 0.8rem;
                .text{
                    padding-top: 0.1rem;
                    width: 100%;
                    height: 100%;
                     line-height: 0.3rem; 
                    font-size: 0.24rem;
                    font-weight: 400;
                    color: #13102A;
                    padding-left: 0.1rem;
                    text-overflow: ellipsis;
                    word-wrap:break-word;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-align: left;
                }
               
             }
             .copyBtn{
                position: absolute;
                right: 0;
                top: 0;                 
                width: 1.51rem;
                height: 0.88rem;
                background: linear-gradient(90deg, #307AF4, #84C4FF);
                line-height: 0.88rem;
                text-align: center;
                font-size: 0.28rem;
                color: #fff;
                // display: none;
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
    .uploadChargeBox{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        margin-top: 0.3rem;
        height: 3rem;
        background: #fff;
        border-radius:0.1rem;
        overflow: hidden;
        .titleView{
            width:100%;
            background: rgba(239, 240, 249, 1);
            height: 0.8rem;
            line-height: 0.8rem;
            padding-left: 0.2rem;
            font-size: 0.28rem;
            text-align: left;
        }
        .botView{
            width: 100%;
            height: 2rem;
            .photoView{
                margin-left: 0.3rem;
                margin-top: 0.2rem;
                width: 1.8rem;
                height: 1.8rem;
                position: relative;
                .photoInner{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
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
                .photoShow{
                     position: absolute;
                    left: 0;
                     top: 0;
                     width: 100%;
                     height: 100%;
                    img{
                         width: auto;
                         height: auto;
                         max-width: 100%;
                         max-height: 100%;
                    }
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
}


</style>