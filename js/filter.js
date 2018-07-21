'use strict';

(function () {
  var PINS_LIMIT = 5;

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
  var filteredData = [];

  var filterItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filterByType = function (item) {
    return filterItem(typeSelect, item.offer, 'type');
  };

  var filterByPrice = function (item) {
    var filteredPrice = PriceFilter[priceSelect.value.toUpperCase()];
    return filteredPrice ? item.offer.price >= filteredPrice.MIN && item.offer.price <= filteredPrice.MAX : true;
  };

  var filterByRooms = function (item) {
    return filterItem(roomsSelect, item.offer, 'rooms');
  };

  var filterByGuests = function (item) {
    return filterItem(guestsSelect, item.offer, 'guests');
  };

  var filterByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.debounce(function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
    window.map.removePins();
    window.map.removeMapCard();
    window.pins.renderPin(filteredData.slice(0, PINS_LIMIT));
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

  var activateFiltration = function (object) {
    data = object.slice(0);
    activateFilter();
    return object.slice(0, PINS_LIMIT);
  };

  var deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activateOn: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
