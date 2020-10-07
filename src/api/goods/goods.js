import { request } from "../request";
//充值记录
export function getRecord(params) {
  return request({
    url: "deposit/list",
    method: "get",
    params
  });
}
//购买记录
export function getBuyRecord(params) {
  return request({
    url: "power/list",
    method: "get",
    params
  });
}
//购买算力
export function getOrder(data) {
  return request({
    url: "power/buy",
    method: "post",
    data
  });
}
//下单页面初始化
export function getPrice(params) {
  return request({
    url: "power/price",
    method: "get",
    params
  });
}
//提交充值
export function depositCommit(data) {
  return request({
    url: "deposit/commit",
    method: "post",
    data
  });
}
