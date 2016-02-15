'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = exports.createRequest = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TRELLO_BASE_URL = 'https://api.trello.com/1/';

var debug = function debug() {
  var _console;

  if (process.env.NODE_ENV === 'development') (_console = console).log.apply(_console, arguments); // eslint-disable-line
};

var createTrelloUrl = function createTrelloUrl(url, _ref) {
  var appKey = _ref.appKey;
  var secret = _ref.secret;

  if (url.indexOf('?') === -1) url += '?';

  url += 'key=' + appKey + '&token=' + secret;

  return (TRELLO_BASE_URL + url).replace('1//', '1/');
};

var createRequest = function createRequest(type, url, config, data) {
  return new Promise(function (resolve, reject) {
    var params = {
      method: type.toUpperCase(),
      url: createTrelloUrl(url, config)
    };

    if (data) params.formData = data;

    (0, _request2.default)(params, function (err, resp, body) {
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
  }).then(function (resp) {
    if (resp === 'invalid key') {
      debug('Key: ' + config.appKey + ' - Secret: ' + config.secret);
      throw new Error('Trello key is invalid');
    }

    return resp;
  });
};

exports.createRequest = createRequest;
exports.debug = debug;