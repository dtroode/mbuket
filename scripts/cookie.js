function deleteCookie(name) {
  var cookieDate = new Date();
  cookieDate.setTime(cookieDate.getTime() - 1);
  document.cookie = name += '=; expires=' + cookieDate.toGMTString();
}

function setCookie(name, value, path) {
  document.cookie = name + '=' + escape(value) + ((path) ? "; path=" + path : "");
}

function getCookie(name) {
  var cookie = ' ' + document.cookie;
  var search = ' ' + name + '=';
  var setStr = null;
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
      offset = cookie.indexOf(search);
      if (offset != -1) {
          offset += search.length;
          end = cookie.indexOf(';', offset)
          if (end == -1) {
              end = cookie.length;
          }
          setStr = unescape(cookie.substring(offset, end));
      }
  }
  return(setStr);
}