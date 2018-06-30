'use strict';
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 65;
var TAIL_HEIGHT = 22;
var map = document.querySelector('.map');
var similarMarkElement = map.querySelector('.map__pins');
var similarMarkTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

var mapFiltersContainer = document.querySelector('.map__filters-container');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var randomArray = function (array, count) {
  array.sort(function () {
    return Math.random() - 0.5;
  });
  var items = [];
  for (var i = 0; i < count; i++) {
    var item = array[i];
    items.push(item);
  }
  return items;
};

var createMark = function (i) {
  var types = Object.keys(TYPES);
  var mark = {
    offer: {
      title: TITLES[i],
      type: types[getRandomInt(0, types.length)],
      features: randomArray(FEATURES, getRandomInt(1, FEATURES.length)),
      checkin: CHECKINS[getRandomInt(0, CHECKINS.length)],
      checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length)],
      photos: randomArray(PHOTOS, getRandomInt(1, PHOTOS.length)),
      price: getRandomInt(1000, 1000000),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 100),
      description: ''
    },
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(130, 630)
    }
  };
  mark.offer.address = mark.location.x + ', ' + mark.location.y;
  return mark;
};

var renderMark = function (mark) {
  var markElement = similarMarkTemplate.cloneNode(true);

  markElement.style.left = mark.location.x - 25 + 'px';
  markElement.style.top = mark.location.y - 70 + 'px';
  markElement.querySelector('.map__pin img').src = mark.author.avatar;
  markElement.querySelector('.map__pin img').alt = mark.offer.title;
  markElement.addEventListener('click', function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      closeCard();
    }
    mapFiltersContainer.parentNode.insertBefore(renderCard(mark), mapFiltersContainer);
  });

  return markElement;
};

var renderMarksAll = function () {
  var marks = [];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var mark = createMark(i);
    marks.push(mark);
    fragment.appendChild(renderMark(mark));
  }
  return similarMarkElement.appendChild(fragment);
};

var renderFeatures = function (features, container) {
  var content = '';
  for (i = 0; i < features.length; i++) {
    content += '<li class="popup__feature popup__feature--' + features[i] + '"></li>';
  }
  container.innerHTML = content;
};

var photoElementTemplate = document.querySelector('template').content.querySelector('.popup__photo');
var renderPhotos = function (photos, container) {
  container.innerHTML = '';
  for (i = 0; i < photos.length; i++) {
    var photoElement = photoElementTemplate.cloneNode();
    photoElement.src = photos[i];
    container.appendChild(photoElement);
  }
};

// Закрытие/открытие карточки
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

var closeCard = function () {
  var popup = map.querySelector('.map__card');
  map.removeChild(popup);
  document.removeEventListener('keydown', onPopupEscPress);
};

var renderCard = function (mark) {
  var cardElement = similarCardTemplate.cloneNode(true);

  document.addEventListener('keydown', onPopupEscPress);
  var popupClose = cardElement.querySelector('.popup__close');
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
    }
  });

  popupClose.addEventListener('click', function () {
    closeCard();
  });

  cardElement.querySelector('.popup__title').textContent = mark.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mark.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mark.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES[mark.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = mark.offer.rooms + ' комнаты для ' + mark.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mark.offer.checkin + ', выезд до ' + mark.offer.checkout;
  renderFeatures(mark.offer.features, cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = mark.offer.description;
  renderPhotos(mark.offer.photos, cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__avatar').src = mark.author.avatar;

  return cardElement;
};

var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapPinAddress = document.querySelector('#address');
var inactiveFields = document.querySelectorAll('fieldset');

// Определение координат метки
var calculateAddress = function () {
  var mapPinX = parseInt(mapPin.style.left, 10) + MAP_PIN_WIDTH / 2;
  var mapPinY = parseInt(mapPin.style.top, 10) + MAP_PIN_HEIGHT / 2;
  if (!(map.classList.contains('map--faded'))) {
    mapPinY += MAP_PIN_HEIGHT / 2 + TAIL_HEIGHT;
  }
  return mapPinX + ', ' + mapPinY;
};

// Неактивное состояние
for (var i = 0; i < inactiveFields.length; i++) {
  inactiveFields[i].setAttribute('disabled', 'disabled');
}
mapPinAddress.placeholder = calculateAddress();

// Активное состояние
var isMapActive = function () {
  renderMarksAll();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPinAddress.placeholder = calculateAddress();
  for (i = 0; i < inactiveFields.length; i++) {
    inactiveFields[i].removeAttribute('disabled', 'disabled');
  }
};

mapPin.addEventListener('mouseup', function () {
  isMapActive();
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    isMapActive();
  }
});
