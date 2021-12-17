import axios, { AxiosRequestConfig } from 'axios'
import { API_KEY, BASE_URL } from '../../function/api-constant'

export const league = {
  async leagues(request: string) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/lol/league/v4/leagues/${request}`,
      method: 'GET',
      params: {
        api_key: API_KEY,
      },
    }

    return await axios(config)
  },
}
