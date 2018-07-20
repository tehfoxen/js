'use strict';

(function () {

  var BuildingPrices = {
    'palace': 10000,
    'house': 5000,
    'flat': 1000,
    'bungalo': 0
  };
  var MAIN_PIN_DEFAULT_X = 600;
  var MAIN_PIN_DEFAULT_Y = 380;
  var Adform = document.querySelector("form");
  var form = document.querySelector('.ad-form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var addressInput = form.querySelector('#address');
  var resetBtn = document.querySelector('.ad-form__reset');
  var fieldsets = form.querySelectorAll('fieldset');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var submit = document.querySelector('.ad-form__submit');
  var Adsubmit = Adform.querySelector("[type=\"submit\"]");

  
  Adform.addEventListener("submit", function(evt) {
    evt.preventDefault();
  });
  
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = true;
  }

  var onActivateform = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };
    


  addressInput.value = MAIN_PIN_DEFAULT_X + ', ' + MAIN_PIN_DEFAULT_Y;
  var fillAddress = function () {
    var addressInputCoords = window.map.getMapPinCoords();
    addressInput.value = addressInputCoords.x + ', ' + addressInputCoords.y;
  };

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
    var typeValue = BuildingPrices[type.value];
    price.min = typeValue;
    price.placeholder = typeValue;
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  var guestsByRooms = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var checkPlaceValidity = function () {
    var roomGuests = guestsByRooms[rooms.value];
    if (roomGuests.indexOf(+guests.value) === -1) {
      guests.setCustomValidity('Количество гостей не влезут в выбранную комнату');
    } else {
      guests.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  guests.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  submit.addEventListener('click', function () {
    checkPlaceValidity();
    window.filter.deactivate();
    var formData = new FormData(form);
    window.backend.upload(onActivateform, onSubmitError, formData);
  });

  var onSubmitError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.filter.deactivate();
  });


  window.form = {
    fillAddress: fillAddress,
    activate: onActivateform
  };
})();
