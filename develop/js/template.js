
$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

    var wow = new WOW({
        mobile: false
    });
    wow.init();

    var myLazyLoad = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 200,

    });

    var worksImages = new LazyLoad({
        elements_selector: ".works-lazy",
        threshold: 50,
    });

     //=require ../blocks/**/*.js 
    
    
});
