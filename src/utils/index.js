// 防抖
export function debounce(func, wait, immediate = true) {
  let timer = null;
  const _debounce = function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (!timer) { // null
        func.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait)
    }
  }
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }
  return _debounce;
}

// 节流
export function throttle(func, wait, options = {}) {
  let timer = null;

  const _throttle = function (...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait)
    }
  }
  return _throttle;
}
// 禁止浏览器返回键
export function unretrun() {
  history.pushState(null, null, document.URL);
  window.addEventListener("popstate", function (e) {
    history.pushState(null, null, document.URL);

  }, false);
}
