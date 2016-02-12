import {createRequest, createTrelloUrl} from './helpers'

export default class Trello {
  static getAuthorizeUrl(token) {
    return `https://trello.com/1/connect?key=${token}&name=Edvisor&response_type=token&expiration=never&scope=read,write`
  }

  constructor(appKey, secret) {
    this.key = appKey
    this.secret = secret
  }

  createUrl(url) {
    return createTrelloUrl(url, this.key, this.secret)
  }

  getAuthorizeUrl() {
    return Trello.getAuthorizeUrl(this.key)
  }

  setToken(token) {
    this.secret = token
  }

  get(url) {
    return createRequest('get', this.createUrl(url))
  }

  post(url, data) {
    return createRequest('post', this.createUrl(url), data)
  }

  put(url, data) {
    return createRequest('put', this.createUrl(url), data)
  }

  delete() {
    return createRequest('delete', this.createUrl(url))
  }
}
