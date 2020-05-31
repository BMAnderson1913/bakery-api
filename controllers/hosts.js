const models = require('../models')

const getAllHosts = async (request, response) => {
  try {
    const hosts = await models.hosts.findAll()

    return response.send(hosts)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getHostByFirstOrLastName = async (request, response) => {
  try {
    const { identifier } = request.params

    const host = await models.hosts.findAll({
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
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const addNewHost = async (request, response) => {
  try {
    const {
      firstName, lastName
    } = request.body

    if (!firstName || !lastName) {
      return response.status(400)
        .send('Both first and last name are required.')
    }

    const newHost = await models.hosts.create({
      firstName, lastName
    })

    return response.status(201).send(newHost)
  } catch (error) {
    return response.status(500).send('Unable to add new host. Please try again.')
  }
}


module.exports = { getAllHosts, getHostByFirstOrLastName, addNewHost }


