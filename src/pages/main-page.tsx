import React, { useEffect, useRef, useState } from 'react'
import API from '../service/api'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'
import '../styles/main_page.scss'
import ReactiveButton from 'reactive-button'
import Nav from '../components/nav'
import Match from './match'
import SummonerInfo from './summoner-info'
import Summoner from '../components/summoner'

const MainPage = () => {
  const [search_name, setSearchName] = useState<string>('')
  const [btn_state, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const [is_summoner, setIsSummoner] = useState<boolean>(false)
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
  const handleEnther = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') searchSummoner()
  }

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = async () => {
    if (search_name === '') return
    setBtnState('loading')

    await API.summoner //
      .searchSummoner(search_name)
      .then((res) => {
        if (res.status === 200) {
          setBtnState('success')
          setSummonerAuthData(res.data)
        }
      })
      .catch((err) => {
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
          setIsSummoner(true)
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
    <>
      <Nav />
      <div className='container'>
        <div className={is_summoner === true ? `search_box m-top-50` : 'search_box'}>
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
            onClick={searchSummoner}
            idleText='검색하기'
            successText='성공!'
            color='blue'
          />
        </div>
        {summoner_data.length > 0 && (
          <div className='summoner_info_container'>
            <SummonerInfo summoner_data={summoner_data} summoner_auth_data={summoner_auth_data} />
            <div className='match_container'>
              {/* <ChampionMasteries uid={summoner_data[0]?.summonerId} /> */}
              <div className='most_champ_box'>
                <Summoner summoner_data={summoner_data} total_result={total_result} />
              </div>
              <div className='match_list_box'>
                <Match
                  puuid={summoner_auth_data?.puuid}
                  search_name={search_name}
                  setTotalResult={setTotalResult}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default MainPage
