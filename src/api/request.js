import store from "../store/index";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import { Toast } from "vant";
import Vue from 'vue';
const request = axios.create({
  baseURL: "http://112.125.27.11/api/v1/", //网络请求
  // baseURL:'/api',//本地json数据
  timeout: 5000
});

//2axios拦截器
//2.1请求拦截
request.interceptors.request.use(
  
  config => {
    Vue.loading();
    //此处拦截了config
    let token = getToken();
    if (token) {
      config.headers["token"] = getToken();
    }
    //返回config
    return config;
  },
  error => {
    console.log(error);
  }
);
//2.2响应拦截
request.interceptors.response.use(
  res => {
    Vue.loading.end();
    if (res.data.Code != 0) {
      Toast({
        message: res.data.Msg || "Error",
        type: "error",
        duration: 1000
      });
      if (res.data.Code == 2000) {
        removeToken();
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      }
    }
    return res;
  },
  err => {
    Toast.fail("系统异常");
    console.log(err);
  }
);

export default request;

