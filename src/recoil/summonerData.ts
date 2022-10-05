import { atom, selector } from 'recoil'
import API from '../service/api'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import summonerAuth from './summonerAuth'

const summonerData = selector<Array<getLeagueResponseDataModel>>({
  key: '_summonerData',
  get: ({ get }) => {
    const summoner = get(summonerAuth)
    if (summoner) {
      try {
        return API.summoner
          .getSummonerData(summoner.id)
          .then((response) => response)
          .then((i) => i.data)
      } catch (error) {
        console.error(error)
      }
    }
    return []
  },
})

export default summonerData
