import {createRequest, createTrelloUrl} from './helpers'

export default class Trello {
  constructor(appKey, secret) {
    this.key = appKey
    this.secret = secret
  }

  createUrl(url) {
    return createTrelloUrl(url, this.key, this.secret)
  }

  getAuthorizeUrl() {
    return `https://trello.com/1/connect?key=${this.key}&name=Edvisor&response_type=token&expiration=never&scope=read,write`
  }

  setToken(token) {
    this.secret = token
  }

  get(url) {
    return createRequest('get', this.createUrl(url))
  }

  post(url) {
    return createRequest('post', this.createUrl(url))
  }

  put(url) {
    return createRequest('put', this.createUrl(url))
  }

  delete() {
    return createRequest('delete', this.createUrl(url))
  }
}
