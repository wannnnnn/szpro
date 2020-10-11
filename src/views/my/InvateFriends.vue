<template>
    <div class="page">
         <Header title="邀请好友"  @handleLeft="handleLeft()" ></Header>
         <!-- <Header title="邀请好友" :isShowRight="true" @handleLeft="handleLeft()" @handleShare="handleShare()"></Header> -->
        <div class="wrap">
               <div class="friends">
                    <div class="h-title"></div>
                    <div class="subtitle">构建数据价值  |  助力新基建</div>
                    <div class="friends-box">
                            <div class="title">
                                我的邀请码
                            </div>
                            <div class="shareCode">{{invite_code}}</div>
                            <div class="line"></div>
                            <div class="qrCodeBox">
                                <div class="code" ref="code"></div>
                            </div>
                            <div class="notice">
                                长按图片即可保存个人专属二维码
                            </div>
                    </div>
                </div>
                 <div class="downloadApp" >
                    <div class="btnTxt">保存个人专属二维码</div>
                </div>
                <!-- end -->
                    <!-- <div class="my-reward">
                            <div class="title">我的奖励</div>
                            <div class="line"></div>
                            <div class="group">
                                <div class="item">
                                    <div class="count">{{share_num}}<span>人</span></div>
                                    <div class="text">邀请人数</div>
                                </div>
                                <div class="item">
                                    <div class="count">{{share_buy_num}}<span>人</span></div>
                                    <div class="text">购买数量</div>
                                </div>
                                <div class="item">
                                    <div class="count">{{share_income}}<span>Fil</span></div>
                                    <div class="text">奖励收益</div>
                                </div>
                            </div>
                    </div> -->
        </div> 


         <!-- 分享 -->
         <div id="shareModel" v-show="isShowShareModel">
               <div class="modelContent">
                     <div class="shareTitle1">分享</div>
                     <div class="shareBoxs">
                         <div class="shareBoxItem" v-clipboard:copy="share_url" v-clipboard:success="onCopy" v-clipboard:error="onError">
                              <div class="logo"><img src="../../assets/img/friends/share_wechat.png" alt=""></div>
                              <div class="iteTxt">微信</div>
                         </div>
                         <div class="shareBoxItem" style="margin-left:1.2rem;" v-clipboard:copy="share_url" v-clipboard:success="onCopy" v-clipboard:error="onError">
                             <div class="logo"><img src="../../assets/img/friends/share_link.png" alt=""></div>
                              <div class="iteTxt">复制链接</div>
                         </div>
                     </div>
                     <div class="qucanlBtn" @click="isShowShareModel=false">取消分享</div>
               </div>
               <div class="maskView" @click="isShowShareModel=false"></div>
         </div>
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
let QRCode = require('js-qrcode');
import VueClipboard from 'vue-clipboard2';
import { Toast } from "vant";
export default {
    name: "invateFriend",
    components: {
        Header
    },
    data(){
        return{
           invite_code:'',
           isShowShareModel:false,
           share_url:'',
           share_num:'--',
           share_buy_num:'--',
           share_income:'--',
        }
    },
    mounted(){
        this.getShareInfoAPI();
        this.makeCode('s');
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         handleShare(){
            this.isShowShareModel = true;
         },
        makeCode(text){
			let dom=this.$refs.code;
			var qr = new QRCode(dom, {
				width: 138,
				height: 138
			});
			qr.make(text);
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
         getShareInfoAPI(){
            let that = this;
            request.get(`/user/invite_code`).then((res=>{
                  console.log('res',res);
                   let data = res.data.Data;
                   if (res.data.Code == 0) {
                        this.invite_code = data.invite_code;
                        this.share_url = data.share_url;
                        this.share_num = data.share_num;
                        this.share_buy_num = data.share_buy_num;
                        this.share_income = data.share_income;
                        this.makeCode(this.share_url);
                    }else{
                       
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
    background: url(../../assets/img/register_bg.png) no-repeat center; 
    background-size: 100% 100%;
}
.friends {
    width: 100%;
    overflow: hidden;
    .h-title {
        margin: 0 auto;
        margin-top:0.78rem;
        width: 3.23rem;
        height: 0.88rem;
        background: url(../../assets/img/friends/top.png) no-repeat center;
        background-size: 100% 100%;
    }
    .subtitle {
        margin: 0 auto;
        width:4.29rem;
        height: 0.6rem;
        margin-top: 0.47rem;
        background: url(../../assets/img/friends/bTop.png) no-repeat center;
        background-size: 100% 100%;
        margin-bottom: 0.15rem;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.6rem;
    }
}

.friends-box {
    margin: 0 auto;
    margin-top: 1.1rem;
    width: 6.75rem;
    height: 6.63rem;
    background: url(../../assets/img/friends/img_box.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
        margin-top:0.85rem;
        color: #0c0d13;
        font-size: 0.28rem;
        font-weight: bold;
    }
    .shareCode{
        color: #ffffff;
        font-weight: 700;
        font-size: 0.48rem;
        margin-top: 0.25rem;
        width: 2.73rem;
        height: 0.77rem;
        background: linear-gradient(90deg, #307af4, #84c4ff);
        border-radius: 0.39rem;
        text-align: center;
        line-height: 0.77rem;
    }
    .line{
        margin: 0 auto;
        margin-top: 0.2rem;
        width:3.79rem;
        height: 0.01rem;
        background:  #DCDCDC;
    }
    .qrCodeBox{
        margin: 0 auto;
        margin-top: 0.26rem;
        width: 2.4rem;
        height: 2.4rem;
    }

    .notice {
        color: #b6b4b9;
        font-size: 0.22rem;
        margin-top: 0.21rem;
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

.my-reward {
  margin: 0 auto;
  margin-top:1.28rem;
  width: 7.46rem;
  height: 3.48rem;
  background: url(../../assets/img/friends/bottom.png) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  .title {
    margin: 0 auto;
    font-size: 0.3rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #362024;
    z-index: 9;
    margin-top: 0.65rem;
  }
  .line {
    margin: 0 auto;
    // margin-top: 0.5rem;
    width: 1.43rem;
    height: 0.15rem;
    background: #6e96f3;
    margin-top: -0.15rem;
  }
  .group {
    display: flex;
    margin: 0 auto;
    width:6.9rem;
    justify-content: space-between;
    margin-top: 0.68rem;
    .item {
      flex: 1;
      font-size: 0.6rem;
      font-family: DINPro;
      font-weight: bold;
      color: #d4145a;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      span {
        font-size: 0.3rem;
      }
      .text {
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #362024;
        margin-top:0.27rem;
      }
    }
  }
}



//分享的modal
#shareModel{
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
     bottom: 0;
     width:100%;
     height:4.6rem; 
     background: #fff;
     animation: contentViewKeyAnimation 0.5s;
     overflow: hidden;
     .shareTitle1{
        margin: 0 auto;
        width: 80%;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #343C4C;
        border-bottom: 2px  solid #F7F8FC;
     }
     .shareBoxs{
         margin-left: 0.5rem;
         margin-right: 0.5rem;
         margin-top: 0.4rem;
         height: 1.5rem;
         display: flex;
         align-items: center;
         justify-content: center;
         .shareBoxItem{
             width: 1.6rem;
             height: 1.5rem;
             .logo{
                 margin: 0 auto;
                 width: 1rem;
                 height: 1rem;
                 img{
                     width: 100%;
                     height: 100%;
                 }
             }
             .iteTxt{
                 margin: 0 auto;
                 width: 100%;
                 height: 0.5rem;
                 line-height: 0.5rem;
                 font-size: 0.26rem;
                 font-family: Source Han Sans CN;
                 font-weight: 400;
                 color: #343C4C;
                 text-align: center;
             }
         }
     }
     .qucanlBtn{
         margin-top: 0.5rem;
         width:100%;
         height:1rem;
         background: #F8F8F8;
        line-height: 1rem;
        font-size:0.3rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #343C4C;
        text-align: center;
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

</style>