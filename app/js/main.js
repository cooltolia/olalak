
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

     

     
     

     
     (function() {

         $slider = $(".interior__slider");

         var $customDotsItem;

         $slider.on("init", function(event, slick) {

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

             slidesToShow: 3,

             slidesToScroll: 3,

             adaptiveHeight: false,

             arrows: false,

             dots: true,

             speed: 1000,

             lazyLoad: "ondemand",

             responsive: [

                 {

                     breakpoint: 769,

                     settings: {

                         slidesToShow: 2,

                         slidesToScroll: 2,

                     }

                 }

             ]

         });

     

         // hack to make slick responsive object fire

         setTimeout(function() {

             $(window).resize();

         }, 300);

     

     })();

     

     
     

     
     ;(function() {

         $('.main-form__input[name="phone"]').inputmask();

     })()

     
     

     
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

     
     $(window).on('load', function() {

         var zoom = 16;

         var myMap;

         if ($(window).width() < 480) {

             zoom = 15;

         }

     

         var address;

         address = [55.739667, 37.663543];

     

         //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки)

         var check_if_load = false;

         var TRY = 1

         function init() { 

             if (ymaps.geocode === undefined) {

                 // console.log('Попытка номер ' + TRY);

                 TRY++

                 return ymap();

             }

     

             ymaps.ready(function() {

                 ymaps.geocode(address).then(function (res) {

                     myMap = new ymaps.Map('map', {

                         center: res.geoObjects.get(0).geometry.getCoordinates(),

                         zoom: zoom,

                         controls: []

                     });

     

                     // var pointA = [55.77295318071541, 37.63288889128495],

                     //     pointB = address;

     

     

                     var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

                         hintContent: 'ул. Гиляровского,',

                         balloonContent: 'дом 6, стр. 1, офис 111'

                     }, {

                             // Опции.

                             // Необходимо указать данный тип макета.

                             iconLayout: 'default#image',

                             // Своё изображение иконки метки.

                             iconImageHref: './images/map-icon.png',

                             // Размеры метки.

                             iconImageSize: [30, 30],

                             // Смещение левого верхнего угла иконки относительно

                             // её "ножки" (точки привязки).

                             iconImageOffset: [-15, -30]

                         });

     

                     var layer = myMap.layers.get(0).get(0);

                     // Отслеживаем событие окончания отрисовки тайлов.

                     waitForTilesLoad(layer).then(function () {

                         // console.log('Карта загружена');

                     });

     

                     myMap.geoObjects.add(myPlacemark);

                     // myMap.geoObjects.add(multiRoute);

                     myMap.behaviors.disable('scrollZoom');

                 });

             })

     

             

     

         }

     

         // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 

         function waitForTilesLoad(layer) {

             return new ymaps.vow.Promise(function (resolve, reject) {

                 var tc = getTileContainer(layer),

                     readyAll = true;

                 tc.tiles.each(function (tile, number) {

                     if (!tile.isReady()) {

                         readyAll = false;

                     }

                 });

                 if (readyAll) {

                     resolve();

                 } else {

                     tc.events.once("ready", function () {

                         resolve();

                     });

                 }

             });

         }

     

         function getTileContainer(layer) {

             for (var k in layer) {

                 if (layer.hasOwnProperty(k)) {

                     if (

                         layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||

                         layer[k] instanceof ymaps.layer.tileContainer.DomContainer

                     ) {

                         return layer[k];

                     }

                 }

             }

             return null;

         }

     

         // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)

         function loadScript(url, callback) {

             var script = document.createElement("script");

     

             if (script.readyState) { // IE

                 script.onreadystatechange = function () {

                     if (script.readyState == "loaded" ||

                         script.readyState == "complete") {

                         script.onreadystatechange = null;

                         callback();

                     }

                 };

             } else { // Другие браузеры

                 script.onload = function () {

                     callback();

                 };

             }

     

             script.src = url;

             document.getElementsByTagName("head")[0].appendChild(script);

         }

     

         // Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"

         var ymap = function () {

             

             // myMap.destroy()

             

     

     

             // if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

     

             //     // Чтобы не было повторной загрузки карты, мы изменяем значение переменной

             //     check_if_load = true;

     

             //     // Показываем индикатор загрузки до тех пор, пока карта не загрузится

             //     // spinner.addClass('is-active');

     

                 // Загружаем API Яндекс.Карт

             loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=Map&loadByRequire=1", function () {

                     // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map"

                     ymaps.load(init);

                 });

             // }

         }

     

         $(function () {

             //Запускаем основную функцию

             ymap();

     

         });

     })

     

     
     ;(function() {

     

         // $(":input").inputmask();

     

         var $modals = $('.modal');

         

         $modals.each(function () {

             $(this).on("shown.bs.modal", function (event) {

                 var thisId = event.target.getAttribute("id");

                 if (thisId === 'modal2' && typeof (grecaptcha.execute) === 'function') {

                     grecaptcha.execute();

                 } 

                 

                 var firstInput = $(this).find('input')[0];

                 if (firstInput) {

                     firstInput.focus()

                 }

                 

                 var mobileInput = $(this).find('input[name="phone"]'),

                     submit = $(this).find('button[name="submit"]');

                 var isValid = Inputmask.isValid(mobileInput.val(), { inputFormat: "+7 (999) 999 99 99" });

     

                 if (isValid) {

                     submit.attr('disabled', false)

                 }

     

                 mobileInput.inputmask('+7 (999) 999 99 99', {

                     onKeyValidation: function (key, result) {

                         // console.log(result.pos);

                     },

                     oncomplete: function () {

                         submit.attr('disabled', false)

                     },

                     onincomplete: function () {

                         submit.prop('disabled', true)

                     }

                 });

             });

         });

     

         $('#modal5').on('show.bs.modal', function (event) {

             var button = $(event.relatedTarget) // Button that triggered the modal

             var service = button.data('service');

             var buttonText = button.data('button');

             var modal = $(this);

             modal.find('input[name="service"]').val(service);

             modal.find('button[name="submit"]').text(buttonText);

         })

     

     })();

     
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

             $slides.removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp wow");

             $slides

                 .eq(currentSlide)

                 .addClass("fadeOutUp animated");

             $slides

                 .eq(nextSlide)

                 .addClass("fadeInDown animated");

         });

     })();

     

     
     (function() {

         var $slider = $(".promo__slider");

     

         $slider.slick({

             infinite: false,

             slidesToShow: 1,

             slidesToScroll: 1,

             adaptiveHeight: false,

             fade: true,

             speed: 1500,

             useCSS: false,

             useTransform: false,

             waitForAnimate: false,

             arrows: false,

             dots: true,

             lazyLoad: "ondemand",

         });

     

         var slides = $(".promo__slide");

     

         $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {

             slides.find(".promo__content").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp wow").removeAttr("style data-wow-delay data-wow-offset");

             slides.find(".promo__image").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp wow").removeAttr("style data-wow-delay data-wow-offset");

             slides

                 .eq(currentSlide)

                 .find(".promo__content")

                 .addClass("fadeOutUp animated");

             slides

                 .eq(currentSlide)

                 .find(".promo__image")

                 .addClass("fadeOutDown animated");

     

             slides

                 .eq(nextSlide)

                 .find(".promo__content")

                 .addClass("fadeInDown animated");

             slides

                 .eq(nextSlide)

                 .find(".promo__image")

                 .addClass("fadeInUp animated");

         });

     })();

     

     
     

     
     

     
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

     
    
    
});
