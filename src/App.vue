<template>
  <div id="app">
    <router-view class="page" v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  computed: {
    // 动态设置过渡样式
    direction: function () {
      const currentPath = this.$route.path;
      const localRoute = (window.myVue && window.myVue.localRoute) || [];
      // console.log(localRoute, currentPath);
      const index = localRoute.indexOf(currentPath);
      let tranName = "";

      if (localRoute.length === 0) {
        tranName = "fade"; // 首页，渐显
      } else if (index >= 0) {
        tranName = "page-back"; // 回退，右划
      } else {
        tranName = "page-go"; // 进入新页面，左划
      }
      return tranName;
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to);
      // console.log(from);
    },
  },
  created() {
    console.log("欢迎访问...");
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less">
#app {
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @colorFont;
  font-size: @fontSizeH3;
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .page {
    transition: all 0.2s ease-in-out;
  }
  .page-go-enter-active {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-to {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-active {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-to {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  @font-face {
    font-family: "iconfont";
    src: url("//at.alicdn.com/t/font_1951478_y78kg6a23us.eot?t=1594992994894");
    /* IE9 */
    src: url("//at.alicdn.com/t/font_1951478_y78kg6a23us.eot?t=1594992994894#iefix")
        format("embedded-opentype"),
      /* IE6-IE8 */
        url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALYAAsAAAAABowAAAKJAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBGIEzATYCJAMICwYABCAFhG0HMBvZBcgusG3Y0waKyXbjIrAzvgU4ARAPn/t9nptkERViy5LIIShUK0wds14l+8fXAXok/QbPLfCkb+AS3/ayBH0TvYkq6Af7/c/ppYTC9Z1QJRlVIgWbDd7/4WuAhJqV85NL0y/xutky4HL6LaBA5gHlMsfkMSkOLA1ob4wiK5HcUxFvl9ODfkyg2RAe3HZ6vKGnwKpALLrSgF4hqChyplGobzhYxH11GtON9Az3ou/HV6ujR1KXoWbP2aMNmw/HKSefr847ERBCBP54HTIWAIU40JjcpSlkOtacbBkDjlUZfFhVgVkc9c8T9VDeCgY44TOJPPGjlidQktHlgN2TbiCNtaa/T7x6dejFiwPnr/XBnLpq4evXh1++PJi6Xr06qfGbeebE+7f21baKxE9mJ+IFl6Kzqmr/X1nueNKxbaZN89Lz50uZ43E8X1jSxZPmmtqvMDXtrBAvGFB2ZhNgA1DVMv+bTaAgWPxnqOm6/41cAe/9kchf1YphbtB4Nlfw10QDu4olgSkVQ9ToTpZPiic0U4QKvN2+qdq+W7SHxoJIRtJgEFmjCVKhLaBOi7Wo12gjms0zj7foEWqK0oQ5CUPoNCJp9xRZp4lUaC/q9PtRrzOaaHYoei5sMRXuYGtCRkY2kho9iyPhWrJBXPkkmQdGkpdEjG9KUjeCynxZzpwpomSJLVEh13Em0E44RIM9R0HA6CfskZXN3Sz7qNJCNL1pTjmEga0SxJAhNkTUkMfCIiIYnhlUPv9EpFzAkHTUNbm/kUTKHR8pRPIA0lkZDap7lFciBWktlhGQLcFCyGDzSCDAkN88z0MsmTl3QvxDJVE/e6hyvr06/IECuQnoUtCsrP4cR9LJAQAAAAA=")
        format("woff2"),
      url("//at.alicdn.com/t/font_1951478_y78kg6a23us.woff?t=1594992994894")
        format("woff"),
      url("//at.alicdn.com/t/font_1951478_y78kg6a23us.ttf?t=1594992994894")
        format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url("//at.alicdn.com/t/font_1951478_y78kg6a23us.svg?t=1594992994894#iconfont")
        format("svg");
    /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-yonghu:before {
    content: "\e65b";
  }
}
</style>
