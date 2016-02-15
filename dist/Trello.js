'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trello = (function () {
  _createClass(Trello, null, [{
    key: 'getAuthorizeUrl',
    value: function getAuthorizeUrl(token) {
      return 'https://trello.com/1/connect?key=' + token + '&name=Edvisor&response_type=token&expiration=never&scope=read,write';
    }
  }]);

  function Trello(appKey, secret) {
    _classCallCheck(this, Trello);

    this.config = { appKey: appKey, secret: secret };
  }

  _createClass(Trello, [{
    key: 'getAuthorizeUrl',
    value: function getAuthorizeUrl() {
      return Trello.getAuthorizeUrl(this.config.appKey);
    }
  }, {
    key: 'setToken',
    value: function setToken(token) {
      this.config.secret = token;
    }
  }, {
    key: 'get',
    value: function get(url) {
      return (0, _helpers.createRequest)('get', url, this.config);
    }
  }, {
    key: 'post',
    value: function post(url, data) {
      return (0, _helpers.createRequest)('post', url, this.config, data);
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      return (0, _helpers.createRequest)('put', url, this.config, data);
    }
  }, {
    key: 'delete',
    value: function _delete() {
      return (0, _helpers.createRequest)('delete', url, this.config);
    }
  }, {
    key: 'getBoard',
    value: function getBoard(boardId) {
      var _this = this;

      return this.get('/boards/' + boardId).then(function (board) {
        return Promise.all([board, _this.getBoardLists(board.id)]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var board = _ref2[0];
        var lists = _ref2[1];

        board.lists = lists;

        return board;
      });
    }
  }, {
    key: 'getListCards',
    value: function getListCards(listId) {
      return this.get('/list/' + listId + '/cards');
    }
  }, {
    key: 'getList',
    value: function getList(listId) {
      var _this2 = this;

      return this.get('/list/' + listId).then(function (list) {
        return Promise.all([list, _this2.getListCards(list.id)]);
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var list = _ref4[0];
        var cards = _ref4[1];

        list.cards = cards;

        return list;
      });
    }
  }, {
    key: 'getBoardLists',
    value: function getBoardLists(boardId) {
      return this.get('/boards/' + boardId + '/lists').then(this.attachCardsToLists.bind(this));
    }
  }, {
    key: 'attachCardsToLists',
    value: function attachCardsToLists(lists) {
      var _this3 = this;

      var promises = lists.map(function (list) {
        return _this3.getListCards(list.id);
      });

      return Promise.all([lists].concat(promises)).then(function (cards) {
        var lists = cards.shift();

        for (var i = 0, k = lists.length; i < k; i++) {
          if (!lists[i].cards) lists[i].cards = [];

          lists[i].cards = cards[i];
        }

        return lists;
      });
    }
  }]);

  return Trello;
})();

exports.default = Trello;