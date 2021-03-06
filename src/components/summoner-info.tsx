import React, { useEffect, useMemo, useRef, useState } from 'react'
import Bronze from '../styles/tier_icon/Emblem_Bronze.png'
import Silver from '../styles/tier_icon/Emblem_Silver.png'
import Platinum from '../styles/tier_icon/Emblem_Platinum.png'
import Master from '../styles/tier_icon/Emblem_Master.png'
import Iron from '../styles/tier_icon/Emblem_Iron.png'
import Grandmater from '../styles/tier_icon/Emblem_Grandmaster.png'
import Gold from '../styles/tier_icon/Emblem_Gold.png'
import Diamond from '../styles/tier_icon/Emblem_Diamond.png'
import Challenger from '../styles/tier_icon/Emblem_Challenger.png'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import API from '../service/api'
import { SUMMONER_ICON_URL } from '../function/api-constant'
import getSummonerAuthResponseDataModel from '../service/summoner/model/get-summoner-auth-response-data-model'
import ReactiveButton from 'reactive-button'

type SummonerInfoPageModel = {
  summoner_data: Array<getLeagueResponseDataModel>
  summoner_auth_data?: getSummonerAuthResponseDataModel
}
const SummonerInfo = ({ summoner_data, summoner_auth_data }: SummonerInfoPageModel) => {
  const [league_name, setLeagueName] = useState<string>('')
  const [btn_state, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const nowMatchData = () => {
    return alert('작업 진행중입니다...')
  }

  // 리그 정보 가져오기
  const league = async () => {
    await API.league
      .leagues(summoner_data[0].leagueId)
      .then((res) => {
        setLeagueName(res.data.name)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (summoner_data.length) {
      league()
    }
  }, [summoner_data])

  const filtered_emblem_img = useMemo(() => {
    return summoner_data[0]?.tier === 'BRONZE'
      ? Bronze
      : summoner_data[0]?.tier === 'SILVER'
      ? Silver
      : summoner_data[0]?.tier === 'IRON'
      ? Iron
      : summoner_data[0]?.tier === 'GOLD'
      ? Gold
      : summoner_data[0]?.tier === 'PLATINUM'
      ? Platinum
      : summoner_data[0]?.tier === 'DIAMOND'
      ? Diamond
      : summoner_data[0]?.tier === 'MASTER'
      ? Master
      : summoner_data[0]?.tier === 'GRANDMASTER'
      ? Grandmater
      : summoner_data[0]?.tier === 'CHALLENGER'
      ? Challenger
      : ''
  }, [summoner_data])

  return (
    <>
      <div className='summoner_card'>
        <div className='emblem_box'>
          {summoner_data.length > 0 && <img src={filtered_emblem_img} alt='Emblem' />}
          <div className='info_box'>
            <div className='info_data'>{summoner_data[0]?.queueType}</div>
            <div className='info_data'>{league_name}</div>
            <div className='info_data'>
              티어 : {summoner_data[0]?.tier}
              {'      '}
              {summoner_data[0]?.rank}
            </div>
            <div className='info_data'>
              {' '}
              {summoner_data[0]?.leaguePoints}전 {summoner_data[0]?.wins}승 {summoner_data[0]?.losses}패{' '}
            </div>
            <div className='info_data'>
              승률 : {((summoner_data[0]?.wins / (summoner_data[0]?.wins + summoner_data[0]?.losses)) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        <div className='summoner_box'>
          <img src={`${SUMMONER_ICON_URL}/${summoner_auth_data?.profileIconId}.png`} alt='' />
          <div className='info_box'>
            <div className='info_data'>
              <span className='name'>{summoner_auth_data?.name}</span>
            </div>
            <div className='info_data'>
              <span>Level : {summoner_auth_data?.summonerLevel}</span>
            </div>
            <div className='info_data'>
              <ReactiveButton
                animation={true}
                height={'100%'}
                buttonState={btn_state}
                buttonRef={btn_ref}
                width={'100%'}
                onClick={nowMatchData}
                idleText='인게임 정보'
                successText='성공!'
                color='primary'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummonerInfo
