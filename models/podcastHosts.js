const podcastHosts = (connection, sequelize, hosts, podcasts) => {
  return connection.define('podcastHosts', {
    hostId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: hosts, key: 'id' }
    },
    podcastId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { model: podcasts, key: 'id' }
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = podcastHosts
