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
  window.utils = {
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomArrayItem: getRandomArrayItem,
    sliceArrayRandom: sliceArrayRandom,
    shuffleArray: shuffleArray
  };
})();
