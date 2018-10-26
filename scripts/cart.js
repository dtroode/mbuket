var cart = {};

function loadCart() {
    if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'));
        showCart();
    } else {
        $('.main-cart').html('<div class="big-div"><h1 class="biggy">КОРЗИНА ПУСТА</h1></div><div class="zind"><h2>Корзина пуста</h2><img class="emoji" src="/images/cart-empty.png" alt="😮"><p class="empty-cart">Вы можете перейти <a class="nlink" target="_blank" href="https://masterbuket.com/#product">на главную страницу</a>, чтобы добавить товары в корзину</p></div>');
        $('.total').css({"display": "none"});
    }
}

function showCart() { 
    var num = 0;
    if (!isEmpty(cart)) {
        $('.main-cart').html('<div class="big-div"><h1 class="biggy">КОРЗИНА ПУСТА</h1></div><div class="zind"><h2>Корзина пуста</h2><img class="emoji" src="/images/cart-empty.png" alt="😮"><p class="empty-cart">Вы можете перейти <a class="nlink" target="_blank" href="https://masterbuket.com/#product">на главную страницу</a>, чтобы добавить товары в корзину</p></div>');
        $('.total').css({"display": "none"});
    } else {
        $.getJSON('/goods.json', function(data) {
            var goods = data;
            var out = '';
            out +='<div class="big-div"><h1 class="biggy">КОРЗИНА</h1></div><div class="zind"><h2>Корзина</h2><img class="emoji emb" src="/images/cart.png" alt="😉"></div>'
            for (var id in cart) {
                out +='<div class="item">';
                out +='<img src="/'+goods[id].img+'" class="wow fadeInUp image" onclick="imageClick(this)" alt="' + goods[id].description + '">';
                out +='<p class="name wow fadeInUp">'+goods[id].name+'</p>';
                out +='<p class="cost">'+cart[id] * goods[id].cost+ ' ₽'+'</p>';
                out +='<div class="button-container wow fadeInUp">';
                out +='<button data-id="'+id+'" class="del-goods remove-fr-cart cart-func">Удалить</button>';
                out +='<button data-id="'+id+'" class="minus-goods remove-fr-cart cart-func">-</button>';
                out +='<button data-id="'+id+'" class="plus-goods remove-fr-cart cart-func">+</button>';
                out +='<p class="number">'+cart[id]+'</p>';
                out +='</div>';
                out +='</div>';
                num += goods[id].cost * cart[id];
                $('.total').html('<h2>Итого:</h2><img class="emoji emb" src="/images/slightly.png" alt="🙂"><p class="name pmb">' + num + ' рублей</p>');
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', deleteGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
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

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function imageClick(e) {
    var img = $(e);
    var src = img.attr('src');
    var name = $(e).next().text();
    var button = $(e).next().next().next().children().attr('data-id');
    var description = img.attr('alt');
    $("body").append("<div class='popup'>" +
        "<div class='popup_bg'>" +
        "<img src='" + src + "' class='popup_img'>" +
        "<div class='popup_description'><h2>" + name + "</h2><p>" + description + "</p><button data-id='" + button + "' class='del-goods remove-fr-cart cart-func'>Удалить из корзины</button></div></div></div>");
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

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    var emailPattern = /[0-9A-Za-z_-]+@[0-9A-Za-z_-]+\.[A-Za-zА-Яa-я]{2,5}/i;
    var phonePattern = /[0-9]{7,11}/i;
    if (ename == '' || email == '' || ephone == '') {
        $('.alert-div').css({"display": "block"});
        $('.input').css({"display": "block"});
        $('.overlay').css({"display": "block"});
    } else if (emailPattern.test(email) == false) {
        $('.alert-div').css({"display": "block"});
        $('.mail').css({"display": "block"});
        $('.overlay').css({"display": "block"});
    } else if (phonePattern.test(ephone) == false) {
        $('.alert-div').css({"display": "block"});
        $('.numbers').css({"display": "block"});
        $('.overlay').css({"display": "block"});
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
    $('.send-email').on('click', sendEmail);
});