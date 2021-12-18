import axios, { AxiosRequestConfig } from 'axios'

export const champion = {
  async champion() {
    const config: AxiosRequestConfig = {
      url: 'https://ddragon.leagueoflegends.com/cdn/11.24.1/data/ko_KR/champion.json',
      method: 'GET',
    }

    return await axios(config)
  },
}
