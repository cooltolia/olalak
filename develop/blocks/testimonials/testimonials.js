(function() {
    var $slider = $(".testimonials__slider");
    var $customDotsItem;
    $slider.on("init", function (event, slick) {
        var $dots = $slider.find(".slick-dots");
        var $dotsItem = $dots.find("li");

        var $customDots = $dots.clone();
        $customDots.addClass("custom-dots").removeClass("slick-dots");

        $slider.append($customDots);

        $customDotsItem = $customDots.find("li");
        $customDotsItem.each(function (index) {
            $(this).on("click", function () {
                var slickIndex = index;
                $customDotsItem.removeClass("slick-active");
                $(this).addClass("slick-active");

                $dotsItem.eq(slickIndex).click();
            });
        });
        $dotsItem.each(function (index) {
            $(this).on("click", function () {
                var slickIndex = index;
                $customDotsItem.removeClass("slick-active");
                $customDotsItem.eq(slickIndex).addClass("slick-active");
            });
        });
    });

    $slider.on("afterChange", function (event, slick, current, next) {
        var index = slick.$dots.find(".slick-active").index();
        $customDotsItem.removeClass("slick-active");

        $customDotsItem.eq(index).addClass("slick-active");
    });

    $slider.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
})();
