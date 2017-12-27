'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Fusion = exports._Fusion = function () {
  function _Fusion() {
    _classCallCheck(this, _Fusion);
  }

  _createClass(_Fusion, null, [{
    key: '_createElements',

    // DOM Manipulation
    value: function _createElements(elTarget, elsArr, attrObj) {
      // add functionality for text elements ie; attrObj.text
      var createdEls = elsArr.map(function (el) {
        // creating a varible for the currently created element
        var createdEl = document.createElement(el);
        // looping over attributes object
        for (var attr in attrObj) {
          createdEl.setAttribute(attr, attrObj[attr]);
        }
        return createdEl;
      });

      createdEls.forEach(function (el) {
        elTarget.appendChild(el);
      });
    }

    // Removing elements

  }, {
    key: '_deleteElement',
    value: function _deleteElement(el) {
      var elParent = el.parentNode;
      elParent.removeChild(el);
      console.log('done');
    }
  }, {
    key: '_removeElements',
    value: function _removeElements(els) {
      els.forEach(function (el) {
        var elParent = el.parentNode;
        elParent.removeChild(el);
      });
    }

    // add methods for text manipulation and css abstraction


    // Set Text

  }, {
    key: '_setText',
    value: function _setText(el, text) {
      el.textContent = text.toString();
    }

    // CSS 

  }, {
    key: '_setClass',
    value: function _setClass(el, classArr) {
      classArr.forEach(function (className) {
        el.classList.add(className);
      });
    }
  }, {
    key: '_removeClass',
    value: function _removeClass(el, classArr) {
      classArr.forEach(function (className) {
        el.classList.remove(className);
      });
    }

    // Add (multiple) CSS styles

  }, {
    key: '_css',
    value: function _css(el, cssObj) {
      for (var prop in cssObj) {
        el.style[prop] = cssObj[prop];
      }
    }

    // AJAX Abstraction
    /// _get returns a Promise so use .then()

  }, {
    key: '_get',
    value: function _get(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
          resolve(JSON.parse(xhr.response));
        };

        xhr.onerror = function (err) {
          reject(err);
        };
        xhr.open('GET', url);

        xhr.send();
      });
    }

    // Send multiple GET request at once 
    /// also returns a promise so use .then()

  }, {
    key: '_sendRequests',
    value: function _sendRequests(urls) {
      var promises = [];
      urls.forEach(function (url) {
        var reqPromise = new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(JSON.parse(xhr.response));
          };

          xhr.onerror = function (err) {
            reject(err);
          };

          xhr.open('GET', url);
          xhr.send();
        });

        promises.push(reqPromise);
      });

      return promises;
    }
  }, {
    key: '_post',
    value: function _post(url, data) {
      var xhr = new XMLHttpRequest();

      // finish

      xhr.open('POST', url);
      xhr.send();
    }

    // DataStores

  }, {
    key: '_createDataStore',
    value: function _createDataStore(storeType, storageName, data) {

      if (!storeType.getItem(storageName)) {
        storeType.setItem(storageName, typeof data !== "string" ? JSON.stringify(data) : data);
        console.log(storageName + ' created!');
      } else {
        console.log('Storage item item already exists in ' + storeType);
      }
    }
  }, {
    key: '_setCookie',
    value: function _setCookie(cookieName, cookieValue) {
      document.cookie = cookieName + '=' + cookieValue;
    }
  }, {
    key: '_cookieExists',
    value: function _cookieExists(cookieName) {
      return document.cookie.includes(cookieName + '=');
    }

    // Array Methods

  }, {
    key: '_findInArray',
    value: function _findInArray(arr, arrEl) {
      return arr.find(function (curr) {
        return curr === arrEl;
      });
    }

    // Object Methods

  }, {
    key: '_copyObject',
    value: function _copyObject(target, source) {
      Object.assign(target, source);
    }
  }]);

  return _Fusion;
}();

// Examples

/// Appending new elements

///const container = document.querySelector('.container');

//_Fusion._createElements(container, ['input', 'input'], {'type': 'text', 'class': 'text', 'placeholder': 'testBrah'});

// AJAX

//console.log(_Fusion._get('https://jsonplaceholder.typicode.com/photos'));