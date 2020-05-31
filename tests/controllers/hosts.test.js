const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllHosts, getHostByName } = require('../../controllers/hosts')
const { allHosts, hostByName } = require('../mocks/hosts')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - hosts', () => {
  let response
  let sandbox
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.hosts, 'findAll')

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
  describe('getAllHosts', () => {
    it('gets a list of all hosts from the database and sends the JSON using response.send()', async () => {
      stubbedFindAll.returns(allHosts)

      await getAllHosts({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allHosts)
    })

    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllHosts({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve hosts, please try again')
    })
  })

  describe('getHostByName', () => {
    it('retrieves the host by name from the database and sends the JSON using response.send()', async () => {
      const request = { params: { identifier: 'Julie' } }

      stubbedFindAll.returns(hostByName)

      await getHostByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
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
      expect(stubbedSend).to.have.been.calledWith(getHostByName)
    })
    it('returns a 404 when no host is found', async () => {
      const request = { params: { identifier: 'Julie' } }

      stubbedFindAll.returns(null)

      await getHostByName(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the host by name', async () => {
      const request = { params: { identifier: 'Julie' } }

      stubbedFindAll.throws('ERROR!')

      await getHostByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
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

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve host, please try again')
    })
  })
})
