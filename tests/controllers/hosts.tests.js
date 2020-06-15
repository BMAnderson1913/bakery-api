/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')

const { getAllHosts, getHostByFirstOrLastName, addNewHost, deleteHost } = require('../../controllers/hosts')

const {
  allHosts,
  hostByName,
  newHost
} = require('../mocks/podcasts')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - hosts', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedHostsFindAll
  let stubbedHostsFindOne
  let stubbedHostsCreate
  let stubbedHostsDestroy

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedHostsDestroy = sandbox.stub(models.hosts, 'destroy')
    stubbedHostsFindAll = sandbox.stub(models.hosts, 'findAll')
    stubbedHostsFindOne = sandbox.stub(models.hosts, 'findOne')
    stubbedHostsCreate = sandbox.stub(models.hosts, 'create')
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

  describe('hosts', () => {
    describe('getAllHosts', () => {
      it('returns a list of podcast hosts', async () => {
        stubbedHostsFindAll.returns(allHosts)


        await getAllHosts({}, response)

        expect(stubbedHostsFindAll).to.have.been.calledWith()
        expect(response.send).to.have.been.calledWith(allHosts)
      })

      it('returns a 500 error when the database call fails', async () => {
        stubbedHostsFindAll.throws('ERROR!')

        await getAllHosts({}, response)

        expect(stubbedHostsFindAll).to.have.been.calledWith()
        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve podcast hosts, please try again.')
      })
    })

    describe('getHostByFirstOrLastName', () => {
      it('returns the host(s) associated with the name provided', async () => {
        stubbedHostsFindOne.returns(hostByName)
        const request = { params: { id: 'Kramer' } }

        await getHostByFirstOrLastName(request, response)

        expect(stubbedHostsFindOne).to.be.calledWith({
          where: { lastName: request.params.id, firstName: request.params.id },
          include: [{
            model: models.podcasts,
            include: [{ model: models.companies }],
          }]
        })
        expect(stubbedSend).to.have.been.calledWith(hostByName)
        // expect(stubbedStatus).to.have.been.calledWith(200),
        console.log(hostByName)
      })

      it('returns a 404 when no host can be found matching the name provided', async () => {
        stubbedHostsFindOne.returns(null)

        const request = { params: { id: 'Kramer' } }

        await getHostByFirstOrLastName(request, response)

        expect(stubbedHostsFindOne).to.be.calledWith({
          where: { lastName: request.params.id, firstName: request.params.id },
          include: [{
            model: models.podcasts,
            include: [{ model: models.companies }],
          }]
        })
        expect(stubbedStatus).to.have.been.calledWith(404)
        expect(stubbedStatusDotSend).to.have.been.calledWith('Sorry that host is not listed.')
      })

      it('returns a 500 error when the database call fails', async () => {
        stubbedHostsFindOne.throws('ERROR!')

        await getHostByFirstOrLastName({}, response)

        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve host, please try again.')
      })
    })
  })

  describe('addNewHost', () => {
    it('returns a 201 with the new host when added successfully', async () => {
      stubbedHostsCreate.returns([hostByName, false])

      const request = { body: newHost }

      await addNewHost(request, response)

      expect(stubbedHostsCreate).to.have.been.calledWith(newHost)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(hostByName)
    })
  })

  it('returns a 400 when required fields are not completed', async () => {
    const request = {
      body: {
        firstName: 'Katie', lastName: ''
      }
    }

    await addNewHost(request, response)

    expect(stubbedHostsCreate).to.have.callCount(0)
    expect(response.status).to.have.been.calledWith(400)
    expect(stubbedStatusDotSend).to.have.been
      .calledWith('Both first and last name are required.')
  })
  it('returns a 500 error when the database call fails', async () => {
    stubbedHostsCreate.throws('ERROR!')

    await addNewHost({}, response)

    expect(response.status).to.have.been.calledWith(500)
    expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to add new host. Please try again.')
  })
})










