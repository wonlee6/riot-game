import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import Bronze from '../styles/tier_icon/Emblem_Bronze.png'
import Silver from '../styles/tier_icon/Emblem_Silver.png'
import Platinum from '../styles/tier_icon/Emblem_Platinum.png'
import Master from '../styles/tier_icon/Emblem_Master.png'
import Iron from '../styles/tier_icon/Emblem_Iron.png'
import Grandmater from '../styles/tier_icon/Emblem_Grandmaster.png'
import Gold from '../styles/tier_icon/Emblem_Gold.png'
import Diamond from '../styles/tier_icon/Emblem_Diamond.png'
import Challenger from '../styles/tier_icon/Emblem_Challenger.png'
import API from '../service/api'
import { SUMMONER_ICON_URL } from '../function/api-constant'
import ReactiveButton from 'reactive-button'
import { MatchRecoilFn } from '../pages/MatchPage'
import { BtnModel } from '../pages/MainPage'

const SummonerInfo = () => {
  const { summonerAuthData, summonerData } = MatchRecoilFn()

  const [league_name, setLeagueName] = useState<string>('')
  const [btnState, setBtnState] = useState<BtnModel>('idle')
  const btnRef: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const nowMatchData = () => {
    return alert('작업 진행중입니다...')
  }

  // 리그 정보 가져오기
  const league = async () => {
    await API.league
      .leagues(summonerData[0].leagueId)
      .then((res) => {
        setLeagueName(res.data.name)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (summonerData.length > 0) {
      league()
    }
  }, [summonerData])

  const filteredEmblemImg = useMemo(() => {
    if (summonerData.length === 0) return

    return summonerData[0].tier === 'BRONZE'
      ? Bronze
      : summonerData[0].tier === 'SILVER'
      ? Silver
      : summonerData[0].tier === 'IRON'
      ? Iron
      : summonerData[0].tier === 'GOLD'
      ? Gold
      : summonerData[0].tier === 'PLATINUM'
      ? Platinum
      : summonerData[0].tier === 'DIAMOND'
      ? Diamond
      : summonerData[0].tier === 'MASTER'
      ? Master
      : summonerData[0].tier === 'GRANDMASTER'
      ? Grandmater
      : summonerData[0].tier === 'CHALLENGER'
      ? Challenger
      : ''
  }, [summonerData])

  return (
    <>
      {summonerData.length > 0 ? (
        <div className='summoner_card'>
          <div className='emblem_box'>
            <img src={filteredEmblemImg} alt='Emblem' />
            <div className='info_box'>
              <div className='info_data'>{summonerData[0].queueType}</div>
              <div className='info_data'>{league_name}</div>
              <div className='info_data'>
                티어 : {summonerData[0].tier}
                {'      '}
                {summonerData[0].rank}
              </div>
              <div className='info_data'>
                {' '}
                {summonerData[0].wins + summonerData[0].losses}전 {summonerData[0].wins}승 {summonerData[0].losses}패{' '}
              </div>
              <div className='info_data'>승률 : {((summonerData[0].wins / (summonerData[0].wins + summonerData[0].losses)) * 100).toFixed(0)}%</div>
            </div>
          </div>
          <div className='summoner_box'>
            <img src={`${SUMMONER_ICON_URL}/${summonerAuthData?.profileIconId}.png`} alt='' />
            <div className='info_box'>
              <div className='info_data'>
                <span className='name'>{summonerAuthData?.name}</span>
              </div>
              <div className='info_data'>
                <span>Level : {summonerAuthData?.summonerLevel}</span>
              </div>
              <div className='info_data'>
                <ReactiveButton
                  animation={true}
                  height={'100%'}
                  buttonState={btnState}
                  buttonRef={btnRef}
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
      ) : null}
    </>
  )
}

export default memo(SummonerInfo)
