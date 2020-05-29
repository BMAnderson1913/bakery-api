const models = require('../models')

const getAllCompanies = async (request, response) => {
  try {
    const companies = await models.companies.findAll()

    return response.send(companies)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getCompaniesByIdentifier = async (request, response) => {
  try {
    const { identifier } = request.params
    const companiesByIdentifier = await models.companies.findAll({
      include: [{
        include: [{ model: models.hosts }],
        model: models.podcasts
      }],
      where: {
        [models.Op.or]: [
          { id: { [models.Op.like]: identifier } },
          { name: { [models.Op.like]: `%${identifier.toLowerCase()}%` } }
        ]
      }
    })

    return companiesByIdentifier.length
      ? response.send(companiesByIdentifier)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllCompanies, getCompaniesByIdentifier }
