<template>
    <div class="app-tabbar">
          <!-- 首页 -->
          <div class="tabbar-item" @click="itemAction(0)">
                <div class="tabbar-logo" >
                      <img style="width:0.4rem;height:0.39rem;" src="../../assets/img/icon/home-active.png"  v-if="index==0">
                      <img style="width:0.4rem;height:0.39rem;" src="../../assets/img/icon/home.png"  v-else>
                </div>
                <div class="tabbarTitle" :class="{titleAct:index==0}">首页</div>
          </div>
         
           <!-- 云算力 -->
          <div class="tabbar-item" @click="itemAction(1)">
                <div class="tabbar-logo" >
                      <img style="width:0.41rem;height:0.4rem;" src="../../assets/img/icon/mall-active.png"  v-if="index==1">
                      <img style="width:0.41rem;height:0.4rem;" src="../../assets/img/icon/mall.png"  v-else>
                </div>
                <div class="tabbarTitle" :class="{titleAct:index==1}">产品</div>
          </div>
           <!-- 奖励池 -->
          <div class="tabbar-item" @click="itemAction(2)">
                <div class="tabbar-logo" >
                      <img style="width:0.35rem;height:0.38rem;" src="../../assets/img/icon/awardPool-active.png"  v-if="index==2">
                      <img style="width:0.35rem;height:0.38rem;" src="../../assets/img/icon/awardPool.png"  v-else>
                </div>
                <div class="tabbarTitle" :class="{titleAct:index==2}">奖励池</div>
          </div>

            <!-- 首页 -->
          <div class="tabbar-item" @click="itemAction(3)">
                <div class="tabbar-logo" >
                      <img style="width:0.39rem;height:0.29rem;" src="../../assets/img/icon/my-active.png"  v-if="index==3">
                      <img style="width:0.39rem;height:0.29rem;" src="../../assets/img/icon/my.png"  v-else>
                </div>
                <div class="tabbarTitle" :class="{titleAct:index==3}">我的</div>
          </div>

         
    </div>
</template>

<script>
export default {
  name: "app-tabbar",
  props: {
    tabIndex: {
      type: Number,
      required: true
    }
  },
  data() {
      return {
          index: 0,
      }
  },
  created(){
    this.index = this.tabIndex;
  },
  methods: {
    itemAction(index) {
      this.index = index;
      this.$emit("tabAction", index);
      console.log('index'+index)
    }
  }
};
</script>
<style scoped lang='less'>
.app-tabbar {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.04rem;
  display: flex;
  align-items: center;
  position: fixed;
  background: white;
  border-top: 0.01rem solid #dcdcdc;
  z-index:1000;
  .tabbar-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //顶部的logo
    .tabbar-logo {
      width: 0.8rem;
      height: 0.5rem;
      margin-top: 0.1rem;
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        margin: 0 auto;
        width: 0.36rem;
        height: 0.38rem;
      }
    }
    .tabbarTitle {
      margin-top: 0.05rem;
      width: 100%;
      height: 0.3rem;
      text-align: center;
      line-height: 1;
      font-size: 0.2rem;
      color: #999;
    }
    //选中
    .titleAct {
      color: rgba(0, 147, 255, 1);
    }
  }
}
</style>