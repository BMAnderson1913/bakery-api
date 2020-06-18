import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Podcast from '../components/Podcast'
import Title from '../components/Title'
import { retrievePodcastCompanies } from '../utils/podcasts'

export default ({ location }) => {
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState(0)
  const [podcastList, setPodcastList] = useState([])

  useEffect(() => {
    async function pullData() {
      const { id, name, podcasts } = await retrievePodcastCompanies(location)

      setCompanyName(name)
      setCompanyId(id)
      setPodcastList(podcasts)
    }

    pullData()
  }, [])

  return (
    <Page>
      <Title />
      {
        companyName
          ? podcastList.map(podcast => (<Podcast key={companyId} companyName={companyName} podcast={podcast} />))
          : (<div>Not Found</div>)
      }
    </Page>
  )
}
