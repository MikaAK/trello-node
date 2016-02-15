Trello Node
=====

Provides a means to access the trello api via promises and node.

## Methods

```
Trello.get(url)
Trello.post(url, data)
Trello.put(url, data)
Trello.delete(url)
Trello.getBoard(boardId) // Returns Board with lists and cards
Trello.getList(listId) // Returns list with cards
Trello.getListCards(listId)
```

There is also `getAuthorizeUrl` which allows you to get a bigger token that's longer lasting
you can then set your token with `setToken`

## Examples

```
var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_SECRET)


trello.get('member/me/boards')
  .then(function(data, response) {
    console.log(data)
  })
  .catch(error => throw error)
```
