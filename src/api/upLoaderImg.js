//upLoaderImg.js
import axios from "axios"; //引入axios
import { Toast } from "mint-ui"; //引入Toast
import { getToken } from "../utils/auth";
import store from "../store/index";
function upLoaderImg(file) {
  //file为 你读取成功的回调文件信息
  //new 一个FormData格式的参数
  let params = new FormData();
  params.append("file", file);

  

  let config = {
    headers: {
      //添加请求头
      "Content-Type": "multipart/form-data",
      "token":getToken()
    }
  };
  return new Promise((resolve, reject) => {
    var base_url  ="http://112.125.27.11/api/v1/user/upload_pic";//网络请求
    //192.168.1.124:5002
    // base_url = "http://192.168.0.106:5002/api/v1/";//网络请求

    //把 uploadUrl 换成自己的 上传路径
    axios
      .post(base_url, params, config)
      .then(res => {
        if (res && res.data && res.data.Code === 0) {
          //如果为真 resolve出去
          resolve(res.data);
        } else {
          //否则 Toast 提示
          Toast({
            message: res.data.Msg || "Error",
            type: "error",
            duration: 1000
          });
          reject(res.data);
        }
      })
      .catch(err => {
        Toast.fail("系统异常");
        reject(err);
      });
  });
}
export default upLoaderImg;
