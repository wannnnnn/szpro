<template>
  <div class="appDownload" :style="{width:appWidth+'px',height:appHeight+'px'}">
       <div class="wrapBg">
            <div class="topBnner">
                <div class="topLeftBanner"><img src="../../assets/img/download/pattern-left-1.png" alt=""></div>
                <div class="topRightBanner"><img src="../../assets/img/download/pattern-right-1.png" alt=""></div>
            </div>
       </div>
       <div class="wrapTxt">
            <div class="logo">
                <img src="../../assets/img/my/app_download_icon.png" alt="" />
            </div>
            <!-- <div class="appLogoTitle">合盈矿池</div> -->
            <div class="downloadBox">
                    <a href="http://112.125.27.11/hyys.apk" class="downAndroid"  style="width:80%;">
                        <div class="LeftIcon">
                            <img src="../../assets/img/download/android.png" >
                        </div>
                        <div class="appText">
                              <div class="appTxt1">Android 版下载</div>
                              <div class="appTxt2">版本号：1.0.1&nbsp;&nbsp;大小：3.98M</div>
                        </div>
                    </a>
            </div>

            <div class="copyRight">
                CopyRight © 2020 IPFS.SO 合盈云算™ <br>All Rights Reserved.
            </div>
       </div>

        <!-- 浏览器打开 -->
         <div id="browerModal" v-show="isShowBrowerModal">
               <div class="modelContent">
                     <img src="../../assets/img/download/download_wxshow.png" >
               </div>
               <div class="maskView" ></div>
         </div>

  </div>
</template>

<script>
export default {
  name: "appDownload",
  data() {
    return {
        url:'',
        appWidth:100,
        appHeight:100,
        isShowBrowerModal:true,
        isWeChat:false,
    };
  },
  components:{
    //   Button
  },
  mounted(){
       this.appWidth = document.documentElement.clientWidth;
       this.appHeight = document.documentElement.clientHeight;

        var ua = window.navigator.userAgent.toLowerCase();
        const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //微信
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
             //ios
             if (isiOS) {
                this.isShowBrowerModal = false;
             } 
             //android 
             else {
                this.isShowBrowerModal = true;
             }
        } 
        //非微信
        else {
              this.isShowBrowerModal = false;
        }

       
  },
  methods: {
      isMobile() {
            let flag = navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            return flag;
      }
  }
};
</script>
<style scoped lang="scss">
// @import "assets/style/common";
.appDownload {
  background-color: #fff;
//   background: url(../../assets/img/register_bg.png) no-repeat center; 
//   background-size: 100% 100%;
  position: relative;
   overflow: hidden;
}
.wrapBg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .topBnner{
        width: 100%;
        height: 5rem;
        .topLeftBanner{
            float: left;
            width: 1.56rem;
            height: 5rem;
            img{
                width: 100%;
                height: 100%;
            } 
        }
        .topRightBanner{
            float: right;
            width: 1.56rem;
            height: 5rem;
            img{
                width: 100%;
                height: 100%;
            } 
        }
    }
}
.wrapTxt{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
     .logo {
        margin: 0 auto;
        margin-top: 3.2rem;
        width: 2.24rem;
        height: 2.24rem;
        border: 0.05rem solid #F5F5F5;
        border-radius:50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .appLogoTitle{
        margin: 0 auto;
        margin-top: 0.3rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.34rem;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #121319;
    }
    .downloadBox{
         margin: 0 auto;
         margin-top: 0.5rem;
         width: 100%;
         overflow: hidden;
         .downAndroid {
            border: 1px solid #ccc;
            border-radius:0.1rem;
            display: table;
            height:1.2rem;
            overflow: hidden;
            margin: 0 auto;
            width: 60%;
            background: #09f;
            .LeftIcon{
                height: 100%;
                width: 0.8rem;
                overflow: hidden;
                float: left;
                margin-left: 0.5rem;
                display: flex;
                align-items: center;
                img{
                    width: 0.6rem;
                    height: 0.6rem;
                }
            }
            .appText{
                float: left;
                margin-left: 0.2rem;
                height: 100%;
                color: #fff;
                .appTxt1{
                    margin-top: 0.2rem;
                    line-height: 0.4rem;
                    height: 0.4rem;
                    font-size: 0.26rem;
                    text-align: left;
                    overflow: hidden;
                }
                .appTxt2{
                     line-height: 0.4rem;
                    height: 0.4rem;
                    font-size: 0.26rem;
                    text-align: left;
                     overflow: hidden;
                }
            }
        }
    }

    .copyRight{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.8rem;
        font-size: 0.24rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999999;
        line-height: 0.3rem;

    }
}

//浏览器打开的modal
#browerModal{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .modelContent{
      position: absolute;
      right: 0.29rem;
      top: 1.29rem;
      width: 6.2rem;
      height: 5.56rem;
      overflow: hidden;
      img{
          width: 100%;
          height: 100%;
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
