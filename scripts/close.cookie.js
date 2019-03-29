function showPolicyQuestion() {
    var policy = getCookie('policy');
    if (policy == 'yes') {
        $('.cookie').css({
            "display": "none"
        })
    } else {
        $('.cookie').css({
            "display": "block"
        })
    }
}

function closeCookie() {
  var windowWidth = $("body").width();
  if (windowWidth <= 992) {
      $('.cookie').css({
          "opacity": "0"
      })
  } else {
      $('.cookie').css({
          "right": "-200px",
          "box-shadow": "none"
      });
  }
  setTimeout(() => {
      $('.cookie').css({
          "display": "none"
      })
  }, 500);
  setCookie('policy', 'yes', '/');
}

$(document).ready(function() {
    showPolicyQuestion();
})