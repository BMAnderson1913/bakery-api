const models = require('../models')

const getAllHosts = async (request, response) => {
  try {
    const hosts = await models.hosts.findAll()

    return response.send(hosts)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getHostById = async (request, response) => {
  try {
    const { id } = request.params

    const host = await models.hosts.findOne({
      where: { id },
      include: [{
        model: models.podcasts,
        include: [{ model: models.companies }]
      }]
    })

    return host
      ? response.send(host)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllHosts, getHostById }

