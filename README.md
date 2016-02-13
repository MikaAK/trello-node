Trello Node
===

Provides a means to access the trello api via promises and node.

#### Inspirations 
Inspired by [adunkman/node-trello](https://github.com/adunkman/node-trello) but was getting
errors and weird symbol responses

## Methods

There are 4 different api methods, each returns a promise

- `get` -> (url)
- `post` -> (url, data)
- `put` -> (url, data)
- `delete` -> (url)

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
