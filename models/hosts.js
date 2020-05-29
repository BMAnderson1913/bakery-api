const hosts = (connection, Sequelize) => {
  return connection.define('hosts', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
  })
}

module.exports = hosts
