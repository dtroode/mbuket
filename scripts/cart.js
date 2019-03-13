var cart = {};
var seasonCart = {};
var todayDate = new Date();
var todayMonth = todayDate.getMonth()+1;

function logSeason() {
    var todayBouquets = '';
    if (todayMonth == 12 || todayMonth <= 2) {
        todayBouquets = 'Зимняя'
    } else if (todayMonth >= 3 || todayMonth <= 5) {
        todayBouquets = 'Весенняя'
    } else if (todayMonth >= 6 || todayMonth <= 8 ) {
        todayBouquets = 'Летняя'
    } else {
        todayBouquets = 'Осенняя'
    }
    return todayBouquets;
}

function loadCart() {
    if (getCookie('cart') || getCookie('seasonCart')) {
        cart = JSON.parse(getCookie('cart'));
        seasonCart = JSON.parse(getCookie('seasonCart'));
        showCart();
    } else {
        $('.cart-place').html('<div class="big-div"><h1 class="biggy">Корзина пуста</h1></div><div class="zind"><h2>Корзина пуста</h2><picture><source srcset="/images/webp/cart-empty.webp" type="img/webp"><img class="emoji" src="/images/png/cart-empty.png" alt="😮"><picture><p class="empty-cart">Вы можете перейти <a class="nlink" href="https://masterbuket.com/#product">на главную страницу</a>, чтобы добавить товары в корзину</p></div>');
        $('.total').css({"display": "none"});
        getCookie('cart');
        deleteCookie('cart');
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

function setCookie(name, value, path) {
    document.cookie = name + '=' + escape(value) + ((path) ? "; path=" + path : "");
}

function showCart() { 
    var num = 0;
    if (isEmpty(cart) && isEmpty(seasonCart)) {
        $.getJSON('/goods.json', function(data) {
            var goods = data;
            var out = '';
            out += '<div class="big-div"><h1 class="biggy">Корзина</h1></div><div class="zind"><h2>Корзина</h2><picture><source srcset="/images/webp/cart.webp" type="img/webp"><img class="emoji emb" src="/images/png/cart.png" alt="😉"></picture></div>'
            for (var id in cart) {
                out += '<div class="item">';
                out += '<img src="/'+ goods[id].img +'" class="wow fadeInUp image" onclick="imageClick(this)" alt="' + goods[id].name + '">';
                out += '<p class="name wow fadeInUp">'+ goods[id].name +'</p>';
                out += '<p class="cost name wow fadeInUp">'+ cart[id] * goods[id].cost + ' ₽'+'</p>';
                out += '<div class="button-container wow fadeInUp">';
                out += '<button data-id="'+ id +'" class="del-goods remove-fr-cart cart-func">Удалить</button>';
                out += '<button data-id="'+ id +'" class="minus-goods remove-fr-cart cart-func">-</button>';
                out += '<button data-id="'+ id +'" class="plus-goods remove-fr-cart cart-func">+</button>';
                out += '<p class="number">'+ cart[id]+'</p>';
                out += '</div>';
                out += '<hr>';
                out += '</div>';
                num += goods[id].cost * cart[id];
                $('.total').html('<h2>Итого:</h2><picture><source srcset="/images/webp/slightly.webp" type="img/webp"><img class="emoji emb" src="/images/png/slightly.png" alt="🙂"></pciture><p class="name pmb">' + num + ' рублей</p>');
            }
            $('.cart-place').html(out);
            $('.del-goods').on('click', deleteGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
        $.getJSON('/seasongoods.json', function(data) {
            var seasonGoods = data;
            var out = '';
            out += '<div class="big-div"><h1 class="biggy"><span class="season-name">' + logSeason() + '</span> корзина</h1></div><div class="zind"><h2><span class="season-name">' + logSeason() + '</span> корзина</h2><picture><source srcset="/images/webp/cart.webp" type="img/webp"><img class="emoji emb" src="/images/png/cart.png" alt="😉"></picture></div>'
            for (var id in seasonCart) {
                out += '<div class="item">';
                out += '<img src="/'+seasonGoods[id].img +'" class="wow fadeInUp image" onclick="imageClick(this)" alt="' + seasonGoods[id].name + '">';
                out += '<p class="name wow fadeInUp">'+seasonGoods[id].name +'</p>';
                out += '<p class="cost name wow fadeInUp">'+seasonCart[id] * seasonGoods[id].cost + ' ₽'+'</p>';
                out += '<div class="button-container wow fadeInUp">';
                out += '<button data-id="'+ id +'" class="del-season-goods remove-fr-cart cart-func">Удалить</button>';
                out += '<button data-id="'+ id +'" class="minus-season-goods remove-fr-cart cart-func">-</button>';
                out += '<button data-id="'+ id +'" class="plus-season-goods remove-fr-cart cart-func">+</button>';
                out += '<p class="number">'+seasonCart[id]+'</p>';
                out += '</div>';
                out += '<hr>';
                out += '</div>';
                num += seasonGoods[id].cost * seasonCart[id];
                $('.total').html('<h2>Итого:</h2><picture><source srcset="/images/webp/slightly.webp" type="img/webp"><img class="emoji emb" src="/images/png/slightly.png" alt="🙂"></pciture><p class="name pmb">' + num + ' рублей</p>');
            }
            $('.season-cart-place').html(out);
            $('.del-season-goods').on('click', deleteSeasonGoods);
            $('.plus-season-goods').on('click', plusSeasonGoods);
            $('.minus-season-goods').on('click', minusSeasonGoods);
        });
    } else if (isEmpty(cart)) {
        $.getJSON('/goods.json', function(data) {
            var goods = data;
            var out = '';
            out += '<div class="big-div"><h1 class="biggy">Корзина</h1></div><div class="zind"><h2>Корзина</h2><picture><source srcset="/images/webp/cart.webp" type="img/webp"><img class="emoji emb" src="/images/png/cart.png" alt="😉"></picture></div>'
            for (var id in cart) {
                out += '<div class="item">';
                out += '<img src="/'+ goods[id].img +'" class="wow fadeInUp image" onclick="imageClick(this)" alt="' + goods[id].name + '">';
                out += '<p class="name wow fadeInUp">'+ goods[id].name +'</p>';
                out += '<p class="cost name wow fadeInUp">'+ cart[id] * goods[id].cost + ' ₽'+'</p>';
                out += '<div class="button-container wow fadeInUp">';
                out += '<button data-id="'+ id +'" class="del-goods remove-fr-cart cart-func">Удалить</button>';
                out += '<button data-id="'+ id +'" class="minus-goods remove-fr-cart cart-func">-</button>';
                out += '<button data-id="'+ id +'" class="plus-goods remove-fr-cart cart-func">+</button>';
                out += '<p class="number">'+ cart[id]+'</p>';
                out += '</div>';
                out += '<hr>';
                out += '</div>';
                num += goods[id].cost * cart[id];
                $('.total').html('<h2>Итого:</h2><picture><source srcset="/images/webp/slightly.webp" type="img/webp"><img class="emoji emb" src="/images/png/slightly.png" alt="🙂"></pciture><p class="name pmb">' + num + ' рублей</p>');
            }
            $('.cart-place').html(out);
            $('.del-goods').on('click', deleteGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    } else if (isEmpty(seasonCart)) {
        $.getJSON('/seasongoods.json', function(data) {
            var seasonGoods = data;
            var out = '';
            out += '<div class="big-div"><h1 class="biggy"><span class="season-name">' + logSeason() + '</span> корзина</h1></div><div class="zind"><h2><span class="season-name">' + logSeason() + '</span> корзина</h2><picture><source srcset="/images/webp/cart.webp" type="img/webp"><img class="emoji emb" src="/images/png/cart.png" alt="😉"></picture></div>'
            for (var id in seasonCart) {
                out += '<div class="item">';
                out += '<img src="/'+seasonGoods[id].img +'" class="wow fadeInUp image" onclick="imageClick(this)" alt="' + seasonGoods[id].name + '">';
                out += '<p class="name wow fadeInUp">'+seasonGoods[id].name +'</p>';
                out += '<p class="cost name wow fadeInUp">'+seasonCart[id] * seasonGoods[id].cost + ' ₽'+'</p>';
                out += '<div class="button-container wow fadeInUp">';
                out += '<button data-id="'+ id +'" class="del-season-goods remove-fr-cart cart-func">Удалить</button>';
                out += '<button data-id="'+ id +'" class="minus-season-goods remove-fr-cart cart-func">-</button>';
                out += '<button data-id="'+ id +'" class="plus-season-goods remove-fr-cart cart-func">+</button>';
                out += '<p class="number">'+seasonCart[id]+'</p>';
                out += '</div>';
                out += '<hr>';
                out += '</div>';
                num += seasonGoods[id].cost * seasonCart[id];
                $('.total').html('<h2>Итого:</h2><picture><source srcset="/images/webp/slightly.webp" type="img/webp"><img class="emoji emb" src="/images/png/slightly.png" alt="🙂"></pciture><p class="name pmb">' + num + ' рублей</p>');
            }
            $('.season-cart-place').html(out);
            $('.del-season-goods').on('click', deleteSeasonGoods);
            $('.plus-season-goods').on('click', plusSeasonGoods);
            $('.minus-season-goods').on('click', minusSeasonGoods);
        });
    } else {
        $('.cart-place').html('<div class="big-div"><h1 class="biggy">Корзина пуста</h1></div><div class="zind"><h2>Корзина пуста</h2><picture><source srcset="/images/webp/cart-empty.webp" type="img/webp"><img class="emoji" src="/images/png/cart-empty.png" alt="😮"><picture><p class="empty-cart">Вы можете перейти <a class="nlink" href="https://masterbuket.com/#product">на главную страницу</a>, чтобы добавить товары в корзину</p></div>');
        $('.total').css({"display": "none"});
        deleteCookie('cart');
        deleteCookie('seasonCart');
    }
}

function deleteGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
    $('.popup').css({"display": "none"});
}

function plusGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods() {
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    } else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function deleteSeasonGoods() {
    var id = $(this).attr('data-id');
    delete seasonCart[id];
    saveSeasonCart();
    showCart();
    $('.popup').css({"display": "none"});
}

function plusSeasonGoods() {
    var id = $(this).attr('data-id');
    seasonCart[id]++;
    saveSeasonCart();
    showCart();
}

function minusSeasonGoods() {
    var id = $(this).attr('data-id');
    if (seasonCart[id] == 1) {
        delete seasonCart[id];
    } else {
        seasonCart[id]--;
    }
    saveSeasonCart();
    showCart();
}

function saveCart() {
    deleteCookie('cart');
    setCookie('cart', JSON.stringify(cart), '/');
}

function saveSeasonCart() {
    deleteCookie('seasonCart');
    setCookie('seasonCart', JSON.stringify(seasonCart), '/');
}

function deleteCookie(name) {
  var cookieDate = new Date();
  cookieDate.setTime(cookieDate.getTime() - 1);
  document.cookie = name += '=; expires=' + cookieDate.toGMTString();
}

function imageClick(e) {
    var img = $(e);
    var src = img.attr('src');
    var name = $(e).next().text();
    var button = $(e).next().next().next().children().attr('data-id');
    $("body").append("<div class='popup'>" +
        "<div class='popup_bg'>" +
        "<img src='" + src + "' class='popup_img'>" +
        "<div class='popup_description'><h3>" + name + "</h3><button data-id='" + button + "' class='del-goods remove-fr-cart cart-func'>Удалить из корзины</button></div></div></div>");
    $(".popup").fadeIn(200);
    $('.popup_bg').on('click', closeImage);
    $(".popup_description").on('click', preventCloseImage);
    $(".del-goods").on('click', deleteGoods);
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

function clearValue() {
    $('.mail-text').html('Email:');
}

function clearAndShowValue() {
    $('.phone-text').html('Телефон:');
    var phones = { "mask": "## (###) ###-##-##"};
    $('#ephone').inputmask({ 
        mask: phones, 
        greedy: false, 
        definitions: { '#': { validator: "[+0-9]", cardinality: 1} } });
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    var emailPattern = /[0-9A-Za-z_-]+@[0-9A-Za-z_-]+\.[A-Za-zА-Яa-я]{2,5}/i;
    var phonePattern = /((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/i;
    if (ename == '' || email == '' || ephone == '') {
        $('.alert-div').css({"display": "block"});
        $('.input').css({"display": "block"});
        $('.overlay').css({"display": "block"});
    } else if (emailPattern.test(email) == false) {
        $('.mail-text').html('Email введен неверно');
    } else if (phonePattern.test(ephone) == false) {
        $('.phone-text').html('Телефон введен неверно');
    } else if (ename != '' && email != '' && ephone != '') {
        if (isEmpty(cart)) {
            $.post(
                "/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data) {
                    if (data == 1) {
                        $('.thanks').css({"display": "block"});
                        $('.overlay').css({"display": "block"});
                        deleteCookie('cart');
                    } else {
                        $('.alert-div').css({"display": "block"});
                        $('.retry').css({"display": "block"});
                        $('.overlay').css({"display": "block"});;
                    }
                }
            );
        } else {
            $('.alert-div').css({"display": "block"});
            $('.cart').css({"display": "block"});
            $('.overlay').css({"display": "block"});
        }
    } else {
        $('.alert-div').css({"display": "block"});
        $('.retry').css({"display": "block"});
        $('.overlay').css({"display": "block"});
    }
}

function sendEmailButton() {
    $('.send-email').on('click', sendEmail);
}

function closeThanks() {
    $('.thanks').css({"display": "none"});
    $('.overlay').css({"display": "none"});
}

function closeAlert() {
    $('.alert-div').css({"display": "none"});
    $('.overlay').css({"display": "none"});
    $('.mail').css({"display": "none"});
    $('.input').css({"display": "none"});
    $('.cart').css({"display": "none"});
    $('.numbers').css({"display": "none"});
    $('.retry').css({"display": "none"});
}

$(document).ready(function() {
    loadCart();
});