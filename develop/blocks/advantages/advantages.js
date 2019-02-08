(function() {
    $(".advantages__list").slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 481,
                settings: "unslick"
            }
        ]
    });
})();
