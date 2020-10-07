// 时间戳转换成日期格式
export function formateDate(timestamp, format) {
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  if (!timestamp) {
    return ''
  }
  timestamp = timestamp.toString()
  // 如果时间戳后不是毫秒值就加000,变成毫秒值
  // if (timestamp && timestamp.length == 10) { timestamp = parseInt(timestamp+'000'); }
  if (timestamp && timestamp.length != 13) {
    if (timestamp && timestamp.length == 10) {
      timestamp = parseInt(timestamp + '000')
    }
    for (var i = 0; i < 13; i++) {
      if (timestamp.length === i) {
        timestamp = parseInt(timestamp * (10 ^ (13 - i)))
      }
    }
  }
  var date = new Date(parseInt(timestamp))
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

// 左边补0函数
export function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
