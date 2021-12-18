import getLeagueResponseDataModel from '../service/summoner/model/get-league-response-data-model'
import '../styles/summoner.scss'

type SummonerModel = {
  summoner_data: Array<getLeagueResponseDataModel>
}

export default function Summoner({ summoner_data }: SummonerModel) {
  return (
    <>
      <div className='summoner_box'></div>
    </>
  )
}
