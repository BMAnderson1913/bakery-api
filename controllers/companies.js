const models = require('../models')

const getAllCompanies = async (request, response) => {
  try {
    const companies = await models.companies.findAll()

    return response.send(companies)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getCompanyByName = async (request, response) => {
  try {
    const { identifier } = request.params

    const company = await models.companies.findAll({
      where: {
        [models.Sequelize.Op.or]: [
          { id: identifier },
          { companyName: { [models.Sequelize.Op.like]: `%${identifier}%` } },
        ]
      },

      include: [{
        model: models.podcasts,
        include: [{ model: models.hosts }],
      }]
    })

    return company
      ? response.send(company)
      : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

module.exports = { getAllCompanies, getCompanyByName }



