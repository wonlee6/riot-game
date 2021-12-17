import axios, { AxiosRequestConfig } from 'axios'

export const runes = {
  async runes() {
    const config: AxiosRequestConfig = {
      url: 'https://ddragon.leagueoflegends.com/cdn/11.24.1/data/ko_KR/runesReforged.json',
      method: 'GET',
    }
    return await axios(config)
  },
}
