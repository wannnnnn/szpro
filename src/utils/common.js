
  /**
   * 是否是一个网址
   * @param url 
   */
  export function isUrl(url) {
    if(url.startsWith('http://') || url.startsWith('https://')){
      return url;
    }else{
      return 'https://long-img-test.oss-cn-beijing.aliyuncs.com/'+url;
    }
  };

  export function isWechat () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

