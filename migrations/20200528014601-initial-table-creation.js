module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('companies', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      companyName: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('podcasts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      podcastName: { type: Sequelize.STRING, allowNull: false },
      numberOfEpisodes: { type: Sequelize.INTEGER, allowNull: false },
      applePodcastsRating: { type: Sequelize.INTEGER, allowNull: false },
      companyId: { type: Sequelize.INTEGER, references: { model: 'companies', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('podcasts')

    return queryInterface.dropTable('companies')
  },
}
