const hosts = (connection, sequelize) => {
  return connection.define('hosts', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: sequelize.STRING, allowNull: false },
    lastName: { type: sequelize.STRING, allowNull: false },
  }, {
    defaultScope: {
      attributes: { exclude: ['companyId', 'hostId', 'updatedAt', 'deletedAt', 'createdAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = hosts
