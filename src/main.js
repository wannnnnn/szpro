/**
 * @description: 项目入口文件
 * 
 */
import './utils/rem';
import Vue from 'vue';
import App from './App.vue';
import router from './routers/';
import store from './stores';

import * as filters from './filters/';

import Echarts from "echarts";
Vue.prototype.$echarts = Echarts;

Vue.isCordova = window.location.protocol.match(/^file/)

import './styles/main.less';

// import Vant from 'vant';
// import 'vant/lib/index.css';

import VueLoading from './plugin/loading'
Vue.use(VueLoading, {
    container: '',
})



import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.config.errorHandler = (err, vm, info) => {
  console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';


import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
require("swiper/swiper-bundle.min.css");


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

window.EventBus = new Vue();



// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

window.myVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
