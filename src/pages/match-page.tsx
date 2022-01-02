import React, { useEffect, useRef, useState } from 'react'
import API from '../service/api'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'
import '../styles/main_page.scss'
import ReactiveButton from 'reactive-button'
import Nav from '../components/nav'
import Match from '../components/match'
import SummonerInfo from '../components/summoner-info'
import Summoner from '../components/summoner'
import { useLocation } from 'react-router'

const MatchPage = () => {
  const [summoner_name, setSummonerName] = useState<string>('')
  const [btn_state, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const [is_summoner, setIsSummoner] = useState<boolean>(false)

  const [recentNames, setRecentNames] = useState([] as string[])

  const location = useLocation()
  /**
   *  API State
   */
  // 서머너 auth 정보
  const [summoner_auth_data, setSummonerAuthData] = useState<getSummonerAuthResponseDataModel>()
  // 서머너 league 데이터
  const [summoner_data, setSummonerData] = useState<Array<getLeagueResponseDataModel>>([])
  // 총 전적
  const [total_result, setTotalResult] = useState({
    win: 0,
    lose: 0,
  })

  /**
   *  function
   */

  const lastSearchedNames = (e: string) => {
    setRecentNames(recentNames.includes(e) ? [...recentNames] : recentNames.concat(e))
    localStorage.setItem('name', JSON.stringify(recentNames))
  }

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = async (name: string) => {
    setIsSummoner(true)

    await API.summoner //
      .searchSummoner(name)
      .then((res) => {
        if (res.status === 200) {
          setBtnState('success')
          setSummonerAuthData(res.data)
          setSummonerName(res.data.name)
          lastSearchedNames(res.data.name)
        }
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => setBtnState('error'), 1000)
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
    const stateName = location.state as string
    if (stateName !== '') {
      searchSummoner(stateName)
    }
  }, [location.state])

  useEffect(() => {
    if (summoner_auth_data?.id) {
      getSummonerData()
    }
  }, [summoner_auth_data])

  return (
    <>
      <Nav />
      <div className={is_summoner === true ? `container p-t-m-t` : 'container'}>
        {/* <div className='search_box'>
          <input
            type='text'
            className='search_input'
            id='search_name'
            value={search_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            autoComplete='off'
            placeholder='닉네임을 입력하세요'
            onKeyPress={handleEnther}
          />

          <ReactiveButton
            animation={true}
            height={'100%'}
            buttonState={btn_state}
            buttonRef={btn_ref}
            width={'20%'}
            onClick={() => searchSummoner(search_name)}
            idleText='검색하기'
            successText='성공!'
            color='blue'
          />
        </div> */}
        {summoner_data.length > 0 && (
          <div className='summoner_info_container'>
            <SummonerInfo summoner_data={summoner_data} summoner_auth_data={summoner_auth_data} />
            <div className='match_container'>
              <div className='most_champ_box'>
                <Summoner summoner_data={summoner_data} total_result={total_result} />
              </div>
              <div className='match_list_box'>
                <Match puuid={summoner_auth_data?.puuid} summoner_name={summoner_name} setTotalResult={setTotalResult} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MatchPage
