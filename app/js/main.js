
$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

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

     

     
     

     
     ;

     (function () {

     

         $('.interior__slider').slick({

             infinite: true,

             slidesToShow: 4,

             slidesToScroll: 4,

             adaptiveHeight: false,

             // responsive: [{

             //     breakpoint: 769,

             //     settings: {

             //         slidesToShow: 2,

             //         slidesToScroll: 1,

             //     }

             // }]

         });

     

     })();

     
     

     
     ;(function() {

         $('.top-form__input[name="phone"]').inputmask();

     })()

     
     

     
     

     
     $(window).on('load', function() {

         var zoom = 16;

         var myMap;

         if ($(window).width() < 480) {

             zoom = 15;

         }

     

         var address;

         address = [55.775450, 37.631004];

     

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

     

                     var pointA = [55.77295318071541, 37.63288889128495],

                         pointB = address;

     

     

                     var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

                         hintContent: 'ул. Гиляровского,',

                         balloonContent: 'дом 6, стр. 1, офис 111'

                     }, {

                             // Опции.

                             // Необходимо указать данный тип макета.

                             iconLayout: 'default#image',

                             // Своё изображение иконки метки.

                             iconImageHref: '../images/map-icon.png',

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

     
     ;(function() {

         

         if (window.matchMedia("(max-width: 768px)").matches) {

             var $mainTable = $('.prices__table-data');

     

             $mainTable.each(function () {

                 var $header = $(this).find('.prices__table-header');

                 var $body = $(this).find('.prices__table-body');

                 var $firstHeaderCell = $header.find('th:first-child');

                 var $firstbodyCell = $body.find('.prices__table-cell:first-child');

     

                 $body.on('scroll', function (e) {

                     var scrollTop = $body.scrollTop();

     

                     if (scrollTop > 0) {

                         $body.css('margin-top', '0')

                     } else {

                         $body.css('margin-top', '-2px');

                     }

     

                     var scrollLeft = $body.scrollLeft();

     

                     if (scrollLeft > 0) {

                         $header.css("transform", "translateX(" + (-scrollLeft) + "px)");

                         $firstbodyCell.css("transform", "translateX(" + (scrollLeft) + "px)");

                         $firstHeaderCell.css("transform", "translateX(" + (scrollLeft) + "px)");

                     } else {

                         $header.css("transform", "translateX(0)");

                         $firstbodyCell.css("transform", "translateX(0)");

                         $firstHeaderCell.css("transform", "translateX(0)");

                     }

     

                 });

             })

         }

     

         var $innerTable = $('.prices__inner-table');

     

         $innerTable.each(function () {

             var _this = $(this);

     

             var parentCell = _this.parent();

             var parentCellHeight = parentCell.outerHeight();

             var innerCells = _this.find('td');

     

             innerCells.each(function () {

                 $(this).css('height', parentCellHeight / innerCells.length)

             })

         })

         

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

             // swipe: false

             // responsive: [{

             //     breakpoint: 769,

             //     settings: {

             //         slidesToShow: 2,

             //         slidesToScroll: 1,

             //     }

             // }]

         });

     

         var slides = $(".promo__slide");

     

         $slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {

             slides.find(".promo__content").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp");

             slides.find(".promo__image").removeClass("fadeOutUp fadeOutDown fadeInDown fadeInUp");

             slides

                 .eq(currentSlide)

                 .find(".promo__content")

                 .addClass("fadeOutUp");

             slides

                 .eq(currentSlide)

                 .find(".promo__image")

                 .addClass("fadeOutDown");

     

             slides

                 .eq(nextSlide)

                 .find(".promo__content")

                 .addClass("fadeInDown");

             slides

                 .eq(nextSlide)

                 .find(".promo__image")

                 .addClass("fadeInUp");

         });

     })();

     

     
     

     
     

     
     ;

     (function () {

     

         $('.testimonials__slider').slick({

             infinite: true,

             slidesToShow: 3,

             slidesToScroll: 3,

             adaptiveHeight: false,

             arrows: false,

             dots: true

             // responsive: [{

             //     breakpoint: 769,

             //     settings: {

             //         slidesToShow: 2,

             //         slidesToScroll: 1,

             //     }

             // }]

         });

     

     })();

     
     

     
     

     
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

     
    
    // (function () {
     /*    function logElementEvent(eventName, element) {
            console.log(new Date().getTime(), eventName, element.getAttribute('data-src'));
        }

        function logEvent(eventName, elementsLeft) {
            console.log(new Date().getTime(), eventName, elementsLeft + " images left");
        } */

        // function createImageFragment(srcUrl) {
        //     var imageFragment = document.createElement('img');
        //     imageFragment.setAttribute('src', srcUrl);
        //     return imageFragment;
        // }
        /* ll = new LazyLoad({
            threshold: 500,
            elements_selector: ".lazyload",
            callback_enter: function (element) {
                function callback_load(event) {
                    element.classList.add('loaded');
                    element.classList.remove('loading');
                    imageFragment.removeEventListener('load', callback_load);
                }
                var imageFragment = createImageFragment(element.getAttribute('data-src'));
                imageFragment.addEventListener('load', callback_load);
                element.classList.add('loading');              
            },
            callback_error: function (element) {
                // logElementEvent("ERROR", element);
                element.src = "https://placeholdit.imgix.net/~text?txtsize=21&txt=Fallback%20image&w=280&h=280";
            }
        }); */
    // }());
});
