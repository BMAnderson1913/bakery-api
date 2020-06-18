import axios from 'axios'

export default async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/companies`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return []
  }
}
