'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var template = document.querySelector('template').content;
  var renderPin = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(array.length, 5); i++) {
      fragment.appendChild(createPin(array[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var createPin = function (object) {
    var pin = template.querySelector('.map__pin').cloneNode(true);

    pin.querySelector('img').src = object.author.avatar;
    pin.style.left = object.location.x + 'px';
    pin.style.top = object.location.y + 'px';

    pin.addEventListener('click', function () {
      window.openCard(object);
      pin.classList.add('map__pin--active');
    });

    return pin;
  };

  var deactivate = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pins = {
    render: renderPin,
    deactivate: deactivate

  };
})();
