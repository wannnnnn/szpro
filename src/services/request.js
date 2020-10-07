import axios from "axios";
import {
  Toast
} from "mint-ui";

import router from '@/routers';

const request = axios.create({
  /**
   * 开发环境 => 使用代理
   * 线上环境 => 使用 process.env.VUE_APP_API_URL
   */
  baseURL: (process.env.NODE_ENV === 'production') ? process.env.VUE_APP_API_URL : '',
  withCredentials: true
});

request.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => {
    Toast(err.msg || 'HTTP请求发生异常!');
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    let res = response.data || {};
    // res.status == 20606 || 
    if (res.errCode == 20606) {
      // router.push({ path: '/login' });
      // localStorage.clear();
      localStorage.removeItem('res');
      router.push({
        path: '/login'
      });
    }

    // if (res.status != 0 && res.status != "ok") {
    //   Toast(res.msg || '暂无数据');
    // }

    return Promise.resolve(res);
  },
  (error) => {
    Toast(error || 'HTTP请求发生异常!');
    return Promise.resolve({
      status: -1
    });
  }
);

export default request;
