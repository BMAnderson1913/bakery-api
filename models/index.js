import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import companiesModel from './companies'
import podcastsModel from './podcasts'

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const {
  username, password, database, host, dialect,
} = allConfigs[environment]

const connection = new Sequelize(database, username, password, { host, dialect })

const companies = companiesModel(connection, Sequelize)
const podcasts = podcastsModel(connection, Sequelize, companies)

podcasts.belongsTo(companies)
companies.hasMany(podcasts)

module.exports = {
  companies,
  podcasts,
  Op: Sequelize.Op,
}
