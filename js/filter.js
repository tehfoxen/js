'use strict';

(function () {
  var PINS_LIMIT = 5;
  

  var PriceFilter = {
    LOW: 10000,
    HIGH: 50000
  };

  var mapFilter = document.querySelector('.map__filters');
  var typeSelect = mapFilter.querySelector('#housing-type');
  var priceSelect = mapFilter.querySelector('#housing-price');
  var roomsSelect = mapFilter.querySelector('#housing-rooms');
  var guestsSelect = mapFilter.querySelector('#housing-guests');
  var featuresFieldset = mapFilter.querySelector('#housing-features');
  var filterElements = mapFilter.querySelectorAll('select');
  var data = [];
  var filteredData= [];


  var filterByPrice  = function(price) {
      if (price < PriceFilter.LOW) {
        return "low"
      }
      if (price > PriceFilter.HIGH) {
        return "high"
      }
      return "middle";
    };

  var getSelectedFeatures = function() {
    var selectedFeatures = [];
    for (var i = 0; i < featuresFieldset.length; i++) {
      if (featuresFieldset [i].checked) {
        selectedFeatures.push(featuresFieldset [i].value);
      }
    }
    return selectedFeatures;
  };

  var checkIntersection = function(sources, targets) {
    var result = targets.every(function(item) {
      return sources.includes(item);
    });
    return result;
  };

  var creatFilter = window.debounce(function (data) {
    var selectedFeatures = getSelectedFeatures(); 
 

    return data.filter(function (item) {
      if (typeSelect.value !== "any" && item.offer.type !== typeSelect.value) {
        return false;
      }
      if (priceSelect.value !== 'any' && priceSelect.value !== filterByPrice(item.offer.price)) {
        return false;
      }
      if (roomsSelect.value !== "any" && item.offer.rooms !== +roomsSelect.value) {
        return false;
      }
      if (guestsSelect.value !== "any" && item.offer.guests !== +guestsSelect.value) {
        return false;
      }
      if (!checkIntersection(item.offer.features, selectedFeatures)) {
        return false;
      }
      return true;
    });

  });



  var activateFilter = function () {
    filterElements.forEach(function (element) {
      element.disabled = false;
    });
    creatFilter();
    mapFilter.addEventListener('change', creatFilter);
  };

  var deactivateFilter = function () {
    filterElements.forEach(function (element) {
      element.disabled = true;
    });
    resetFilter();
    mapFilter.removeEventListener('change', creatFilter);
  };


  window.filter = {
    activateOn: activateFilter,
    deactivate: deactivateFilter,
  };
})();
