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

    await queryInterface.bulkInsert('hosts', [
      { firstName: 'Julie', lastName: 'Kramer' },
      { firstName: 'Emma', lastName: 'Diamond' },
      { firstName: 'Heather', lastName: 'McMahan' },
      { firstName: 'Lauren', lastName: 'McGoodwin' },
      { firstName: 'Lauren', lastName: 'Evarts Bosstick' },
      { firstName: 'Michael', lastName: 'Bosstick' },
      { firstName: 'Casey', lastName: 'Wilson' },
      { firstName: 'Danielle', lastName: 'Schneider' },
      { firstName: 'Jenna', lastName: 'Fischer' },
      { firstName: 'Angela', lastName: 'Kinsey' },
      { firstName: 'Paul', lastName: 'Scheer' },
      { firstName: 'June Diane', lastName: 'Raphael' },
      { firstName: 'Jason', lastName: 'Mantzoukas' },
      { firstName: 'Chelsea', lastName: 'Handler' },
      { firstName: 'Zach', lastName: 'Braff' },
      { firstName: 'Donald', lastName: 'Faison' },
      { firstName: 'Bobby', lastName: 'Bones' },
      { firstName: 'Amy', lastName: 'Brown' },
      { firstName: 'Eddie', lastName: 'Garcia' },
      { firstName: 'Lunchbox', lastName: 'Chappell' },
      { firstName: 'Dax', lastName: 'Shepard' },
      { firstName: 'Danny', lastName: 'Pellegrino' },
      { firstName: 'Jolenta', lastName: 'Greenberg' },
      { firstName: 'Kristen', lastName: 'Meinzer' },
      { firstName: 'Iliza', lastName: 'Shlesinger' },
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

    return queryInterface.bulkInsert('podcastHosts', [
      { podcastId: 1, hostId: 1 },
      { podcastId: 1, hostId: 2 },
      { podcastId: 2, hostId: 3 },
      { podcastId: 3, hostId: 4 },
      { podcastId: 4, hostId: 5 },
      { podcastId: 4, hostId: 6 },
      { podcastId: 5, hostId: 7 },
      { podcastId: 5, hostId: 8 },
      { podcastId: 6, hostId: 9 },
      { podcastId: 6, hostId: 10 },
      { podcastId: 7, hostId: 11 },
      { podcastId: 7, hostId: 12 },
      { podcastId: 7, hostId: 13 },
      { podcastId: 8, hostId: 14 },
      { podcastId: 9, hostId: 15 },
      { podcastId: 9, hostId: 16 },
      { podcastId: 10, hostId: 17 },
      { podcastId: 10, hostId: 18 },
      { podcastId: 10, hostId: 19 },
      { podcastId: 10, hostId: 20 },
      { podcastId: 11, hostId: 17 },
      { podcastId: 12, hostId: 18 },
      { podcastId: 13, hostId: 21 },
      { podcastId: 14, hostId: 22 },
      { podcastId: 15, hostId: 23 },
      { podcastId: 15, hostId: 24 },
      { podcastId: 16, hostId: 25 },
    ])
  },

  down: async (queryInterface) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    await queryInterface.bulkDelete('podcastHosts')
    await queryInterface.bulkDelete('podcasts')
    await queryInterface.bulkDelete('hosts')

    return queryInterface.bulkDelete('companies')
  }
}
