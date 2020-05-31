const models = require('../models')

const getAllPodcasts = async (request, response) => {
  try {
    const podcasts = await models.podcasts.findAll({
      include: [{ model: models.companies }, { model: models.hosts }]
    })

    return response.send(podcasts)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getPodcastByName = async (request, response) => {
  try {
    const { podcastName } = request.params

    const podcast = await models.podcasts.findAll({
      where: {
        podcastName: { [models.Sequelize.Op.like]: `%${podcastName}%` }
      },

      include: [{ model: models.hosts }, { model: models.companies }]
    })

    return podcast
      ? response.send(podcast)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}
const addNewPodcast = async (request, response) => {
  try {
    const {
      podcastName, numberOfEpisodes, applePodcastsRating, companyId
    } = request.body

    if (!podcastName || !numberOfEpisodes || !applePodcastsRating || !companyId) {
      return response.status(400)
        .send('Please complete all fields.')
    }

    const newPodcast = await models.podcasts.create({
      podcastName, numberOfEpisodes, applePodcastsRating, companyId
    })

    return response.status(201).send(newPodcast)
  } catch (error) {
    return response.status(500).send('Unable to add new podcast. Please try again.')
  }
}

module.exports = { getAllPodcasts, getPodcastByName, addNewPodcast }
