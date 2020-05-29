const Sequelize = require('sequelize')
const allConfigs = require('../configs/sequelize')

const companiesModel = require('./companies')
const hostsModel = require('./hosts')
const podcastsModel = require('./podcasts')
const podcastHostsModel = require('./podcastHosts')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const {
  username, password, database, host, dialect,
} = allConfigs[environment]

const connection = new Sequelize(database, username, password, { host, dialect })

const companies = companiesModel(connection, Sequelize)
const hosts = hostsModel(connection, Sequelize)
const podcasts = podcastsModel(connection, Sequelize, companies)
const podcastHosts = podcastHostsModel(connection, Sequelize, hosts, podcasts)

podcasts.belongsTo(companies)
companies.hasMany(podcasts)

hosts.belongsToMany(podcasts, { through: podcastHosts })
podcasts.belongsToMany(hosts, { through: podcastHosts })

module.exports = {
  companies,
  hosts,
  podcasts,
  podcastHosts,
  Sequelize,
}

