import request from 'request'

const TRELLO_BASE_URL = 'https://api.trello.com/1/'

var debug = function(...args) {
  if (process.env.NODE_ENV === 'development')
    console.log(...args) // eslint-disable-line
}

var createTrelloUrl = function(url, {appKey, secret}) {
  if (url.indexOf('?') === -1)
    url += '?'

  url += `key=${appKey}&token=${secret}`

  return (TRELLO_BASE_URL + url).replace('1//', '1/')
}

var createRequest = function(type, url, config, data) {
  return new Promise(function(resolve, reject) {
    var params = {
      method: type.toUpperCase(),
      url: createTrelloUrl(url, config)
    }

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
  .then(resp => {
    if (resp === 'invalid key') {
      debug(`Key: ${config.appKey} - Secret: ${config.secret}`)
      throw new Error('Trello key is invalid')
    }

    return resp
  })
}

export {createRequest, debug}
