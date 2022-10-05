import { useEffect, useMemo, useState } from 'react'
import API from '../service/api'
import '../styles/main_page.scss'
import Nav from '../components/Nav'
import SummonerInfo from '../components/SummonerInfo'
import { useLocation } from 'react-router'
import { BtnModel } from './MainPage'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import summonerAuth, { summonerAuthData } from '../recoil/summonerAuth'
import summonerData from '../recoil/summonerData'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'
import { AxiosResponse } from 'axios'
import Summoner from '../components/Summoner'
import Match from '../components/Match'

export const MatchRecoilFn = () => ({
  setSummonerAuth: useSetRecoilState(summonerAuth),
  summonerAuthData: useRecoilValue(summonerAuthData),
  summonerData: useRecoilValue(summonerData),
})

const MatchPage = () => {
  const location = useLocation()
  const { setSummonerAuth, summonerAuthData } = MatchRecoilFn()

  const [btnState, setBtnState] = useState<BtnModel>('idle')
  // match data
  const [matchListData, setMatchListData] = useState([])
  // detail match data
  const [detailMatchData, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>([])

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = async (name: string) => {
    await API.summoner //
      .searchSummoner(name)
      .then((res) => {
        if (res.status === 200) {
          setBtnState('success')
          setSummonerAuth(res.data)
        }
      })
      .catch((err) => {
        setBtnState('error')
        console.error(err)
      })
  }

  useEffect(() => {
    const stateName = location.state as string
    if (stateName) {
      searchSummoner(stateName)
    }
  }, [location.state])

  // match 정보 가져오기
  const getMatches = async () => {
    if (summonerAuthData) {
      await API.match
        .matches(summonerAuthData.puuid, 20)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
          }
        })
        .catch((err) => {
          setBtnState('error')
          console.error(err)
        })
    }
  }

  useEffect(() => {
    getMatches()
  }, [summonerAuthData])

  // match detail 정보 가져오기
  const getDetailMatchData = () => {
    Promise.allSettled(matchListData.map((item) => API.match.detailMatch(item))).then((response: PromiseSettledResult<AxiosResponse<any, any>>[]) =>
      response.map((item) => {
        if (item.status === 'fulfilled') {
          setDetailMatchData((prev) => [...prev, item.value.data])
        }
      })
    )
  }

  const filtered_data = useMemo(() => {
    return detailMatchData.sort((a, b) => b.info.gameCreation - a.info.gameCreation)
  }, [detailMatchData])

  useEffect(() => {
    if (matchListData.length > 0) {
      getDetailMatchData()
    }
  }, [matchListData])

  return (
    <>
      <Nav />
      {btnState === 'error' ? (
        <div>
          <span>해당 소환사의 데이터를 읽어 올 수 없습니다.</span>
        </div>
      ) : (
        <div className='container'>
          <div className='summoner_info_container'>
            <SummonerInfo />
            <div className='match_container'>
              <div className='most_champ_box'>
                <Summoner />
              </div>
              <div className='match_list_box'>
                {summonerAuthData &&
                  filtered_data.length > 0 &&
                  filtered_data.map((item) => <Match key={item.info.gameId} matchData={item} summonerName={summonerAuthData.name} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MatchPage
