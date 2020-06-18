import express from 'express'
import path from 'path'

import bodyParser from 'body-parser'

import { getAllCompanies, getCompanyByName } from './controllers/companies'
import { getAllPodcasts, getPodcastByName, addNewPodcast } from './controllers/podcasts'

const app = express()

app.use(express.static('public'))

app.get('/api/companies', getAllCompanies)
app.get('/api/companies/:identifier', getCompanyByName)

app.get('/api/podcasts', getAllPodcasts)
app.get('/api/podcasts/:podcastName', getPodcastByName)
app.post('/api/podcasts/', bodyParser.json(), addNewPodcast)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(8820, () => {
  console.log('Listening on port 8820...') // eslint-disable-line no-console
})
