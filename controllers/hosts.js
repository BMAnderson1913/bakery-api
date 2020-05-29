const models = require('../models')

const getAllHosts = async (request, response) => {
  try {
    const hosts = await models.hosts.findAll()

    return response.send(hosts)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getHostsWithIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params
    const hostsWithIdentifier = await models.hosts.findOne({
      where: { identifier },
      include: [{ include: [{ model: models.companies }], model: models.podcasts }],
    })

    return hostsWithIdentifier
      ? response.send(hostsWithIdentifier)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllHosts, getHostsWithIdentifier }

