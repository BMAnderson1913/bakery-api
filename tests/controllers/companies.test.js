const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllCompanies, getCompanyByName } = require('../../controllers/companies')
const { allCompanies, podcastByName } = require('../mocks/companies')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - companies', () => {
  let response
  let sandbox
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.companies, 'findAll')

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
  describe('getallCompanies', () => {
    it('gets a list of all companies from the database and sends the JSON using response.send()', async () => {
      stubbedFindAll.returns(allCompanies)

      await getAllCompanies({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allCompanies)
    })

    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllCompanies({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve companies, please try again')
    })
  })

  describe('getCompanyByName', () => {
    it('retrieves the company by name from the database and sends the JSON using response.send()', async () => {
      const request = { params: { identifier: 'Cadence13' } }

      stubbedFindAll.returns(podcastByName)

      await getCompanyByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: identifier },
            { companyName: { [models.Sequelize.Op.like]: `%${identifier}%` } },
          ]
        },
        include: [{
          model: models.companies,
          include: [{ model: models.hosts }],
        }]
      })
    })
    expect(stubbedSend).to.have.been.calledWith(getCompanyByName)
  })
  it('returns a 404 when no podcast is found', async () => {
    const request = { params: { companyName: 'Cadence13' } }

    stubbedFindAll.returns(null)

    await getCompanyByName(request, response)

    expect(stubbedSendStatus).to.have.been.calledWith(404)
  })
  it('returns a 500 status when an error occurs retrieving the company by name', async () => {
    const request = { params: { companyName: 'Cadence13' } }

    stubbedFindAll.throws('ERROR!')

    await getCompanyByName(request, response)

    expect(stubbedFindAll).to.have.been.calledWith({
      include: [
        { model: models.hosts },
      ],
      where: {
        podcastName: { [models.Op.like]: `%${request.params.companyName}%` }
      },
    })
    expect(stubbedStatus).to.have.been.calledWith(500)
    expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve company, please try again')
  })
})


