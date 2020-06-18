const models = require('../models')

const getAllPodcasts = async (request, response) => {
  try {
    const podcasts = await models.podcasts.findAll({
      include: [{ model: models.companies }, { model: models.hosts }]
    })

    return response.send(podcasts)
  } catch (error) {
    return response.status(500).send('Unable to retrieve podcasts, please try again.')
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
      : response.status(404).send('Sorry, that is not in my list of favorite podcasts.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve podcasts, please try again.')
  }
}
const addNewPodcast = async (request, response) => {
  try {
    const { podcastName, numberOfEpisodes, applePodcastsRating, companyId } = request.body

    if (!podcastName || !numberOfEpisodes || !applePodcastsRating || !companyId) {
      return response.status(404).send('Please complete all fields.')
    }
    const newPodcast = await models.podcasts.create({
      podcastName, numberOfEpisodes, applePodcastsRating, companyId
    })

    return response.status(201).send(newPodcast)
  } catch (error) {
    return response.status(500).send('Unable to add new podcast. Please try again.')
  }
}
const deletePodcast = async (request, response) => {
  try {
    const { podcastName } = request.params

    const podcast = await models.podcasts.findOne({ where: { podcastName } })

    if (!podcastName) return response.status(404).send('Sorry that podcast is not listed.')

    await models.podcastHosts.destroy({ where: { podcastId: podcast.podcastId } })
    await models.podcasts.destroy({ where: { podcastName } })

    return response.send('Podcast has been successfully deleted.')
  } catch (error) {
    return response.status(500).send('Unable to delete podcast, please try again.')
  }
}

module.exports = { getAllPodcasts, getPodcastByName, addNewPodcast, deletePodcast }
