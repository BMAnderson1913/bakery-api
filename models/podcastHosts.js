const podcastHosts = (connection, Sequelize, hosts, podcasts) => {
  return connection.define('podcastCompanies', {
    podcastsId: { type: Sequelize.INTEGER, references: { model: podcasts, key: 'id' } },
    hostId: { type: Sequelize.INTEGER, references: { model: hosts, key: 'id' } },
  })
}

module.exports = podcastHosts
