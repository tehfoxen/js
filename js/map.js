'use strict';
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
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'];
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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var template = document.querySelector('template').content;
// случайная сортировка массива
var shuffleArray = function (arr) {
  var arrCopy = arr.slice(0);
  return arrCopy.sort(function () {
    return Math.random() - 0.5;
  });
};
// случайный элемент массива
var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
// случайное число
var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
};
var sliceArrayRandom = function (array) {
  return array.slice(getRandomIntegerFromInterval(0, array.length));
};
// создание объявлений
var createDataArray = function () {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    var x = getRandomIntegerFromInterval(300, 900);
    var y = getRandomIntegerFromInterval(130, 630);
    arr.push({
      author: {
        avatar: 'img/avatars/user' + ((i + 1) < 10 ? '0' : '') + (i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: x + ', ' + y,
        price: getRandomIntegerFromInterval(1000, 1000000),
        type: getRandomArrayItem(TYPES),
        rooms: getRandomIntegerFromInterval(1, 5),
        guests: getRandomIntegerFromInterval(2, 15),
        checkin: getRandomArrayItem(TIMES),
        checkout: getRandomArrayItem(TIMES),
        features: sliceArrayRandom(shuffleArray(FEATURES)),
        description: '',
        photos: shuffleArray(PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    });
  }
  return arr;
};

var map = document.querySelector('.map');
var mockData = createDataArray();

// создание пинов
var createPin = function (object) {
  var fragment = document.createDocumentFragment();
  var pinTemplate = template.querySelector('.map__pin');
  for (var i = 0; i < object; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (mockData[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (mockData[i].location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = mockData[i].author.avatar;
    pinElement.querySelector('img').alt = mockData[i].offer.title;
    fragment.appendChild(pinElement);
  }
  return fragment;
};

// создание карточки объявления
var createCardElement = function (object) {
  var cardTemplate = template.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = object.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = object.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TypeLabel[object.offer.type.toUpperCase()];
  cardElement.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  // список удобств
  var featureList = cardElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  for (var i = 0; i < object.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + object.offer.features[i] + '');
    featureList.appendChild(li);
  }
  cardElement.querySelector('.popup__description').textContent = object.offer.description;

  // вставка фотографий
  var photosList = cardElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
  for (i = 0; i < object.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = object.offer.photos[i];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    photosList.appendChild(img);
  }
  cardElement.querySelector('.popup__avatar').src = object.author.avatar;
  return cardElement;
};

map.classList.remove('map--faded');
document.querySelector('.map__pins').appendChild(createPin(NUMBER_OF_OBJECTS));
map.insertBefore(createCardElement(mockData[0]), map.querySelector('.map__filters-container'));