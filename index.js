
const express = require('express')
const bodyParser = require('body-parser')
const { getAllCompanies, getCompanyByName } = require('./controllers/companies')
const { getAllHosts, getHostByFirstOrLastName, addNewHost } = require('./controllers/hosts')
const { getAllPodcasts, getPodcastByName, addNewPodcast } = require('./controllers/podcasts')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (request, response) => {
  return response.status(200).render('index')
})

app.get('/companies', getAllCompanies)
app.get('/companies/:identifier', getCompanyByName)

app.get('/hosts', getAllHosts)
app.get('/hosts/:identifier', getHostByFirstOrLastName)
app.post('/hosts/', bodyParser.json(), addNewHost)

app.get('/podcasts', getAllPodcasts)
app.get('/podcasts/:podcastName', getPodcastByName)
app.post('/podcasts/', bodyParser.json(), addNewPodcast)

app.listen(8820, () => {
  console.log('Listening on port 8820...') // eslint-disable-line no-console
})
