'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var NUMBER_OF_OBJECTS = 8;
  var MAIN_PIN_DEFAULT_X = 600;
  var MAIN_PIN_DEFAULT_Y = 380;
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var TypeLabel = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var guestsByRooms = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var BuildingPrices = {
    'palace': 10000,
    'house': 5000,
    'flat': 1000,
    'bungalo': 0
  };

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    NUMBER_OF_OBJECTS: NUMBER_OF_OBJECTS,
    MAIN_PIN_DEFAULT_X: MAIN_PIN_DEFAULT_X,
    MAIN_PIN_DEFAULT_Y: MAIN_PIN_DEFAULT_Y,
    TITLES: TITLES,
    TYPES: TYPES,
    TIMES: TIMES,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    TypeLabel: TypeLabel,
    guestsByRooms: guestsByRooms,
    BuildingPrices: BuildingPrices,
    DragLimit: DragLimit
  };
})();
