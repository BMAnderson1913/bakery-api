import fetchPodcastsForCompanies from '../actions/podcasts'

export const getCompanyIdFromUrl = location => (location && location.pathname
  ? location.pathname.split('/podcasts/').pop()
  : 0
)
export const retrievePodcastCompanies = async (location) => {
  const companyId = getCompanyIdFromUrl(location)

  if (!companyId) return { companyName: 0, podcasts: [] }

  const { id, companyName, podcasts } = await fetchPodcastsForCompanies(companyId)

  if (!companyName || !podcasts) return { companyName: 0, podcasts: [] }

  return { id, name: companyName, podcasts }
}
