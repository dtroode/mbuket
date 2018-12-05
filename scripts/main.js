var cart = {};
var seasonCart = {};

function init() {
    $.getJSON("goods.json", goodsOut);
}

function seasonInit() {
    $.getJSON("seasongoods.json", seasonGoodsOut);
}

function seasonTopInit() {
    $.getJSON("seasongoods3.json", seasonGoodsTopOut);
}

function goodsOut(data) {
    out = '';
    for (var key in data) {
        description = '';
        name = '';
        out += '<div class="item">';
        out += '<img data-src="/' + data[key].img + '" class="wow fadeInUp image lazyload" alt="' + data[key].description + '" onclick="imageClick(this)">';
        out += '<p class="name wow fadeInUp">' + data[key].name + '</p>';
        out += '<button class="add-to-cart cart-func wow fadeInUp" onclick="showLink()" data-id="' + key + '">Добавить в корзину</button>';
        out += '</div>';
    }
    $('.goods-out').append(out);
    $('.add-to-cart').on('click', addToCart);
}

function seasonGoodsOut(data) {
    out = '';
    for (var key in data) {
        description = '';
        name = '';
        out += '<div class="item">';
        out += '<img data-src="/' + data[key].img + '" class="wow fadeInUp image lazyload" alt="' + data[key].description + '" onclick="imageClick(this)">';
        out += '<p class="name wow fadeInUp">' + data[key].name + '</p>';
        out += '<button class="add-to-season-cart cart-func wow fadeInUp" onclick="showLink()" data-id="' + key + '">Добавить в корзину</button>';
        out += '</div>';
    }
    $('.season-goods-out').append(out);
    $('.add-to-season-cart').on('click', addToSeasonCart);
}

function seasonGoodsTopOut(data) {
    out = '';
    for (var key in data) {
        description = '';
        name = '';
        out += '<a href="#season" class="scroll-to-season">';
        out += '<img src="/' + data[key].img + '" class="square" alt="' + data[key].description + '" onclick="imageSeasonClick(this)">';
        out += '<p data-id="' + key + '">' + data[key].name + '</p>';
        out += '</a>';
        console.log(data);
    }
    $('.nyi').append(out);
    $('.add-to-season-cart').on('click', addToSeasonCart);
}

function showLink() {
    $('.link-to-cart').css({"display": "block", "bottom": "40px"});
    setTimeout(function(){$('.link-to-cart').css({"opacity": "1"})}, 1000);
    setTimeout(changeTransition, 1100);
}

function showLinkImmediately() {
    if (!isEmpty(cart) || !isEmpty(seasonCart)) {
    } else {
        $('.link-to-cart').css({"display": "block", "opacity": "1", "bottom": "40px"});
        setTimeout(changeTransition, 1100);
    }
}

function changeTransition() {
    $('.link-to-cart').css({"transition": "all ease-in 0.2s", "-webkit-transition": "all ease-in 0.2s", "-moz-transition": "all ease-in 0.2s", "-ms-transition": "all ease-in 0.2s", "-o-transition": "all ease-in 0.2s"})
}

function addToCart() {
    var id = $(this).attr('data-id');
    if (cart[id] == undefined) {
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    saveCart();
}

function addToSeasonCart() {
    var id = $(this).attr('data-id');
    if (seasonCart[id] == undefined) {
        seasonCart[id] = 1;
    } else {
        seasonCart[id]++;
    }
    saveSeasonCart();
}

function saveCart() {
    deleteCookie('cart');
    setCookie('cart', JSON.stringify(cart), '/')
}

function saveSeasonCart() {
    deleteCookie('seasonCart');
    setCookie('seasonCart', JSON.stringify(seasonCart), '/')
}

function deleteCookie(name) {
    var cookieDate = new Date();
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = name += '=; expires=' + cookieDate.toGMTString();
}

function setCookie(name, value, path) {
    document.cookie = name + '=' + escape(value) + ((path) ? "; path=" + path : "");
}

function loadCart() {
    if (getCookie('cart')) {
        cart = JSON.parse(getCookie('cart'));
    }
}
function loadSeasonCart() {
    if (getCookie('seasonCart')) {
        seasonCart = JSON.parse(getCookie('seasonCart'));
    }
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

function imageSeasonClick(e) {
    setTimeout(() => {    
        var img = $(e);
        var src = img.attr('src');
        var name = $(e).next().text();
        var button = $(e).next().attr('data-id');
        var description = img.attr('alt');
        $("body").append("<div class='popup'>" +
            "<div class='popup_bg'>" +
            "<img src='" + src + "' class='popup_img'>" +
            "<div class='popup_description'><h2>" + name + "</h2><p>" + description + "</p><button class='add-to-cart cart-func wow fadeInUp' onclick='showLink()' data-id='" + button + "'>Добавить в корзину</button></div></div></div>");
        $(".popup").fadeIn(200);
        $(".popup_bg").on('click', closeImage);
        $(".popup_description").on('click', preventCloseImage);
        $(".add-to-cart").on('click', addToSeasonCart);
    }, 500);
}

function imageClick(e) {
    var img = $(e);
    var src = img.attr('src');
    var name = $(e).next().text();
    var button = $(e).next().next().attr('data-id');
    var description = img.attr('alt');
    $("body").append("<div class='popup'>" +
        "<div class='popup_bg'>" +
        "<img src='" + src + "' class='popup_img'>" +
        "<div class='popup_description'><h2>" + name + "</h2><p>" + description + "</p><button class='add-to-cart cart-func wow fadeInUp' onclick='showLink()' data-id='" + button + "'>Добавить в корзину</button></div></div></div>");
    $(".popup").fadeIn(200);
    $(".popup_bg").on('click', closeImage);
    $(".popup_description").on('click', preventCloseImage);
    $(".add-to-cart").on('click', addToCart);
}

function closeImage() {
    $(".popup").fadeOut(200);
    setTimeout(function() {
        $(".popup").remove();
    }, 800);
}

function preventCloseImage(event) {
    event.stopPropagation();
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function closeNY() {
    var nYheight = $('.newyear').height()
    $('.newyear').css({
        "top": "-" + nYheight + "px",
        "opacity": "0"
    })
    setTimeout(() => {
        $('.newyear').css({
            "display": "none"
        })
    }, 200);
}

$(document).ready(function () {
    init();
    seasonInit();
    seasonTopInit();
    loadCart();
    loadSeasonCart();
    showPolicyQuestion();
    showLinkImmediately();
});