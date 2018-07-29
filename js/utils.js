'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var isEscDown = function (evt, callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      callback();
    }
  };

  var getRandomIntegerFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
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
    renderErrorMessage: renderErrorMessage,
    isEscDown: isEscDown
  };
})();
