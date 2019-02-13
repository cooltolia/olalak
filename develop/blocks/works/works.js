(function() {
    $slider = $(".works__slider");
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
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        fade: true,
        arrows: false,
        dots: true,
        speed: 300,
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
        var fancyelem = $(fancygroup.get(2));
        fancyelem.click();
    });

    var elem = ".works"

    function isScrolledIntoView(elem) {

        var node = $(elem);

        if (!node || node.length == 0) return;

        var docViewTop = $(window).scrollTop();

        var elemTop = node.offset().top;

        if (docViewTop + 300 > elemTop) {
            console.log(worksImages);
             worksImages.loadAll();
        };
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var loadFirstImages = debounce(function () {
        isScrolledIntoView(elem);
    }, 250);

    $(document).on('scroll', loadFirstImages)

})();
