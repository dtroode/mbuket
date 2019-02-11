$(document).ready(function () {
    $("div.main, div.second, div.newyear-items, div.main-content").on("click", "a.next, a.link-to-product, a.link, a.scroll-to-season", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body, html').animate({
            scrollTop: top
        }, "500");
    });
});