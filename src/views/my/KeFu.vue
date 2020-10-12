<template>
      <div class="page">
           <Header title="在线客服" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
                  <div class="tip">
                      <div class="icon"><img src="../../assets/img/kefu/success.png" alt=""></div>
                      <div class="title">此二维码已经通过验证,可以放心扫码</div>
                  </div> 
                  <div class="logo"><img src="../../assets/img/kefu/logo.png" alt=""></div>
                  <div class="kefuWX">在线客服（微信：{{wxName}}）</div>
                  <div class="kefuDes">工作时间：周一到周日9:00-21:00</div>
                  <div class="qrCodeBox">
                     <div class="code" ref="code"></div>
                  </div>
                  <div class="copyBtn" v-clipboard:copy="wxName" v-clipboard:success="onCopy" v-clipboard:error="onError">
                      <div class="btnTxt">复制微信号并打开微信</div>
                  </div>
                  <!-- end -->
            </div> 
      </div>

      
</template>


<script>
import Header from './common/NavView';
let QRCode = require('js-qrcode');
import VueClipboard from 'vue-clipboard2';
import {Toast} from "mint-ui";
export default {
    name: "kefu",
    components: {
        Header
    },
    data(){
        return{
           wxName:'1234578',
        }
    },
    mounted(){
       this.makeCode(this.wxName);
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         onCopy: function (e) {
              Toast("复制成功");  
		},
		onError: function (e) {
            Toast("复制失败");  
		},
         makeCode(text){
			let dom=this.$refs.code;
			var qr = new QRCode(dom, {
				width: 168,
				height: 168
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
    background: #fff;
    .tip{
        width:100%;
        height: 0.6rem;
        background: rgba(122, 192, 105, 0.37);
        border: 1px solid #7AC069;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon{
            width: 0.27rem;
            height: 0.27rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            margin-left: 0.2rem;
            height: 0.3rem;
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #7AC069;

        }
    }
    .logo{
         margin: 0 auto;
         margin-top: 0.88rem;
         width: 2.33rem;
         height: 2.33rem;
         img{
             width: 100%;
             height: 100%;
         }
    }
    .kefuWX{
        margin: 0 auto;
        width:100%;
        height:0.4rem;
        font-size: 0.36rem;
        font-weight: 500;
        color: #0B0C12;
        text-align: center;
    }
    .kefuDes{
        margin: 0 auto;
        margin-top: 0.36rem;
        width:100%;
        height:0.4rem;
        font-size:0.3rem;
        line-height: 0.4rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: #5A6375;

    }
    .qrCodeBox{
             margin: 0 auto;
             margin-top: 0.56rem;
             width: 3.4rem;
             height: 3.4rem;
    }
    .copyBtn{
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