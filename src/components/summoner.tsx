import { memo } from 'react'
import '../styles/summoner.scss'
import PieChart from './graph/PieChart'

const Summoner = (props: { totalResult: any }) => {
  const wins = props.totalResult.win
  const losses = props.totalResult.lose

  return (
    <>
      <div className='graph_box'>
        <>
          <div className='graph'>
            <PieChart totalResult={props.totalResult} />
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
      </div>
      {/* <div className='champ_box'>
        <ChampionMasteries uid={summoner_data[0]?summonerId} />
      </div> */}
    </>
  )
}

export default memo(Summoner)
