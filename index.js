const express = require('express')
const { getAllHosts, getHostsByIdentifier } = require('./controllers/hosts.js')
const { getAllCompanies, getCompaniesByIdentifier } = require('./controllers/companies.js')
const { getAllPodcasts, getAllPodcastsByIdentiier } = require('./controllers/podcasts.js')

const app = express()

app.get('/companies', getAllCompanies)
app.get('/companies/:identifier', getCompaniesByIdentifier)
app.get('/hosts', getAllHosts)
app.get('/hosts/:identifier', getHostsByIdentifier)
app.get('/podcasts', getAllPodcasts)
app.get('/podcasts/:identifier', getAllPodcastsByIdentiier)

app.listen(5500, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 5500...')
})
