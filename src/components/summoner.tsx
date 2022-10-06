import { memo, useEffect, useState } from 'react'
import { MatchRecoilFn } from '../pages/MatchPage'
import '../styles/summoner.scss'
import LoadingSpinner from './common/LoadingSpinner'
import PieChart from './graph/PieChart'

const Summoner = () => {
  const { summonerData } = MatchRecoilFn()

  const [isLoading, setIsLoading] = useState(false)

  const wins = summonerData.length > 0 ? summonerData[0].wins : 0
  const losses = summonerData.length > 0 ? summonerData[0].wins : 0

  useEffect(() => {
    if (summonerData.length > 0) {
      setTimeout(() => {
        setIsLoading(true)
      }, 1000)
    }
    return () => {
      setIsLoading(false)
    }
  }, [summonerData])

  return (
    <>
      <div className='graph_box'>
        {isLoading ? (
          <>
            <div className='graph'>
              <PieChart />
              <div className='recent-box'>
                <span className='recent-span'>
                  {wins + losses}전 {wins}승 {losses}패
                </span>
              </div>
              <div className='recent-box'>
                <span className='recent-span'>
                  최근 {wins + losses}경기 승률 {((wins / (wins + losses)) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className='recent_result'></div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {/* <div className='champ_box'>
        <ChampionMasteries uid={summoner_data[0]?summonerId} />
      </div> */}
    </>
  )
}

export default memo(Summoner)
