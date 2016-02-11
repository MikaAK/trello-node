'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trello = (function () {
  function Trello(appKey, secret) {
    _classCallCheck(this, Trello);

    this.key = appKey;
    this.secret = secret;
  }

  _createClass(Trello, [{
    key: 'createUrl',
    value: function createUrl(url) {
      return (0, _helpers.createTrelloUrl)(url, this.key, this.secret);
    }
  }, {
    key: 'getAuthorizeUrl',
    value: function getAuthorizeUrl() {
      return 'https://trello.com/1/connect?key=' + this.key + '&name=Edvisor&response_type=token&expiration=never&scope=read,write';
    }
  }, {
    key: 'setToken',
    value: function setToken(token) {
      this.secret = token;
    }
  }, {
    key: 'get',
    value: function get(url) {
      return (0, _helpers.createRequest)('get', this.createUrl(url));
    }
  }, {
    key: 'post',
    value: function post(url) {
      return (0, _helpers.createRequest)('post', this.createUrl(url));
    }
  }, {
    key: 'put',
    value: function put(url) {
      return (0, _helpers.createRequest)('put', this.createUrl(url));
    }
  }, {
    key: 'delete',
    value: function _delete() {
      return (0, _helpers.createRequest)('delete', this.createUrl(url));
    }
  }]);

  return Trello;
})();

exports.default = Trello;