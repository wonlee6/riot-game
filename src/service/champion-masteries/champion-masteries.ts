import axios, { AxiosRequestConfig } from 'axios'
import { API_KEY, BASE_URL } from '../../function/api-constant'

export const champion_masteries = {
  // 챔피언 숙련도 정보
  async getChampionMasteries(request: string) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${request}`,
      method: 'GET',
      params: {
        api_key: API_KEY,
      },
    }
    return await axios(config)
  },
}
