import React, { useEffect, useState } from 'react'
import API from '../service/api'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'

const MainPage = () => {
  const [search_name, setSearchName] = useState<string>('')

  /**
   *  API State
   */
  // 서머너 auth 정보
  const [summoner_auth_data, setSummonerAuthData] = useState<getSummonerAuthResponseDataModel>()
  // 서머너 league 데이터
  const [summoner_data, setSummonerData] = useState<getLeagueResponseDataModel>()
  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = async () => {
    if (search_name === '') return
    await API.summoner.searchSummoner(search_name).then((res) => {
      if (res.status === 200) {
        setSummonerAuthData(res.data)
      }
    })
  }

  // 서머너 데이터 가져오기
  const getSummonerData = async () => {
    await API.summoner
      .getSummonerData(summoner_auth_data?.id)
      .then((res) => {
        if (res.status === 200) {
          setSummonerData(res.data)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (summoner_auth_data?.id) {
      getSummonerData()
    }
  }, [summoner_auth_data])

  return (
    <div>
      <div>
        <ul>
          <li>
            <input
              type='text'
              id='search_name'
              value={search_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            />
            <button onClick={searchSummoner}>검색</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MainPage
