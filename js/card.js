'use strict';
(function () {
  var TypeLabel = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var template = document.querySelector('template').content;
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
      window.card.closeCard();
    });

    return card;
  };

  window.card = {
    createCard: createCard

  };
})();
