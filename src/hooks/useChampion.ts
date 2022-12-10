import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import API from '../service/api'
import GetChampionResponseDataModel from '../service/champion/model/get-champion-response-data'

const useChampion = (): UseQueryResult<AxiosResponse<GetChampionResponseDataModel>> => {
  return useQuery(
    ['GET_CHAMPION'],
    async () => {
      const {
        data: { data },
      } = await API.champion.champion()
      return data
    },
    { refetchOnWindowFocus: false }
  )
}

export default useChampion
