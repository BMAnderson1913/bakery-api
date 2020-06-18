/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllPodcasts, getPodcastByName, addNewPodcast } = require('../../controllers/podcasts')

const {
  allPodcasts,
  podcastByName,
  newPodcast
} = require('../mocks/podcasts')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - podcasts', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedPodcastsFindAll
  let stubbedPodcastsFindOne
  let stubbedPodcastsCreate


  before(() => {
    sandbox = sinon.createSandbox()
    stubbedPodcastsFindAll = sandbox.stub(models.podcasts, 'findAll')
    stubbedPodcastsFindOne = sandbox.stub(models.podcasts, 'findOne')
    stubbedPodcastsCreate = sandbox.stub(models.podcasts, 'create')
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

  describe('getAllPodcasts', () => {
    it('returns all listed podcasts', async () => {
      stubbedPodcastsFindAll.returns(allPodcasts)

      await getAllPodcasts({}, response)

      expect(stubbedPodcastsFindAll).to.have.callCount(1)
      expect(response.send).to.have.been.calledWith(allPodcasts)
    })

    it('returns a 500 error when the database call fails', async () => {
      stubbedPodcastsFindAll.throws('ERROR!')

      await getAllPodcasts({}, response)

      expect(response.status).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve podcasts, please try again.')
    })
  })

  describe('getPodcastByName', () => {
    it('returns the podcast associated with the name provided', async () => {
      stubbedPodcastsFindAll.returns(podcastByName)

      const request = { params: { podcastName: 'Comments by Celebs' } }

      await getPodcastByName(request, response)

      expect(stubbedPodcastsFindAll).to.have.been.calledWith({
        where: {
          podcastName: { [models.Sequelize.Op.like]: `%${request.params.podcastName}%` }
        },
        include: [{ model: models.hosts }, { model: models.companies }]
      })

      it('returns a 404 when no podcast can be found', async () => {
        stubbedPodcastsFindOne.returns(null)

        const request = { params: { podcastName: 'Comments by Celebs' } }

        await getPodcastByName(request, response)

        expect(stubbedPodcastsFindOne).to.have.been.calledWith({
          where: {
            podcastName: { [models.Sequelize.Op.like]: `%${request.params.podcastName}%` }
          },
          include: [{ model: models.hosts }, { model: models.companies }]
        })

        expect(stubbedStatus).to.have.been.calledWith(404)
        expect(stubbedStatusDotSend).to.have.been.calledWith('Sorry, that is not in my list of favorite podcasts.')
      })

      it('returns a 500 error when the database call fails', async () => {
        stubbedPodcastsFindOne.throws('ERROR!')

        const request = { params: { podcastName: 'Comments by Celebs' } }

        await getPodcastByName(request, response)

        expect(response.status).to.have.been.calledWith(500)
        expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve podcasts, please try again.')
      })
    })

    describe('addNewPodcast', () => {
      it('returns a 201 with the new podcast when successfully added', async () => {
        const request = { body: newPodcast }

        stubbedPodcastsCreate.returns(podcastByName)

        await addNewPodcast(request, response)

        expect(stubbedPodcastsCreate).to.have.been.calledWith(newPodcast)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedStatusDotSend).to.have.been.calledWith(podcastByName)
      })
    })

    it('returns a 400 when required fields are missing', async () => {
      const request = {
        body: {
          podcastName: 'Next Question with Katie Couric', numberOfEpisodes: '142', applePodcastsRating: '4.5', host: ['Katie Couric']
        }
      }

      await addNewPodcast(request, response)

      expect(stubbedPodcastsCreate).to.have.callCount(0)
      expect(response.status).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Please complete all fields.')
    })

    it('returns a 500 error when the database call fails', async () => {
      stubbedPodcastsCreate.throws('ERROR!')

      await addNewPodcast({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to add new podcast. Please try again.')
    })
  })
})


