import React, { useEffect, useRef, useState } from 'react'
import API from '../service/api'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'
import '../styles/main_page.scss'
import ReactiveButton from 'reactive-button'
import Nav from '../components/nav'

const MainPage = () => {
  const [search_name, setSearchName] = useState<string>('')
  const [btn_state, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)
  /**
   *  API State
   */
  // 서머너 auth 정보
  const [summoner_auth_data, setSummonerAuthData] = useState<getSummonerAuthResponseDataModel>()
  // 서머너 league 데이터
  const [summoner_data, setSummonerData] = useState<getLeagueResponseDataModel>()

  /**
   *  function
   */
  const onClickHandler = () => {
    setBtnState('loading')
    setTimeout(() => {
      setBtnState('success')
    }, 2000)
  }
  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = async () => {
    if (search_name === '') return
    await API.summoner //
      .searchSummoner(search_name)
      .then((res) => {
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
    <>
      <Nav />
      <div className='container'>
        <div className='search_box'>
          <input
            type='text'
            className='search_input'
            id='search_name'
            value={search_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            autoComplete='off'
          />

          <ReactiveButton
            animation={true}
            height={'100%'}
            buttonState={btn_state}
            buttonRef={btn_ref}
            width={'20%'}
            onClick={onClickHandler}
            idleText='검색하기'
            successText='성공!'
            color='blue'
          />
        </div>
      </div>
    </>
  )
}

export default MainPage
