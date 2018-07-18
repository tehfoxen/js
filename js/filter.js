'use strict';

(function () {
  var PINS = 5;

  var PriceFilter = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var filterItems = filter.querySelectorAll('select, input');
  var data = [];
  var filterData = [];

  var filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceFilter[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.utils.debounce(function () {
    filterData = data.slice(0);
    filterData = filterData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    window.pins.removePins();
    window.map.removeMapCard();
    window.pins.renderPin(filterData.slice(0, PINS));
  });

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFiltration = function (adData) {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, PINS);
  };

  var deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
