// /* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')

const { getAllCompanies, getCompanyByName } = require('../../controllers/companies')

const {
  allCompanies,
  companyByName,
} = require('../mocks/podcasts')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - companies', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedCompaniesFindAll
  let stubbedCompaniesFindOne

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedCompaniesFindAll = sandbox.stub(models.companies, 'findAll')
    stubbedCompaniesFindOne = sandbox.stub(models.companies, 'findOne')
    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getAllCompanies', () => {
    it('returns a list of companies', async () => {
      stubbedCompaniesFindAll.returns(allCompanies)

      await getAllCompanies({}, response)

      expect(stubbedCompaniesFindAll).to.have.been.calledWith()
      expect(response.send).to.have.been.calledWith(allCompanies)
    })

    it('returns a 500 error when the database call fails', async () => {
      stubbedCompaniesFindAll.throws('ERROR!')

      await getAllCompanies({}, response)

      expect(stubbedCompaniesFindAll).to.have.been.calledWith()
      expect(response.status).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve companies, please try again.')
    })
  })

  describe('getCompanyByName', () => {
    it('returns the company with the name provided', async () => {
      stubbedCompaniesFindOne.returns(companyByName)

      const request = { params: { companyName: 'Cadence13' } }

      await getCompanyByName(request, response)

      expect(stubbedCompaniesFindOne).to.be.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            // { id: companyName },
            { companyName: { [models.Sequelize.Op.like]: `%${request.params.companyName}%` } },
          ]
        },

        include: [{
          model: models.podcasts,
          include: [{ model: models.hosts }],
        }]
      })
    })

    it('returns a 404 when no matching company can be found', async () => {
      stubbedCompaniesFindOne.returns(null)

      const request = { params: { identifier: 'Cadence13' } }

      await getCompanyByName(request, response)

      expect(stubbedCompaniesFindOne).to.have.been.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: request.params.identifier },
            { companyName: { [models.Sequelize.Op.like]: `%${request.params.identifier}%` } }
          ]
        },
        include: [{
          model: models.podcasts,
          include: [{ model: models.hosts }],
        }]
      })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to find a company matching that name.')
    })

    it('returns a 500 error when the database calls fails', async () => {
      stubbedCompaniesFindOne.throws('ERROR!')

      const request = { params: { identifier: 'Cadence13' } }

      await getCompanyByName(request, response)

      expect(stubbedCompaniesFindOne).to.have.been.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: request.params.identifier },
            { companyName: { [models.Sequelize.Op.like]: `%${request.params.identifier}%` } }
          ]
        },
        include: [{
          model: models.podcasts,
          include: [{ model: models.hosts }],
        }]
      })
      expect(response.status).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve companies, please try again.')
    })
  })
})


