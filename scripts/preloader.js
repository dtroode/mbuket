$('body').ready(function() {
    let images = $('picture');
    let imagesTotalCount = images.length;
    let imagesLoadedCount = 0;
    let preloader = $('#page-preloader');

    if (!preloader.hasClass('preloader-done')) {
        $('html').css({"overflow-y": "hidden"})
    }

    console.log(imagesTotalCount);

    function imageLoaded() {
        imagesLoadedCount++;
    
        if (imagesLoadedCount >= imagesTotalCount) {
            setTimeout(() => {
                $('picture').ready(function() {
                    if (!preloader.hasClass('preloader-done')) {
                        preloader.addClass('preloader-done');
                        $('html').css({"overflow-y": "scroll"})
                        setTimeout(() => {
                            preloader.addClass('preloader-none');
                        }, 1000);
                    }
                })
            }, 50);
        }
    }

    for (var i = 0; i < imagesTotalCount; i++) {
        imageClone = new Image();
        imageClone.onload = imageLoaded;
        imageClone.onerror = imageLoaded;
        imageClone.src = images[i].src;
    }
})