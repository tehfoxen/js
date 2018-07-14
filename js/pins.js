'use strict';

(function () {
  var template = document.querySelector('template').content;
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

  window.pins = {
    createPin: createPin

  };
})();
