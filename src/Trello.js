import {createRequest} from './helpers'

const attachCardsToLists = (Trello) => (lists) => {
  var promises = lists.map(list => Trello.getListCards(list.id))

  return Promise.all([lists].concat(promises))
    .then(function(cards) {
      var lists = cards.shift()

      for (var i = 0, k = lists.length; i < k; i++) {
        if (!lists[i].cards)
          lists[i].cards = []

        lists[i].cards = cards[i]
      }

      return lists
    })
}

export default class Trello {
  static getAuthorizeUrl(token) {
    return `https://trello.com/1/connect?key=${token}&name=Edvisor&response_type=token&expiration=never&scope=read,write`
  }

  constructor(appKey, secret) {
    this.config = {appKey, secret}
  }

  getAuthorizeUrl() {
    return Trello.getAuthorizeUrl(this.config.appKey)
  }

  setToken(token) {
    this.config.secret = token
  }

  get(url) {
    return createRequest('get', url, this.config)
  }

  post(url, data) {
    return createRequest('post', url, this.config, data)
  }

  put(url, data) {
    return createRequest('put', url, this.config, data)
  }

  delete() {
    return createRequest('delete', url, this.config)
  }

  getBoard(boardId) {
    return this.get(`/boards/${boardId}`)
      .then(board => Promise.all([board, this.getBoardLists(board.id)]))
      .then(function([board, lists]) {
        board.lists = lists

        return board
      })
  }

  getListCards(listId) {
    return this.get(`/list/${listId}/cards`)
  }

  getList(listId) {
    return this.get(`/list/${listId}`)
      .then(list => Promise.all([list, this.getListCards(list.id)]))
      .then(function([list, cards]) {
        list.cards = cards

        return list
      })
  }

  getBoardLists(boardId) {
    return this.get(`/boards/${boardId}/lists`)
      .then(attachCardsToLists(this))
  }

  createCard(data) {
    return this.post('/cards', data)
  }

  createCardLabel(cardId, labelData) {
    return this.post(`/cards/${cardId}/labels`, labelData)
  }

  updateCard(cardId, updateData) {
    return this.put(`/cards/${cardId}`, updateData)
  }

  deleteCard(cardId, labelId) {
    return `/cards/${cardId}/idLabels/${labelId}`
  }
}
