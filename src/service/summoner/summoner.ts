import axios, { AxiosRequestConfig } from 'axios'
import { API_KEY, BASE_URL } from '../../function/api-constant'

export const summoner = {
  // 서머너 검색
  async searchSummoner(request: string) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/lol/summoner/v4/summoners/by-name/${request}`,
      method: 'GET',
      params: {
        api_key: API_KEY,
      },
    }
    return await axios(config)
  },

  // 리그 정보 가져오기
  // id로 검색
  async getSummonerData(request?: string) {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/lol/league/v4/entries/by-summoner/${request}`,
      method: 'GET',
      params: {
        api_key: API_KEY,
      },
    }
    return await axios(config)
  },
}
