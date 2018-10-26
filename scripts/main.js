var cart = {};

function init() {
    $.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
    console.log(data);
    out = '';
    for (var key in data) {
        description = '';
        name = '';
        out += '<div class="item">';
        out += '<img src="/' + data[key].img + '" class="wow fadeInUp image" alt="' + data[key].description + '" onclick="imageClick(this)">';
        out += '<p class="name wow fadeInUp">' + data[key].name + '</p>';
        out += '<button class="add-to-cart cart-func wow fadeInUp" onclick="showLink()" data-id="' + key + '">Добавить в корзину</button>';
        out += '</div>';
    }
    $('.goods-out').append(out);
    $('.add-to-cart').on('click', addToCart);
}

function showLink() {
    $('.link-to-cart').css({"opacity": "1", "bottom": "80px"});
    setTimeout(changeTransition, 1000);
}

function showLinkImmediately() {
    if (!isEmpty(cart)) {
    } else {
        $('.link-to-cart').css({"opacity": "1", "bottom": "80px"});
        setTimeout(changeTransition, 1000);
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

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
    }
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

$(document).ready(function () {
    init();
    loadCart();
    showLinkImmediately();
});