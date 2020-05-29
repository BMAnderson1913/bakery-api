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
      { name: 'Julie Kramer' },
      { name: 'Emma Diamond' },
      { name: 'Heather McMahan' },
      { name: 'Lauren McGoodwin' },
      { name: 'Lauren Evarts Bosstick' },
      { name: 'Michael Bosstick' },
      { name: 'Casey Wilson' },
      { name: 'Danielle Schneider' },
      { name: 'Jenna Fischer' },
      { name: 'Angela Kinsey' },
      { name: 'Paul Scheer' },
      { name: 'June Diane Raphael' },
      { name: 'Jason Mantzoukas' },
      { name: 'Chelsea Handler' },
      { name: 'Zach Braff' },
      { name: 'Donald Faison' },
      { name: 'Bobby Bones' },
      { name: 'Amy Brown' },
      { name: 'Eddie Garcia' },
      { name: 'Lunchbox' },
      { name: 'Dax Shepard' },
      { name: 'Danny Pellegrino' },
      { name: 'Jolenta Greenberg' },
      { name: 'Kristen Meinzer' },
      { name: 'Iliza Shlesinger' },
    ])

    await queryInterface.bulkInsert('podcasts', [
      { name: 'Comments by Celebs', numberOfEpisodes: 168, applePodcastsRating: 4.6, companiesId: 1 },
      { name: 'Absolutely Not', numberOfEpisodes: 49, applePodcastsRating: 4.9, companiesId: 2 },
      { name: 'The Femails', numberOfEpisodes: 82, applePodcastsRating: 4.9, companiesId: 2 },
      { name: 'The Skinny Confidential Him & Her', numberOfEpisodes: 269, applePodcastsRating: 4.7, companiesId: 2 },
      { name: 'Bitch Sesh', numberOfEpisodes: 186, applePodcastsRating: 4.5, companiesId: 3 },
      { name: 'Office Ladies', numberOfEpisodes: 30, applePodcastsRating: 5.0, companiesId: 3 },
      { name: 'How Did This Get Made?', numberOfEpisodes: 240, applePodcastsRating: 5.0, companiesId: 3 },
      { name: 'Life Will Be The Death Of Me', numberOfEpisodes: 20, applePodcastsRating: 4.5, companiesId: 4 },
      { name: 'Fake Doctors, Real Friends', numberOfEpisodes: 16, applePodcastsRating: 5.0, companiesId: 4 },
      { name: 'The Bobby Bones Show', numberOfEpisodes: 300, applePodcastsRating: 4.8, companiesId: 4 },
      { name: 'The Bobbycast', numberOfEpisodes: 269, applePodcastsRating: 4.9, companiesId: 5 },
      { name: '4 Things With Amy Brown', numberOfEpisodes: 154, applePodcastsRating: 4.9, companiesId: 5 },
      { name: 'Armchair Expert', numberOfEpisodes: 211, applePodcastsRating: 4.5, companiesId: 6 },
      { name: 'Everything Iconic', numberOfEpisodes: 263, applePodcastsRating: 4.9, companiesId: 6 },
      { name: 'By the Book', numberOfEpisodes: 134, applePodcastsRating: 4.7, companiesId: 7 },
      { name: 'Ask Iliza Anything', numberOfEpisodes: 87, applePodcastsRating: 4.6, companiesId: 8 },
    ])

    return queryInterface.bulkInsert('podcastHosts', [
      { podcastsId: 1, hostsId: 1 },
      { podcastsId: 1, hostsId: 2 },
      { podcastsId: 2, hostsId: 3 },
      { podcastsId: 3, hostsId: 4 },
      { podcastsId: 4, hostsId: 5 },
      { podcastsId: 4, hostsId: 6 },
      { podcastsId: 5, hostsId: 7 },
      { podcastsId: 5, hostsId: 8 },
      { podcastsId: 6, hostsId: 9 },
      { podcastsId: 6, hostsId: 10 },
      { podcastsId: 7, hostsId: 11 },
      { podcastsId: 7, hostsId: 12 },
      { podcastsId: 7, hostsId: 13 },
      { podcastsId: 8, hostsId: 14 },
      { podcastsId: 9, hostsId: 15 },
      { podcastsId: 9, hostsId: 16 },
      { podcastsId: 10, hostsId: 17 },
      { podcastsId: 10, hostsId: 18 },
      { podcastsId: 10, hostsId: 19 },
      { podcastsId: 10, hostsId: 20 },
      { podcastsId: 11, hostsId: 17 },
      { podcastsId: 12, hostsId: 18 },
      { podcastsId: 13, hostsId: 21 },
      { podcastsId: 14, hostsId: 22 },
      { podcastsId: 15, hostsId: 23 },
      { podcastsId: 15, hostsId: 24 },
      { podcastsId: 16, hostsId: 25 },
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
