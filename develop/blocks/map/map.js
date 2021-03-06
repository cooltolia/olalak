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
