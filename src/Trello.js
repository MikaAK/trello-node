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
