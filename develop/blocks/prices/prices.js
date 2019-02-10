(function() {
    var $slider = $(".prices__slider");
    var $slides = $(".prices__slide");

    $slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        fade: true,
        speed: 1000,
        arrows: false,
        dots: true,
        lazyLoad: "ondemand"
    });

    $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        $slides.removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp");
        $slides
            .eq(currentSlide)
            .addClass("fadeOutUp");
        $slides
            .eq(nextSlide)
            .addClass("fadeInDown");
    });
})();
