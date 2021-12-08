import axios, { AxiosRequestConfig } from 'axios'

export const summoner = {
  async searchSummoner(request: string) {
    const config: AxiosRequestConfig = {
      url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request}`,
      method: 'GET',
      params: {
        api_key: 'RGAPI-79549ee2-300b-4cb1-a93b-5c679ca59d0b',
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
        api_key: 'RGAPI-79549ee2-300b-4cb1-a93b-5c679ca59d0b',
      },
    }

    return await axios(config)
  },
}
