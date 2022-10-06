import axios, { AxiosRequestConfig } from 'axios'
import { API_KEY, MATCH_URL } from '../../function/api-constant'

export const match = {
  // 전적 매치 정보 가져오기
  // puuid
  async matches(request: string, startCount: number, endCount: number) {
    const config: AxiosRequestConfig = {
      url: `${MATCH_URL}/lol/match/v5/matches/by-puuid/${request}/ids`,
      method: 'GET',
      params: {
        api_key: API_KEY,
        startCount,
        endCount,
      },
    }
    return await axios(config)
  },
  // 매치 상세 정보 가져오기
  async detailMatch(request: string) {
    const config: AxiosRequestConfig = {
      url: `${MATCH_URL}/lol/match/v5/matches/${request}`,
      method: 'GET',
      params: {
        api_key: API_KEY,
      },
    }
    return await axios(config)
  },
}
