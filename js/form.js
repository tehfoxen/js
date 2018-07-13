'use strict';

(function () {

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');

  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = true;
  }



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

  type.addEventListener('change', function () {
    var typeValue = window.data.BuildingPrices[type.value];
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

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var submit = document.querySelector('.ad-form__submit');

  var checkPlaceValidity = function () {
    var roomGuests = window.data.guestsByRooms[rooms.value];
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
  });
  window.form = {

  };
})();
