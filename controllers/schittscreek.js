const models = require('../models')

const getAllCharacters = async (request, response) => {
  const characters = await models.characters.findAll()

  return response.send(characters) }

const getCharacterByName = async (request, response) => {
  const { name } = request.params

  const matchingCharacter = await models.characters.findOne({ where: { name } })

  return matchingCharacter ? response.send(matchingCharacter) : response.sendStatus(404) }

const getCharacterByOccupation = async (request, response) => {
  const { occupation } = request.params

  const matchingCharacter = await models.characters.findOne({ where: { occupation } })

  return matchingCharacter ? response.send(matchingCharacter) : response.sendStatus(404)
}

const getCharacterByQuote = async (request, response) => {
  const { quote } = request.params

  const matchingCharacter = await models.characters.findOne({ where: { quote } })

  return matchingCharacter ? response.send(matchingCharacter) : response.sendStatus(404)
}

const getCharacterByActor = async (request, response) => {
  const { playedBy } = request.params

  const matchingCharacter = await models.characters.findOne({ where: { playedBy } })

  return matchingCharacter ? response.send(matchingCharacter) : response.sendStatus(404)
}

const saveNewCharacter = async (request, response) => {
  const {
    name, occupation, quote, playedBy
  } = request.body

  if (!name || !occupation || !quote || !playedBy) {
    return response.status(400)
      .send('The following fields are required: name, occupation, quote, playedBy') }

  const newCharacter = await models.characters.create({
    name, occupation, quote, playedBy,
  })

  return response.status(201).send(newCharacter)
}

module.exports = {
  getAllCharacters,
  getCharacterByName,
  getCharacterByOccupation,
  getCharacterByQuote,
  getCharacterByActor,
  saveNewCharacter
}

