$(document).ready(function () {
    $("div.main, div.second").on("click", "a.next, a.link-to-product, a.link", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 500);
    });
});