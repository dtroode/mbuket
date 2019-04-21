var cart = {};
var seasonCart = {};
var todayDate = new Date();
var todayMonth = todayDate.getMonth()+1;



function logSeason() {
    var todayBouquets = '';
    if (todayMonth == 12 || todayMonth <= 2) {
        todayBouquets = 'Зимние'
    } else if (todayMonth >= 3 || todayMonth <= 5) {
        todayBouquets = 'Весенние'
    } else if (todayMonth >= 6 || todayMonth <= 8 ) {
        todayBouquets = 'Летние'
    } else {
        todayBouquets = 'Осенние'
    }
    $('.season-name').append(todayBouquets);
}

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
        name = '';
        out += '<div class="item">';
        out += '<img data-src="/' + data[key].img + '" class="wow fadeInUp image lazyload" alt="' + data[key].name + '" onclick="imageClick(this)">';
        out += '<p class="name wow fadeInUp">' + data[key].name + '</p>';
        out += '<p class="cost name wow fadeInUp">'+ data[key].cost+ ' ₽'+'</p>';
        out += '<button class="add-to-cart cart-func wow fadeInUp" onclick="showLink()" data-id="' + key + '">Добавить в корзину</button>';
        out += '<hr>';
        out += '</div>';
    }
    $('.goods-out').append(out);
    $('.add-to-cart').on('click', addToCart);
}

function seasonGoodsOut(data) {
    out = '';
    for (var key in data) {
        name = '';
        out += '<div class="item">';
        out += '<img data-src="/' + data[key].img + '" class="wow fadeInUp image lazyload" alt="' + data[key].name + '" onclick="imageClick(this)">';
        out += '<p class="name wow fadeInUp">' + data[key].name + '</p>';
        out += '<p class="cost name wow fadeInUp">'+ data[key].cost+ ' ₽'+'</p>';
        out += '<button class="add-to-season-cart cart-func wow fadeInUp" onclick="showLink()" data-id="' + key + '">Добавить в корзину</button>';
        out += '<hr>'
        out += '</div>';
    }
    $('.season-goods-out').append(out);
    $('.add-to-season-cart').on('click', addToSeasonCart);
}

function seasonGoodsTopOut(data) {
    out = '';
    for (var key in data) {
        name = '';
        out += '<a href="#season" class="scroll-to-season">';
        out += '<img src="/' + data[key].img + '" class="square" alt="' + data[key].name + '" onclick="imageClick(this)">';
        out += '<p data-id="' + key + '">' + data[key].name + '</p>';
        out += '</a>';
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
    if (!isEmpty(cart) && !isEmpty(seasonCart)) {
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

function imageClick(e) {
    var img = $(e);
    var src = img.attr('src');
    var name = $(e).next().text();
    var button = $(e).next().next().attr('data-id');
    $("body").append("<div class='popup'>" +
        "<div class='popup_bg'>" +
        "<img src='" + src + "' class='popup_img'>" +
        "<div class='popup_description'><h3>" + name + "</h3><button class='add-to-cart cart-func wow fadeInUp' onclick='showLink()' data-id='" + button + "'>Добавить в корзину</button></div></div></div>");
    $("html").css({"overflow-y": "hidden"});
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
    $("html").css({"overflow-y": "scroll"});
}

function preventCloseImage(event) {
    event.stopPropagation();
}

function isEmpty(object) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) return true;  
        return false;
    }
}

$(document).ready(function() {
    init();
    seasonInit();
    seasonTopInit();
    logSeason();
    loadCart();
    loadSeasonCart();
    showLinkImmediately();
});