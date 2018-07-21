'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var isEscDown = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };

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
    var errorMesssageBlock = document.querySelector('.error-message');
    if (errorMesssageBlock) {
      errorMesssageBlock.remove();
    }
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  window.utils = {
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomArrayItem: getRandomArrayItem,
    sliceArrayRandom: sliceArrayRandom,
    shuffleArray: shuffleArray,
    renderErrorMessage: renderErrorMessage,
    keyCode: isEscDown
  };
})();
