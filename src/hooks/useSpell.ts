import { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import API from '../service/api'
import GetSpellResponseDataModel from '../service/spell/model/get-spell-response-data-model'

export interface SpellModel {
  key: string
  name: string
  description: string
  image: {
    full: string
  }
}

const useSpell = (): UseQueryResult<AxiosResponse<GetSpellResponseDataModel>> => {
  return useQuery(['GET_SPELL'], async () => {
    const {
      data: { data },
    } = await API.spell.spell()
    return data
  })
}

export default useSpell
