const schittsCreekModel = (connection, Sequelize) => connection.define('characters', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: Sequelize.STRING },
  occupation: { type: Sequelize.STRING },
  quote: { type: Sequelize.STRING },
  playedBy: { type: Sequelize.STRING },
  division: { type: Sequelize.STRING },
}, { paranoid: true })

module.exports = schittsCreekModel

