if (document.getElementById("map")) {
    ymaps.ready(init);
    var myMap;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.8345275689108, 37.496649999999995],
            zoom: 10,
            controls: []
        });
        var markLayout = ymaps.templateLayoutFactory.createClass('<div class="placeMarkIco"><img src="/img/icons/map_pin.svg" alt=""></div>');
        var customPlacemark = new ymaps.Placemark(
            [55.8345275689108, 37.496649999999995],
            {
                hintContent: '<div class="hintMain">AGORA21.RU</div>',
                balloonContent: false,
            },
            {
                hideIconOnBalloonOpen: false,
                iconLayout: markLayout,
                iconShape: {
                    type: 'Circle',
                    // Круг описывается в виде центра и радиуса
                    coordinates: [26, 26],
                    radius: 26
                },
                iconOffset: [-26, -52],
            }
        );

        // для добавления одной точки
        myMap.geoObjects.add(customPlacemark);
    }
}
if (document.getElementById("map-locate")) {
    ymaps.ready(init);
    var myMap;

    function init() {
        $(".show--map").bind({
            click: function() {
                if (!myMap) {
                    myMap = new ymaps.Map("map-locate", {
                        center: [55.8345275689108, 37.496649999999995],
                        zoom: 10,
                        controls: []
                    });
                }
                else {
                    myMap.destroy();// Деструктор карты
                    myMap = null;
                }
            }
        });
    }
}