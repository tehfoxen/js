'use strict';
(function () {
  var shuffleArray = function (arr) {
    var arrCopy = arr.slice(0);
    return arrCopy.sort(function () {
      return Math.random() - 0.5;
    });
  };

  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomIntegerFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  var sliceArrayRandom = function (array) {
    return array.slice(getRandomIntegerFromInterval(0, array.length));
  };

  var renderErrorMessage = function (errorMessage) {
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  var debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomArrayItem: getRandomArrayItem,
    sliceArrayRandom: sliceArrayRandom,
    shuffleArray: shuffleArray,
    renderErrorMessage: renderErrorMessage,
    debounce: debounce
  };
})();
