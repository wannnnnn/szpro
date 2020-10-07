<template>
  <div class="navView">
        <div class="left" @click="handleLeft()">
             <img src="../../../assets/img/back_02.png" alt="">
        </div>
        <div class="center">{{title}}</div>
  </div>
</template>
<script>
export default {
    name:'navView',
    props:{
        title:{
             type:String,
             default:''
        }
    },
    methods:{
         handleLeft() {
             this.$emit("handleLeft");
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
 
}
</style>