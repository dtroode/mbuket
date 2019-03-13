$(document).ready(function () {
    // Получаем кнопки и их родителей
    $("div.main, div.second, div.newyear-items, div.main-content").on("click", "a.next, a.link-to-product, a.link, a.scroll-to-season", function (event) {
        event.preventDefault();
        // Получаем атрибут href
        var id = $(this).attr('href');
        // Получаем высоту оставшегося расстояния от элемента до верха страницы
        var top = $(id).offset().top;
        $('body, html').animate({
            scrollTop: top
        }, "500");
    });
});