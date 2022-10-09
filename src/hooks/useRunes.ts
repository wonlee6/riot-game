import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import API from '../service/api'
import GetRunesResponseDataModel from '../service/runes/model/get-runes-response-data-model'

const useRunes = (): UseQueryResult<AxiosResponse<Array<GetRunesResponseDataModel>>> => {
  return useQuery(['GET_RUNES'], async () => {
    const { data } = await API.runes.runes()
    return data
  })
}

export default useRunes
