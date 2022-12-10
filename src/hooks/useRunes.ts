import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import API from '../service/api'
import GetRunesResponseDataModel from '../service/runes/model/get-runes-response-data-model'
// : UseQueryResult<AxiosResponse<Array<GetRunesResponseDataModel>>>
const useRunes = () => {
  const [runesData, setRunesData] = useState<GetRunesResponseDataModel[]>([])

  const { data, error, isLoading, isError } = useQuery(
    'GET_RUNES',
    () => API.runes.runes().then((data) => setRunesData(data.data)),
    { refetchOnWindowFocus: false }
  )

  // if (isError) {
  //   return console.log(`Error : ${error}`)
  // }

  return runesData
}

export default useRunes
