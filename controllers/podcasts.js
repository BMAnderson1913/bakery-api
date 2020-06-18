import models from '../models'

export const getAllPodcasts = async (request, response) => {
  try {
    const podcasts = await models.podcasts.findAll({
      include: [{ model: models.companies }],
    })

    return response.send(podcasts)
  } catch (error) {
    return response.status(500).send('Unable to retrieve podcasts, please try again.')
  }
}

export const getPodcastByName = async (request, response) => {
  try {
    const { podcastName } = request.params

    const podcast = await models.podcasts.findAll({
      where: {
        podcastName: { [models.Op.like]: `%${podcastName}%` },
      },

      include: [{ model: models.companies }],
    })

    return podcast
      ? response.send(podcast)
      : response.status(404).send('Sorry, that is not in my list of favorite podcasts.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve podcasts, please try again.')
  }
}
export const addNewPodcast = async (request, response) => {
  try {
    const { podcastName, numberOfEpisodes, applePodcastsRating, companyId } = request.body

    if (!podcastName || !numberOfEpisodes || !applePodcastsRating || !companyId) {
      return response.status(404).send('Please complete all fields.')
    }
    const newPodcast = await models.podcasts.create({
      podcastName, numberOfEpisodes, applePodcastsRating, companyId,
    })

    return response.status(201).send(newPodcast)
  } catch (error) {
    return response.status(500).send('Unable to add new podcast. Please try again.')
  }
}
