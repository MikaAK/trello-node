'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrelloUrl = exports.createRequest = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRELLO_BASE_URL = 'https://api.trello.com/1/';

var createTrelloUrl = function createTrelloUrl(url, key, secret) {
  if (url.indexOf('?') === -1) url += '?';

  url += 'key=' + key + '&token=' + secret;

  return (TRELLO_BASE_URL + url).replace('1//', '1/');
};

var createRequest = function createRequest(type, url) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)({ method: type.toUpperCase(), url: url }, function (err, resp, body) {
      if (err) reject(err);else {
        var data;

        try {
          data = body ? JSON.parse(body) : body;
        } catch (e) {
          data = body;
        }

        resolve(data, resp);
      }
    });
  });
};

exports.createRequest = createRequest;
exports.createTrelloUrl = createTrelloUrl;