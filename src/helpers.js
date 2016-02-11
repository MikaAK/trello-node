import request from 'request'

const TRELLO_BASE_URL = 'https://api.trello.com/1/'

var createTrelloUrl = function(url, key, secret) {
  if (url.indexOf('?') === -1)
    url += '?'

  url += `key=${key}&token=${secret}`

  return (TRELLO_BASE_URL + url).replace('1//', '1/')
}

var createRequest = function(type, url) {
  return new Promise(function(resolve, reject) {
    request({method: type.toUpperCase(), url}, function(err, resp, body) {
      if (err)
        reject(err)
      else {
        var data

        try {
          data = body ? JSON.parse(body) : body
        } catch (e) {
          data = body
        }

        resolve(data, resp)
      }
    })
  })
}

export {createRequest, createTrelloUrl}
