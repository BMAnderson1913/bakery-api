import React, { useEffect, useState } from 'react'
import Company from '../components/Company'
import Search from '../components/Search'
import Page from '../components/Page'
import Title from '../components/Title'
import { filterCompanies, retrieveCompanies } from '../utils/companies'

export default () => {
  const [companiesList, setCompaniesList] = useState([])
  const [filteredCompaniesList, setFilteredCompaniesList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const companies = await retrieveCompanies()

      setCompaniesList(companies)
      setFilteredCompaniesList(companies)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterCompanies(companiesList, searchTerm)

    setFilteredCompaniesList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredCompaniesList.map(company => (
          <Company
            key={company.id}
            id={company.id}
            name={company.companyName}
          />
        ))
      }
    </Page>
  )
}
