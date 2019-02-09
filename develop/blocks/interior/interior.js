(function() {
    $slider = $(".interior__slider");
    var $customDotsItem;
    $slider.on("init", function() {
        var $dots = $slider.find(".slick-dots");
        var $dotsItem = $dots.find("li");

        var $customDots = $dots.clone();
        $customDots.addClass("custom-dots").removeClass("slick-dots");

        $slider.append($customDots);

        $customDotsItem = $customDots.find("li");
        $customDotsItem.each(function(index) {
            $(this).on("click", function() {
                var slickIndex = index;
                $customDotsItem.removeClass("slick-active");
                $(this).addClass("slick-active");

                $dotsItem.eq(slickIndex).click();
            });
        });
        $dotsItem.each(function(index) {
            $(this).on("click", function() {
                var slickIndex = index;
                $customDotsItem.removeClass("slick-active");
                $customDotsItem.eq(slickIndex).addClass("slick-active");
            });
        });
    });

    $slider.on("afterChange", function(event, slick, current, next) {
        var index = slick.$dots.find(".slick-active").index();
        $customDotsItem.removeClass("slick-active");
        
        $customDotsItem.eq(index).addClass("slick-active");
    });

    $slider.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: false,
        arrows: false,
        dots: true,
        speed: 1000,
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }]
    });
})();
