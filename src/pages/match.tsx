import { useEffect, useMemo, useState } from 'react'
import API from '../service/api'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'

type MatchModel = {
  puuid: string | undefined
}
export default function Match({ puuid }: MatchModel) {
  // match data
  const [match_list_data, setMatchListData] = useState([])
  // detail match data
  const [detail_match_data, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>(
    []
  )
  /**
   *  API Request
   */

  // match 정보 가져오기
  const getMatches = async () => {
    if (puuid) {
      await API.match
        .matches(puuid)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const getDetailMatchData = () => {
    match_list_data.map(
      async (item) =>
        await API.match
          .detailMatch(item)
          .then(async (res) => {
            if (res.status === 200) {
              await setDetailMatchData(
                detail_match_data.includes(res.data)
                  ? [...detail_match_data]
                  : detail_match_data.concat(res.data)
              )
            }
          })
          .catch((err) => console.log(err))
    )
  }

  const aaa = useMemo(() => {
    // match_list_data.map(
    //   async (item) =>
    //     await API.match
    //       .detailMatch(item)
    //       .then(async (res) => {
    //         if (res.status === 200) {
    //           await setDetailMatchData(
    //             detail_match_data.includes(res.data)
    //               ? [...detail_match_data]
    //               : detail_match_data.concat(res.data)
    //           )
    //         }
    //       })
    //       .catch((err) => console.log(err))
    // )
    match_list_data.map((item) => {
      item
    })
  }, [match_list_data])

  useEffect(() => {
    if (puuid) {
      getMatches()
    }
  }, [puuid])

  useEffect(() => {
    // getDetailMatchData()
  }, [match_list_data.length > 0])

  useEffect(() => {
    console.log(detail_match_data)
  }, [detail_match_data])
  return (
    <>
      <div>dd</div>
    </>
  )
}
