'use strict';
(function () {

  var ESC_KEYCODE = 27;

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
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinsContainer = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');

  var renderCard = function (object) {
    map.insertBefore(window.card.createCard(object), filtersContainer);
  };


  var renderPin = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pins.createPin(array[i]));
    }
    pinsContainer.appendChild(fragment);
  };


  var fakeData = window.data.createDataArray();

  var getMapPinCoords = function () {
    var mapPinPosition = {
      x: mainPin.offsetLeft + Math.floor(mainPin.offsetWidth / 2),
      y: mainPin.offsetTop + mainPin.offsetHeight
    };
    return mapPinPosition;
  };

  var onActivateMouseup = function () {
    map.classList.remove('map--faded');
    window.form.onActivateform();
    renderPin(fakeData);
    mainPin.removeEventListener('mouseup', onActivateMouseup);
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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      var PinSize = document.querySelector('.map__pin').offsetWidth;
      var Border = {
        TOP: DragLimit.Y.MIN - mainPin.offsetHeight,
        BOTTOM: DragLimit.Y.MAX - mainPin.offsetHeight,
        LEFT: DragLimit.X.MIN,
        RIGHT: DragLimit.X.MAX - mainPin.offsetWidth
      };

      if (mapPinPosition.x >= Border.LEFT && mapPinPosition.x <= Border.RIGHT) {
        mainPin.style.left = mapPinPosition.x + 'px';
        DragLimit.x = mapPinPosition.x + Math.ceil(PinSize.WIDTH / 2);
      }

      if (mapPinPosition.y >= Border.TOP && mapPinPosition.y <= Border.BOTTOM) {
        mainPin.style.top = mapPinPosition.y + 'px';
        DragLimit.x = mapPinPosition.x + Math.ceil(PinSize.WIDTH / 2);
      }
      window.form.fillAddress(DragLimit.x, DragLimit.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.card = {
    closeCard: closeCard,
    openCard: openCard,
    getMapPinCoords: getMapPinCoords
  };
})();
