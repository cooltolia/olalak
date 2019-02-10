(function() {
    var $slider = $(".advantages__list");

    if (window.matchMedia("(max-width: 480px)").matches) {
        $slider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
        });
    } else {
        return
    }

})();
