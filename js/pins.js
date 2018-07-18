'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var renderPin = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.pins.createPin(array[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var createPin = function (object) {
    var pin = template.querySelector('.map__pin').cloneNode(true);

    pin.querySelector('img').src = object.author.avatar;
    pin.style.left = object.location.x + 'px';
    pin.style.top = object.location.y + 'px';

    pin.addEventListener('click', function () {
      window.card.openCard(object);
    });

    return pin;
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
  };

  window.pins = {
    createPin: createPin,
    renderPin: renderPin,
    removePins: removePins

  };
})();
