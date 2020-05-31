const allCompanies = [{
  id: 1,
  companyName: 'Cadence13',
}]

const companyByName = [{
  id: 1,
  companyName: 'Cadence13',
  podcasts: [
    {
      id: 1,
      podcastName: 'Comments by Celebs',
      numberOfEpisodes: 168,
      applePodcastsRating: 5,
      hosts: [
        {
          id: 1,
          firstName: 'Julie',
          lastName: 'Kramer',
          podcastHosts: {
            hostId: 1,
            podcastId: 1,
            createdAt: '2020-05-30T17:47:19.000Z',
            updatedAt: '2020-05-30T17:47:19.000Z'
          }
        },
        {
          id: 2,
          firstName: 'Emma',
          lastName: 'Diamond',
          podcastHosts: {
            hostId: 2,
            podcastId: 1,
            createdAt: '2020-05-30T17:47:19.000Z',
            updatedAt: '2020-05-30T17:47:19.000Z'
          }
        }
      ]
    }
  ]
}
]

module.exports = { allCompanies, companyByName }

