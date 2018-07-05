'use strict';

// 1. Константы
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
// 2. Переменные
var template = document.querySelector('template').content;
var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');
var filtersContainer = map.querySelector('.map__filters-container');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var addressInput = form.querySelector('#address');

// 3. Функции
var shuffleArray = function (arr) {
  var arrCopy = arr.slice(0);
  return arrCopy.sort(function () {
    return Math.random() - 0.5;
  });
};

var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var sliceArrayRandom = function (array) {
  return array.slice(getRandomIntegerFromInterval(0, array.length));
};

var createDataArray = function () {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_OBJECTS; i++) {
    var x = getRandomIntegerFromInterval(300, 900);
    var y = getRandomIntegerFromInterval(130, 630);
    arr.push({
      author: {
        avatar: 'img/avatars/user' + (i + 1 < 10 ? '0' : '') + (i + 1) + '.png'
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

var createCard = function (object) {
  var card = template.querySelector('.map__card').cloneNode(true);

  card.querySelector('.popup__avatar').src = object.author.avatar;
  card.querySelector('.popup__title').textContent = object.offer.title;
  card.querySelector('.popup__text--address').textContent =
    object.offer.address;
  card.querySelector('.popup__text--price').textContent =
    object.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent =
    TypeLabel[object.offer.type.toUpperCase()];
  card.querySelector('.popup__text--capacity').textContent =
    object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent =
    'Заезд после ' +
    object.offer.checkin +
    ', выезд до ' +
    object.offer.checkout;
  card.querySelector('.popup__description').textContent =
    object.offer.description;

  var features = card.querySelector('.popup__features');
  features.innerHTML = '';
  for (var i = 0; i < object.offer.features.length; i++) {
    var item = document.createElement('li');
    item.classList.add('popup__feature');
    item.classList.add('popup__feature--' + object.offer.features[i] + '');
    features.appendChild(item);
  }

  var photos = card.querySelector('.popup__photos');
  photos.innerHTML = '';
  for (i = 0; i < object.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = object.offer.photos[i];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    photos.appendChild(img);
  }

  card.querySelector('.popup__close').addEventListener('click', function () {
    closeCard();
  });

  return card;
};

var renderCard = function (object) {
  map.insertBefore(createCard(object), filtersContainer);
};

var onCardEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

var closeCard = function () {
  var card = map.querySelector('.map__card');
  if (card) {
    card.remove();
  }
  document.removeEventListener('keydown', onCardEscKeydown);
};

var openCard = function (object) {
  closeCard();
  renderCard(object);
  document.addEventListener('keydown', onCardEscKeydown);
};

var createPin = function (object) {
  var pin = template.querySelector('.map__pin').cloneNode(true);

  pin.querySelector('img').src = object.author.avatar;
  pin.style.left = object.location.x + 'px';
  pin.style.top = object.location.y + 'px';

  pin.addEventListener('click', function () {
    openCard(object);
  });

  return pin;
};

var renderPin = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i]));
  }
  pinsContainer.appendChild(fragment);
};

// 4. Логика
var fakeData = createDataArray();

for (var j = 0; j < fieldsets.length; j++) {
  fieldsets[j].disabled = true;
}

addressInput.value = MAIN_PIN_DEFAULT_X + ', ' + MAIN_PIN_DEFAULT_Y;

var onActivateMouseup = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  renderPin(fakeData);
  mainPin.removeEventListener('mouseup', onActivateMouseup);
};

mainPin.addEventListener('mouseup', onActivateMouseup);

var title = form.querySelector('input[name=\'title\']');
var type = form.querySelector('select[name=\'type\']');
var price = form.querySelector('input[name=\'price\']');

// Функция установки/удаления валидации
var setFieldValidity = function (field, isValid, message) {
  if (isValid) {
    field.setCustomValidity('');
    field.classList.remove('error');
  } else {
    field.setCustomValidity(message);
    field.classList.add('error');
  }
};

title.addEventListener('invalid', function () {
  setFieldValidity(title, false, 'Заголовок должен быть длиной от 30 до 100 символов');
});

title.addEventListener('input', function () {
  if (title.value.length >= title.minLength && title.value.length <= title.maxLength) {
    setFieldValidity(title, true);
  }
});

price.addEventListener('invalid', function () {
  var validationLabel = 'Цена должна быть от ' + price.min + ' до ' + price.max + ' рублей';
  setFieldValidity(price, false, validationLabel);
});

price.addEventListener('input', function () {
  if (+price.value >= +price.min && +price.value <= +price.max) {
    setFieldValidity(price, true);
  }
});

type.addEventListener('change', function () {
  price.min = +type.value;
  setFieldValidity(price, true);
});

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', function (evt) {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', function (evt) {
  timeIn.value = evt.target.value;
});

var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');
var submit = document.querySelector('input[type=\'submit\']');

var checkPlaceValidity = function () {
  var roomGuests = guestsByRooms[rooms.value]; // Берём массив допустимых гостей для этой комнаты
  if (roomGuests.indexOf(+guests.value) === -1) { // Проверяем, есть ли в нём выбранная
    guests.setCustomValidity('Количество гостей не влезут в выбранную комнату');
  } else {
    guests.setCustomValidity('');
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault(); // Запрещаем отправку формы, для примера
  alert('Форма отправлена');
});

rooms.addEventListener('change', function (evt) {
  evt.target.setCustomValidity(''); // Чтобы пропала красная рамка при изменении значения
});

guests.addEventListener('change', function (evt) {
  evt.target.setCustomValidity(''); // Чтобы пропала красная рамка при изменении значения
});

submit.addEventListener('click', function () {
  checkPlaceValidity(); // Перед отправкой проверяем на валидность
});
