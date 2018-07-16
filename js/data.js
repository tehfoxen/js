'use strict';
(function () {
  var NUMBER_OF_OBJECTS = 8;
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


  var createDataArray = function () {
    var arr = [];
    for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
      var x = window.utils.getRandomIntegerFromInterval(300, 900);
      var y = window.utils.getRandomIntegerFromInterval(130, 630);
      arr.push({
        author: {
          avatar: 'img/avatars/user' + (i + 1 < 10 ? '0' : '') + (i + 1) + '.png'
        },
        offer: {
          title: TITLES[i],
          address: x + ', ' + y,
          price: window.utils.getRandomIntegerFromInterval(1000, 1000000),
          type: window.utils.getRandomArrayItem(TYPES),
          rooms: window.utils.getRandomIntegerFromInterval(1, 5),
          guests: window.utils.getRandomIntegerFromInterval(2, 15),
          checkin: window.utils.getRandomArrayItem(TIMES),
          checkout: window.utils.getRandomArrayItem(TIMES),
          features: window.utils.sliceArrayRandom(window.utils.shuffleArray(FEATURES)),
          description: '',
          photos: window.utils.shuffleArray(PHOTOS)
        },
        location: {
          x: x,
          y: y
        }
      });
    }
    return arr;
  };
  var fakeData = createDataArray();

  window.data = {
    createDataArray: createDataArray,
    fakeData: fakeData
  };
})();
