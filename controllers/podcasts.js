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

const getPodcastByIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params

    const podcast = await models.podcasts.findOne({
      where: {
        [models.Sequelize.Op.or]: [
          { id: identifier },
          { title: { [models.Sequelize.Op.like]: `%${identifier}%` } },
        ]
      },
      include: [{ model: models.companies }, { model: models.hosts }],
    })

    return podcast
      ? response.send(podcast)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllPodcasts, getPodcastByIdentifier }
