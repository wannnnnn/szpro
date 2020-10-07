import { request } from "../request";
//登录
export function getLogin(data) {
  return request({
    url: "account/login",
    method: "post",
    data
  });
}
//验证码
export function getCode(data) {
  return request({
    url: "account/send_code",
    method: "post",
    data
  });
}
//重置密码
export function resetPwd(data) {
  return request({
    url: "account/find_pwd",
    method: "post",
    data
  });
}
//注册
export function register(data) {
  return request({
    url: "/account/register",
    method: "post",
    data
  });
}
