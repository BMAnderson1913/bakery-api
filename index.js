const express = require('express')
const characterData = require('./schittscreek')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  return response.render('index', { characterData })
})

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(4053, () => {
  console.log('Listening on 4053...') // eslint-disable-line no-console
})
