const express = require('express')
const schittscreek = require('./schittscreek')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (request, response) => {
  return response.render('index', { schittscreek })
})

// app.get('/characterData/:id', (request, response) => {
//   const name = schittscreek.name.find((season) => name.number === parseInt(request.params.id))

//   return response.render('name', { name })
// })

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(8009, () => {
  console.log('Listening on 8009...') // eslint-disable-line no-console
})
