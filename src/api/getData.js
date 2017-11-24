const getData = function(url, method = 'get', queryObj) {

  // 解析 URL
  if (typeof method !== 'string') {
    queryObj = method;
    method = 'get';
  }
  if (queryObj && Object.prototype.toString.call(queryObj) == '[object Object]') {
    let keyArr = Object.keys(queryObj);
    let len = keyArr.length;
    let queryStr = '';
    for (let i = 0; i < len; i++) {
      queryStr += encodeURIComponent(keyArr[i]) + '=' + encodeURIComponent(queryObj[keyArr[i]]);
      if (i + 1 != len) {
        queryStr += '&';
      }
    }
    if (url.charAt(url.length - 1) != '?') {
      url += '?';
    }
    url += queryStr;
  }

  return new Promise(function(resolve, reject) {

    let request = new XMLHttpRequest();

    request.onload = function() {
      resolve(this.responseText);
    };

    request.onerror = reject;
    request.open(method, url);
    request.send();
  });
}
