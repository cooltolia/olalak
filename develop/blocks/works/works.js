(function() {
    $(".works__slider").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        fade: true,
        arrows: false,
        dots: true,
        speed: 1000,
        lazyLoad: "ondemand",
        responsive: [{
            breakpoint: 481,
            settings: 'unslick'
        }]
    });

    var $images = $('.works__images')
    
    // matchMedia('min-width(481px)')
    // function() {
    //     $images.on('click', function(e) {
    //         e.preventDefault();
    //     })
    // }

    $(".works__more").click(function (e) {
        e.preventDefault();
        
        // continue watching from 4th image
        var fancygroup = $("a[rel='works']");
        var fancyelem = $(fancygroup.get(3));
        fancyelem.click();
    });

})();
