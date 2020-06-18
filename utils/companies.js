import fetchCompanies from '../actions/companies'

export const filterCompanies = (list, term) => list.filter(company => (
  company.companyName.toLowerCase().includes(term.toLowerCase())
))

export const retrieveCompanies = async () => {
  const companies = await fetchCompanies()

  return companies
}
