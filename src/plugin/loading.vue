<template>
  <transition :name="animateName">
    <div class="loadings" v-show="isShow">
        <div class="loadingBox">
            <img src='../assets/img/loading.svg' class="loading" alt="loading"/>
        </div>
    </div>
  </transition>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        isShow: false,
        hasAnimate: true,
      }
    },
    computed: {
      /**
       * 动画效果样式，没有返回空
       * @return {String} 样式
       */
      animateName() {
        return this.hasAnimate ? 'opacity' : ''
      },
    },
    methods: {
      /**
       * 开启动画效果
       */
      opemAnimate() {
        this.hasAnimate = true
      },
      /**
       * 去除动画效果
       * @return {Promise} 返回promise
       */
      removeAnimate() {
        return new Promise((resolve) => {
          this.hasAnimate = false
          resolve()
        })
      },
      /**
       * 显示动画loading
       */
      show() {
        this.isShow = true
      },
      /**
       * 隐藏动画loading
       */
      hide() {
        this.isShow = false
      },
    },
  }
</script>

<style lang="less" scope>

    .loadings {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: transparent;
        display: flex;;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        &>.loadingBox{
            width:100px;
            height:100px;
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            display: flex;;
            justify-content: center;
            align-items: center;
            z-index: 20000;
            &>.loading{
                animation: loading-spin infinite 1s linear;
                height: 28px;
            }
        }
        
    }

    @keyframes loading-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
	}
</style>