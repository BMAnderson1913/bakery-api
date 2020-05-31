const allHosts = [{
  id: 1,
  firstName: 'Julie',
  lastName: 'Kramer'
},
{
  id: 2,
  firstName: 'Emma',
  lastName: 'Diamond'
}]

const hostByName = [{
  id: 1,
  firstName: 'Julie',
  lastName: 'Kramer',
  podcasts: [
    {
      id: 1,
      podcastName: 'Comments by Celebs',
      numberOfEpisodes: 168,
      applePodcastsRating: 5,
      podcastHosts: {
        hostId: 1,
        podcastId: 1,
        createdAt: '2020-05-30T17:47:19.000Z',
        updatedAt: '2020-05-30T17:47:19.000Z'
      },
      company: {
        id: 1,
        companyName: 'Cadence13'
      }
    }
  ]
}
]

module.exports = { allHosts, hostByName }
