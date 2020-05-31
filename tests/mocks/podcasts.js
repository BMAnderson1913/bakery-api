const allPodcasts = [{
  id: 1,
  podcastName: 'Comments by Celebs',
  numberOfEpisodes: 168,
  applePodcastsRating: 4.6,
  companyId: 1
},
{
  id: 2,
  podcastName: 'Absolutely Not',
  numberOfEpisodes: 49,
  applePodcastsRating: 4.9,
  companyId: 2
}]

const podcastByName = [{
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
  ],
  company: {
    id: 1,
    companyName: 'Cadence13'
  }
},
]

module.exports = { allPodcasts, podcastByName }
