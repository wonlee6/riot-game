import axios, { AxiosRequestConfig } from 'axios'

const api_key = 'RGAPI-aebf0487-5230-4b2a-be26-488a2ec9e915'

export const summoner = {
  async searchSummoner(request: string) {
    const config: AxiosRequestConfig = {
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request}`,
      method: 'GET',
      params: {
        api_key,
      },
    }

    return await axios(config)
  },

  // 리그 정보 가져오기
  // id로 검색
  async getSummonerData(request?: string) {
    const config: AxiosRequestConfig = {
      url: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${request}`,
      method: 'GET',
      params: {
        api_key,
      },
    }

    return await axios(config)
  },
}
