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
    const { identifier } = request.params

    const company = await models.companies.findOne({
      where: {
        [models.Op.or]: [
          { id: identifier },
          { companyName: { [models.Op.like]: `%${identifier}%` } },
        ],
      },

      include: [{
        model: models.podcasts,
      }],
    })

    return company
      ? response.send(company)
      : response.status(404).send('Unable to find a company matching that name.')
  } catch (error) {
    return response.status(500).send('Unable to retrieve companies, please try again.')
  }
}

module.exports = { getAllCompanies, getCompanyByName }
