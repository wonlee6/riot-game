import React, { useMemo } from 'react'
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

type SummonerInfoPageModel = {
  summoner_data: Array<getLeagueResponseDataModel>
}
const SummonerInfoPage = ({ summoner_data }: SummonerInfoPageModel) => {
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
  }, [summoner_data[0]?.tier])

  return (
    <>
      <div className='summoner_card'>
        <div className='emblem_box'>
          {summoner_data.length > 0 && <img src={filtered_emblem_img} alt='Emblem' />}
        </div>
        <div className='info_box'>
          <div className='info_data'>{summoner_data[0]?.queueType}</div>
          <div className='info_data'>닉네임 : {summoner_data[0]?.summonerName} </div>
          <div className='info_data'>
            티어 : {summoner_data[0]?.tier}
            {'      '}
            {summoner_data[0]?.rank}
          </div>
          <div className='info_data'>
            {' '}
            {summoner_data[0]?.leaguePoints} {summoner_data[0]?.wins}승 {summoner_data[0]?.losses}패{' '}
          </div>
          <div className='info_data'>
            승률 :{' '}
            {(summoner_data[0]?.wins / (summoner_data[0]?.wins + summoner_data[0]?.losses)) * 100}%
          </div>
        </div>
      </div>
    </>
  )
}

export default SummonerInfoPage
