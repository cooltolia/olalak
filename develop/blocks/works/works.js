(function() {
    $(".works__slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        fade: true,
        arrows: false,
        dots: true,
        speed: 500,
        lazyLoad: "ondemand",
        // responsive: [{
        //     breakpoint: 769,
        //     settings: {
        //         slidesToShow: 2,
        //         slidesToScroll: 1,
        //     }
        // }]
    });
})();
