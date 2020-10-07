<template>
  <div class="mallProgress">
        
        <div class="progressBox">
            <div class="realProgress"></div>
        </div>
        <div class="progressTipBox">32.6%</div>
  </div>
</template>
<script>
export default {
    name:'mallProgress',
    props:{
        progress:{
             type:Number,
             default:0.0
        }
    }
}
</script>
<style scoped lang="scss">
.mallProgress{
    width: 100%;
    height: 100%;
    position: relative;
    .progressBox{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.1rem;
        border-radius:0.05rem;
        background: #EFF5FF;
        overflow: hidden;
        .realProgress{
            width:0.96rem;
            height: 0.1rem;
            background: linear-gradient(0deg, #2F79F4, #83C3FF);
             border-radius:0.05rem;
            overflow: hidden;
        }
    }
    .progressTipBox{
          position: absolute;
          left: 0.5rem;
          top: 0.16rem;
          width: 0.96rem;
          height: 0.54rem;
          background: url(../../assets/img/orders/rediu@2x.png) no-repeat;
          background-size: 100% 100%;
         line-height: 0.42rem;
         font-size:0.2rem;
         font-family: Source Han Sans CN;
         font-weight: 400;
         color: #FFFFFF;
    }
}
</style>