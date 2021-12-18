import { TotalResultModel } from '../pages/match'
import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import '../styles/summoner.scss'
import Pie from './graph/pie'

type SummonerModel = {
  summoner_data: Array<getLeagueResponseDataModel>
  total_result: TotalResultModel
}

export default function Summoner({ summoner_data, total_result }: SummonerModel) {
  return (
    <>
      <div className='graph_box'>
        <div className='graph'>
          <Pie total_result={total_result} />
          <div className='recent-box'>
            <span className='recent-span'>
              {total_result.win + total_result.lose}전 {total_result.win}승 {total_result.lose}패
            </span>
          </div>
          <div className='recent-box'>
            <span className='recent-span'>
              최근 {total_result.win + total_result.lose}경기 승률{' '}
              {((total_result.win / (total_result.win + total_result.lose)) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
        <div className='recent_result'></div>
      </div>
      <div className='champ_box'></div>
    </>
  )
}
