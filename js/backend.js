'use strict';

(function () {
    var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
    var SAVE_URL = 'https://js.dump.academy/keksobooking';
  
    var setupXHR = function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
  
      xhr.timeout = 10000;
  
      xhr.addEventListener('load', function () {
        var errorText;
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          errorText = 'Cтатус ответа:' + xhr.status + ' ' + xhr.statusText;
          onError(errorText);
        }
      });
  
      xhr.addEventListener('error', function () {
        onError('Cтатус ответа:' + xhr.status + ' ' + xhr.statusText);
      });
  
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
  
      return xhr;
    };
  
    var loadData = function (onLoad, onError) {
      var xhr = setupXHR(onLoad, onError);
      xhr.open('GET', LOAD_URL);
      xhr.send();
    };
  
    var saveData = function (onLoad, onError, data) {
      var xhr = setupXHR(onLoad, onError);
      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    };
  
    window.backend = {
      'load': loadData,
      'save': saveData
    };
  })();