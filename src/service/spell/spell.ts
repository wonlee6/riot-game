import axios, { AxiosRequestConfig } from 'axios'

export const spell = {
  spell() {
    const config: AxiosRequestConfig = {
      url: 'https://ddragon.leagueoflegends.com/cdn/11.24.1/data/ko_KR/summoner.json',
      method: 'GET',
    }
    return axios(config)
  },
}
