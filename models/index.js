const Sequelize = require('sequelize')
const schittsCreekModel = require('./schittscreek')
const connection = new Sequelize('schittscreek', 'characters', 'AL3XI5!', { host: 'localhost', dialect: 'mysql', })
const schittsCreek = schittsCreekModel(connection, Sequelize)

module.exports = { schittsCreek }
