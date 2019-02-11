;
(function () {

    var link = $('.main-nav__link');


    link.on('click', function (e) {

        var href = $(this).attr("href");

        if (href[0] !== '#') {
            return true
        }

        e.preventDefault();
        var target = $(this.hash);

        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    });

})();