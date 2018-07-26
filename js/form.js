'use strict';

(function () {

  var BuildingPrice = {
    'PALACE': 10000,
    'HOUSE': 5000,
    'FLAT': 1000,
    'BUNGALO': 0
  };
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
  var success = document.querySelector('.success');
  var adFormElements = document.querySelectorAll('.ad-form__element');

  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = true;
  }

  var onActivateform = function () {
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };
  var MAIN_PIN_DEFAULT_X = 600;
  var MAIN_PIN_DEFAULT_Y = 380;

  var setAddressCoords = function () {
    addressInput.value = MAIN_PIN_DEFAULT_X + ', ' + MAIN_PIN_DEFAULT_Y;
  };
  var fillAddress = function () {
    var addressInputCoords = window.map.getMapPinCoords();
    addressInput.value = addressInputCoords.x + ', ' + addressInputCoords.y;
  };

  var deactivateForm = function () {
    form.reset();
    adFormElements.forEach(function (item) {
      item.disabled = true;
    });
    form.classList.add('ad-form--disabled');
    setAddressCoords();
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
  type.addEventListener('change', function (evt) {
    var typeValue = BuildingPrice[evt.target.value.toUpperCase()];
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
    var message = roomGuests.indexOf(+guests.value) === -1 ? 'Количество гостей не влезут в выбранную комнату' : '';
    guests.setCustomValidity('Количество гостей не влезут в выбранную комнату');
    guests.setCustomValidity(message);
  };

  rooms.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  guests.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });

  submit.addEventListener('click', function () {
    checkPlaceValidity();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  });

  var onSubmitError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    form.reset();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
    window.map.getMapPinCoords();
  });

  var onSuccessEscDown = function (evt) {
    window.utils.keyCode(evt, closeSuccess);
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var closeSuccess = function () {
    success.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscDown);
    success.removeEventListener('click', onSuccessClick);
  };

  var showSuccess = function () {
    success.classList.remove('hidden');
    document.addEventListener('keydown', onSuccessEscDown);
    success.addEventListener('click', onSuccessClick);
  };

  var onSubmitSuccess = function () {
    showSuccess();
    deactivateForm();
    window.map.deactivate();
    window.filter.deactivate();
  };


  window.form = {
    fillAddress: fillAddress,
    activate: onActivateform
  };
})();
