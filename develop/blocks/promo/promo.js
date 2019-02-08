(function() {
    var $slider = $(".promo__slider");

    $slider.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        fade: true,
        speed: 1500,
        useCSS: false,
        useTransform: false,
        waitForAnimate: false,
        arrows: false,
        dots: true,
        lazyLoad: "ondemand",
        // swipe: false
        // responsive: [{
        //     breakpoint: 769,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 1,
        //     }
        // }]
    });

    var slides = $(".promo__slide");

    $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        slides.find(".promo__content").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp");
        slides.find(".promo__image").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp");
        slides
            .eq(currentSlide)
            .find(".promo__content")
            .addClass("fadeOutUp");
        slides
            .eq(currentSlide)
            .find(".promo__image")
            .addClass("fadeOutDown");

        slides
            .eq(nextSlide)
            .find(".promo__content")
            .addClass("fadeInDown");
        slides
            .eq(nextSlide)
            .find(".promo__image")
            .addClass("fadeInUp");
    });
})();
