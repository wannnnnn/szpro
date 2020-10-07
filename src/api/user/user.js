import { request } from "../request";
export function getAssets(params) {
  return request({
    url: "user/assets",
    method: "get",
    params
  });
}
export function getInvite_code(params) {
  return request({
    url: "user/invite_code",
    method: "get",
    params
  });
}
export function getUseInfo(params) {
  return request({
    url: "user/info",
    method: "get",
    params
  });
}
