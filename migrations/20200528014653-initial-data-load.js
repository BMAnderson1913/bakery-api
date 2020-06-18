module.exports = {
  up: async (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('companies', [
      { companyName: 'Cadence13' },
      { companyName: 'Dear Media' },
      { companyName: 'Earwolf' },
      { companyName: 'iHeartRadio' },
      { companyName: 'Nashville Podcast Network' },
      { companyName: 'self produced' },
      { companyName: 'Stitcher' },
      { companyName: 'Wondery' },
    ])

    await queryInterface.bulkInsert('podcasts', [
      { podcastName: 'Comments by Celebs', numberOfEpisodes: 168, applePodcastsRating: 4.6, companyId: 1 },
      { podcastName: 'Absolutely Not', numberOfEpisodes: 49, applePodcastsRating: 4.9, companyId: 2 },
      { podcastName: 'The Femails', numberOfEpisodes: 82, applePodcastsRating: 4.9, companyId: 2 },
      { podcastName: 'The Skinny Confidential', numberOfEpisodes: 269, applePodcastsRating: 4.7, companyId: 2 },
      { podcastName: 'Bitch Sesh', numberOfEpisodes: 186, applePodcastsRating: 4.5, companyId: 3 },
      { podcastName: 'Office Ladies', numberOfEpisodes: 30, applePodcastsRating: 5.0, companyId: 3 },
      { podcastName: 'How Did This Get Made?', numberOfEpisodes: 240, applePodcastsRating: 5.0, companyId: 3 },
      { podcastName: 'Life Will Be The Death Of Me', numberOfEpisodes: 20, applePodcastsRating: 4.5, companyId: 4 },
      { podcastName: 'Fake Doctors, Real Friends', numberOfEpisodes: 16, applePodcastsRating: 5.0, companyId: 4 },
      { podcastName: 'The Bobby Bones Show', numberOfEpisodes: 300, applePodcastsRating: 4.8, companyId: 4 },
      { podcastName: 'The Bobbycast', numberOfEpisodes: 269, applePodcastsRating: 4.9, companyId: 5 },
      { podcastName: '4 Things With Amy Brown', numberOfEpisodes: 154, applePodcastsRating: 4.9, companyId: 5 },
      { podcastName: 'Armchair Expert', numberOfEpisodes: 211, applePodcastsRating: 4.5, companyId: 6 },
      { podcastName: 'Everything Iconic', numberOfEpisodes: 263, applePodcastsRating: 4.9, companyId: 6 },
      { podcastName: 'By the Book', numberOfEpisodes: 134, applePodcastsRating: 4.7, companyId: 7 },
      { podcastName: 'Ask Iliza Anything', numberOfEpisodes: 87, applePodcastsRating: 4.6, companyId: 8 },
    ])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.bulkDelete('podcasts')

    return queryInterface.bulkDelete('companies')
  }
}
