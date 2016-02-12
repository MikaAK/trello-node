import request from 'request'

const TRELLO_BASE_URL = 'https://api.trello.com/1/'

var createTrelloUrl = function(url, key, secret) {
  if (url.indexOf('?') === -1)
    url += '?'

  url += `key=${key}&token=${secret}`

  return (TRELLO_BASE_URL + url).replace('1//', '1/')
}

var createRequest = function(type, url, data) {
  return new Promise(function(resolve, reject) {
    var params = {method: type.toUpperCase(), url}

    if (data)
      params.formData = data

    request(params, function(err, resp, body) {
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
