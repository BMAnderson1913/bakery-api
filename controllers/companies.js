const models = require('../models')

const getAllCompanies = async (request, response) => {
  try {
    const companies = await models.companies.findAll()

    return response.send(companies)
  } catch (error) {
    return response.status(500).send('Unable to retrieve companies, please try again.')
  }
}

const getCompanyByName = async (request, response) => {
  try {
    const { companyName } = request.params

    const company = await models.companies.findAll({
      where: {
        [models.Sequelize.Op.or]: [
          // { id: companyName },
          { companyName: { [models.Sequelize.Op.like]: `%${companyName}%` } },
        ]
      },

      include: [{
        model: models.podcasts,
        include: [{ model: models.hosts }],
      }]
    })

    return company
      ? response.send(company)
      : response.status(404).send('Unable to find a company matching that name.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve companies, please try again.')
  }
}

module.exports = { getAllCompanies, getCompanyByName }



