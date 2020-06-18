const models = require('../models')

const getAllHosts = async (request, response) => {
  try {
    const hosts = await models.hosts.findAll()

    return response.send(hosts)
  } catch (error) {
    return response.status(500).send('Unable to retrieve podcast hosts, please try again.')
  }
}

const getHostByFirstOrLastName = async (request, response) => {
  try {
    const { identifier } = request.params

    const host = await models.hosts.findOne({
      where: {
        [models.Sequelize.Op.or]: [
          { id: identifier },
          { lastName: { [models.Sequelize.Op.like]: `%${identifier}%` } },
          { firstName: { [models.Sequelize.Op.like]: `%${identifier}%` } },
        ]
      },
      include: [{
        model: models.podcasts,
        include: [{ model: models.companies }],
      }]
    })

    return host
      ? response.send(host)
      : response.status(404).send('Sorry that host is not listed.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve host, please try again.')
  }
}

const addNewHost = async (request, response) => {
  try {
    const {
      firstName, lastName
    } = request.body

    if (!firstName || !lastName) {
      return response.status(400).send('Both first and last name are required.')
    }

    const newHost = await models.hosts.create({
      firstName, lastName
    })

    return response.status(201).send(newHost)
  } catch (error) {
    return response.status(500).send('Unable to add new host. Please try again.')
  }
}

const deleteHost = async (request, response) => {
  try {
    const { firstName, lastName } = request.body

    const host = await models.hosts.findOne({ where: { firstName, lastName } })

    if (!firstName || !lastName) return response.status(404).send('Sorry that host is not listed.')

    await models.podcastHosts.destroy({ where: { hostId: host.id } })

    await models.hosts.destroy({ where: { firstName, lastName } })

    return response.send('Host has been successfully deleted.')
  } catch (error) {
    return response.status(500).send('Unable to delete host, please try again.')
  }
}




module.exports = { getAllHosts, getHostByFirstOrLastName, addNewHost, deleteHost }


