const models = require('../models')

const getAllPodcasts = async (request, response) => {
  try {
    const podcasts = await models.Podcasts.findAll({
      include: [{ model: models.Hosts }, { model: models.Companies }]
    })

    return response.send(podcasts)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getPodcastsByIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params
    const podcastsByIdentifier = await models.podcasts.findAll({
      include: [{ model: models.companies }, { model: models.hosts }],
      where: {
        [models.Op.or]:
          [{ id: { [models.Op.like]: identifier } },
            { title: { [models.Op.like]: `%${identifier.toLowerCase()}%` } }
          ]
      }
    })

    return podcastsByIdentifier
      ? response.send(podcastsByIdentifier)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllPodcasts, getPodcastsByIdentifier }
