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
    });

    var slides = $(".promo__slide");

    $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        slides.find(".promo__content").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp wow").removeAttr("style data-wow-delay data-wow-offset");
        slides.find(".promo__image").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp wow").removeAttr("style data-wow-delay data-wow-offset");
        slides
            .eq(currentSlide)
            .find(".promo__content")
            .addClass("fadeOutUp animated");
        slides
            .eq(currentSlide)
            .find(".promo__image")
            .addClass("fadeOutDown animated");

        slides
            .eq(nextSlide)
            .find(".promo__content")
            .addClass("fadeInDown animated");
        slides
            .eq(nextSlide)
            .find(".promo__image")
            .addClass("fadeInUp animated");
    });
})();
