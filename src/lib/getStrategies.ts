import axios from 'axios'

export default async function getStrategies() {
  const res = await axios.get('/api/strategies')

  return res.data
}
