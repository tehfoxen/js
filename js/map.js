'use strict';
(function () {
  var DEFAULT_MAIN_PIN_X = 600;
  var DEFAULT_MAIN_PIN_Y = 375;

  var Pin = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 22
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
  var addressCoords = {};

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var activePage = false;

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
  };

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var onLoadSuccess = function (object) {
    window.map.data = object;
    window.pins.render(object);
    window.filter.activateOn();
  };

  var onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  var onActivateMouseup = function () {
    map.classList.remove('map--faded');
    window.backend.load(onLoadSuccess, onLoadError);
    window.form.activate();
  };

  var deactivateMouseup = function () {
    map.classList.add('map--faded');
    removePins();
    removeMapCard();
    mainPin.style.top = DEFAULT_MAIN_PIN_Y - Pin.HEIGHT / 2 + 'px';
    mainPin.style.left = DEFAULT_MAIN_PIN_X - Pin.WIDTH / 2 + 'px';
    activePage = false;
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
      var Border = {
        TOP: DragLimit.Y.MIN - Pin.HEIGHT - Pin.TAIL,
        BOTTOM: DragLimit.Y.MAX - Pin.HEIGHT - Pin.TAIL,
        LEFT: DragLimit.X.MIN,
        RIGHT: DragLimit.X.MAX - Pin.WIDTH
      };

      if (mapPinPosition.x >= Border.LEFT && mapPinPosition.x <= Border.RIGHT) {
        mainPin.style.left = mapPinPosition.x + 'px';
        addressCoords.x = mapPinPosition.x + Math.ceil(Pin.WIDTH / 2);
      }

      if (mapPinPosition.y >= Border.TOP && mapPinPosition.y <= Border.BOTTOM) {
        mainPin.style.top = mapPinPosition.y + 'px';
        addressCoords.y = mapPinPosition.y + Pin.HEIGHT + Pin.TAIL;
      }
      window.form.fillAddress(addressCoords.x, addressCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (!activePage) {
      onActivateMouseup();
      window.form.activate();
      activePage = true;
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    DEFAULT_MAIN_PIN_X: DEFAULT_MAIN_PIN_X,
    DEFAULT_MAIN_PIN_Y: DEFAULT_MAIN_PIN_Y,
    removePins: removePins,
    removeMapCard: removeMapCard,
    deactivate: deactivateMouseup,
    clearPins: removePins,
    resetCard: removeMapCard,
    data: []
  };
})();
