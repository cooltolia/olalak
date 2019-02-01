
$.noConflict();
jQuery(document).ready(function ($) {
    $("body").removeClass("pageload");

     

     
     

     
     

     
     

     
     

     
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

     
     

     
     

     
     ;

     (function () {

     

         $('.testimonials__slider').slick({

             infinite: true,

             slidesToShow: 1,

             slidesToScroll: 1,

             adaptiveHeight: true,

             mobileFirst: true,

             responsive: [{

                 breakpoint: 769,

                 settings: {

                     slidesToShow: 2,

                     slidesToScroll: 1,

                 }

             }]

         });

     

     })();

     
     

     
     ;(function() {

         $('.top-form__input[name="phone"]').inputmask();

     })()

     
     

     
     
    
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
