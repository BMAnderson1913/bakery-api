const podcasts = (connection, Sequelize, companies) => {
  return connection.define('podcasts', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    numberOfEpisodes: { type: Sequelize.INTEGER, allowNull: false },
    applePodcastsRating: { type: Sequelize.INTEGER, allowNull: false },
    companiesId: { type: Sequelize.INTEGER, references: { model: companies, key: 'id' } },
  })
}

module.exports = podcasts

