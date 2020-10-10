<template>
  <div class="navView">
        <div class="left" @click="handleLeft()">
             <img src="../../../assets/img/back_02.png" alt="">
        </div>
        <div class="center">{{title}}</div>
        <div class="righteItems" v-show="isShowRight" @click="handleShare()">
             <div class="innerIcon"><img src="../../../assets/img/friends/share_icon.png" alt=""></div>
        </div>
        <div class="widthWorthItem" v-show="isShowWithDrawl"  @click="handleWithDrawl()">
            提币记录
        </div>
        <div class="widthWorthItem" v-show="isShowCharge"  @click="handleCharge()">
            充值记录
        </div>
  </div>
</template>
<script>
export default {
    name:'navView',
    props:{
        title:{
             type:String,
             default:''
        },
        isShowRight:{
            type:Boolean,
            default:false,
        },
        isShowWithDrawl:{
            type:Boolean,
            default:false,
        },
        isShowCharge:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
         handleLeft() {
             this.$emit("handleLeft");
         },
         handleShare(){
             this.$emit("handleShare");
         },
         handleWithDrawl(){
             this.$emit("handleWithDrawl");
         },
         handleCharge(){
             this.$emit("handleCharge");
         }
    }
}
</script>
<style scoped lang="scss">
.navView{
    width: 100%;
    height: 1.04rem;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
    border-bottom: 0.01rem solid #dcdcdc;
    position: relative;
    //左边的
   .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.8rem;
        height: 100%;
        display: flex;
        align-items: center;
        img {
            width: 0.22rem;
            height: 0.38rem;
            display: block;
            margin-left: 0.2rem;    
        }   
  }
  //中间部分
  .center {
        position: absolute;
        top: 0;
        left: 50%;
        width:4.7rem;
        height: 100%;
        margin-left: -2.35rem;
        line-height: 1.04rem;
        text-align: center;
        color: #383B45;
        font-weight: 600;
        font-size: 0.34rem;
  }
  .righteItems{
        position: absolute;
        top: 0;
        right: 0.3rem;
        width: 0.8rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .innerIcon{
             width: 0.3rem;
             height: 0.3rem; 
             display: flex;
             align-items: center;
             justify-content: center;
             img {
                width: 100%;
                height: 100%;   
             }   
        }
  }
  .widthWorthItem{
        position: absolute;
        top: 0;
        right: 0.3rem;
        width: 1.5rem;
        height: 100%;
        line-height: 1.04rem;
        font-size: 0.3rem;
        text-align: center;
        overflow: hidden;
  }
 
}
</style>