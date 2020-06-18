export default (connection, sequelize, companies) => connection.define('podcasts', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  podcastName: { type: sequelize.STRING, allowNull: false },
  numberOfEpisodes: { type: sequelize.INTEGER, allowNull: false },
  applePodcastsRating: { type: sequelize.INTEGER, allowNull: false },
  companyId: { type: sequelize.INTEGER, references: { model: companies, key: 'id' } },
}, {
  defaultScope: {
    attributes: { exclude: ['companyId', 'updatedAt', 'deletedAt', 'createdAt'] },
  },
}, {
  paranoid: true,
})
