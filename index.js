
const express = require('express')
const { getAllCompanies, getCompanyByIdentifier } = require('./controllers/companies')
const { getAllHosts, getHostById } = require('./controllers/hosts')
const { getAllPodcasts, getPodcastByIdentifier } = require('./controllers/podcasts')

const app = express()

app.get('/companies', getAllCompanies)
app.get('/companies/:identifier', getCompanyByIdentifier)

app.get('/hosts', getAllHosts)
app.get('/hosts/:id', getHostById)

app.get('/podcasts', getAllPodcasts)
app.get('/podcasts/:identifier', getPodcastByIdentifier)

app.listen(8820, () => {
  console.log('Listening on port 8820...') // eslint-disable-line no-console
})
