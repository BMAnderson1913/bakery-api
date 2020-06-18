import React from 'react'
import styled from 'styled-components'

const Podcast = styled.div`
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
`

export default ({ companyName, podcast }) => (
  <>
    <Podcast>
      <div>{companyName}</div>
      <div key={`Name-${podcast.id}`}>{`Podcast: ${podcast.podcastName}`}</div>
      <div key={`NumEps-${podcast.id}`}>{`Number of Episodes: ${podcast.numberOfEpisodes}`}</div>
      <div key={`AppleRating-${podcast.id}`}>{`Apple Podcasts Rating: ${podcast.applePodcastsRating}`}</div>
    </Podcast>
  </>
)
