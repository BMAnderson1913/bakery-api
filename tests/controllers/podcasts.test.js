const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllPodcasts, getPodcastByName } = require('../../controllers/podcasts')
const { allPodcasts, podcastByName } = require('../mocks/podcasts')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - podcasts', () => {
  let response
  let sandbox
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.podcasts, 'findAll')

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
  describe('getAllPodcasts', () => {
    it('gets a list of all podcasts from the database and sends the JSON using response.send()', async () => {
      stubbedFindAll.returns(allPodcasts)

      await getAllPodcasts({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(allPodcasts)
    })

    it('responds with a 500 status and error message with the database call throws an error', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllPodcasts({}, response)

      expect(stubbedFindAll).to.have.been
        .calledWith({ attributes: ['podcastName', 'numberOfEpisodes', 'applePodcastRating', 'companyId'] })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve podcasts, please try again')
    })
  })

  describe('getPodcastByName', () => {
    it('retrieves the podcast by name from the database and sends the JSON using response.send()', async () => {
      const request = { params: { podcastName: 'Comments by Celebs' } }

      stubbedFindAll.returns(podcastByName)

      await getPodcastByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        include: [{ model: models.hosts }],
        where: {
          podcastName: { [models.Sequelize.Op.like]: `%${request.params.podcastName}%` }
        },
      })
      expect(stubbedSend).to.have.been.calledWith(getPodcastByName)
    })
    it('returns a 404 when no podcast is found', async () => {
      const request = { params: { podcastName: 'Comments by Celebs' } }

      stubbedFindAll.returns(null)

      await getPodcastByName(request, response)

      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 status when an error occurs retrieving the podcast by name', async () => {
      const request = { params: { podcastName: 'Comments by Celebs' } }

      stubbedFindAll.throws('ERROR!')

      await getPodcastByName(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        include: [
          { model: models.hosts },
        ],
        where: {
          podcastName: { [models.Op.like]: `%${request.params.podcastName}%` }
        },
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve podcast, please try again')
    })
  })
})

