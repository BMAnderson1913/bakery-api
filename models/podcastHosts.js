const podcastHosts = (connection, Sequelize, hosts, podcasts) => {
  return connection.define('podcastHosts', {
    podcastsId: { type: Sequelize.INTEGER, references: { model: podcasts, key: 'id' } },
    hostsId: { type: Sequelize.INTEGER, references: { model: hosts, key: 'id' } },
  })
}

module.exports = podcastHosts
