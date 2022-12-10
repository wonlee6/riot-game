import { atom, selector } from 'recoil'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'

const summonerAuth = atom<getSummonerAuthResponseDataModel | null>({
  key: '_summonerAuth',
  default: null,
})

const summonerAuthData = selector<getSummonerAuthResponseDataModel | null>({
  key: 'summonerAuthData',
  get: ({ get }) => {
    const summoner = get(summonerAuth)

    return summoner
  },
})

export { summonerAuthData }
export default summonerAuth
