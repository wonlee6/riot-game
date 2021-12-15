import { useEffect, useState } from 'react'
import { CHAMP_URL, ITEM_IMG, RUNES_IMG, SPELL_URL } from '../function/api-constant'
import API from '../service/api'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'
import '../styles/match.scss'

type MatchModel = {
  puuid: string | undefined
}
export default function Match({ puuid }: MatchModel) {
  // match data
  const [match_list_data, setMatchListData] = useState([])
  // detail match data
  const [detail_match_data, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>(
    []
  )
  /**
   *  API Request
   */

  // match 정보 가져오기
  const getMatches = async () => {
    if (puuid) {
      await API.match
        .matches(puuid)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const getDetailMatchData = () => {
    match_list_data.map(
      async (item) =>
        await API.match
          .detailMatch(item)
          .then(async (res) => {
            if (res.status === 200) {
              await setDetailMatchData((prev) => [...prev, res.data])
            }
          })
          .catch((err) => console.log(err))
    )
  }

  useEffect(() => {
    if (puuid) {
      // getMatches()
    }
  }, [puuid])

  useEffect(() => {
    // getDetailMatchData()
  }, [match_list_data.length > 0])

  useEffect(() => {
    console.log(detail_match_data)
  }, [detail_match_data])

  return (
    <>
      <div className='match_item'>
        <div className='match_wrap'>
          <div className='content Lose'>
            <div className='game_stats'>
              <div className='game_type'>
                <span>칼바람 나락</span>
              </div>
              <div className='game_time'>18시간 전</div>
              <div className='bar'></div>
              <div className='game_result lose'>패배</div>
              <div className='game_length'>19분 20초</div>
            </div>
            <div className='game_setting_info'>
              <div className='info_box'>
                <div className='cham_img'>
                  <img src={`${CHAMP_URL}/Velkoz.png`} alt='champ_img' />
                </div>
                <div className='spell'>
                  <div className='spell_item'>
                    <img src={`${SPELL_URL}/SummonerExhaust.png`} alt='spell' />
                  </div>
                  <div className='spell_item'>
                    <img src={`${SPELL_URL}/SummonerFlash.png`} alt='spell' />
                  </div>
                </div>
                <div className='runes'>
                  <div className='runes_item'>
                    <img src={`${RUNES_IMG}/Domination/DarkHarvest/DarkHarvest.png`} alt='runes' />
                  </div>
                  <div className='runes_item'>
                    <img src={`${RUNES_IMG}/7202_Sorcery.png`} alt='spell' />
                  </div>
                </div>
              </div>
              <div className='champ_name'>
                <span>벨코즈</span>
              </div>
            </div>
            <div className='kda'>
              <div className='kda_score'>
                7 / <span>10</span> / 14
              </div>
              <div className='kda_avg'>
                2.10:1 <span>평점</span>
              </div>
              <div className='kda_kill'>
                <span>더블킬</span>
              </div>
            </div>
            <div className='stats'>
              <div className='stats_info'>
                <span>레벨 15</span>
              </div>
              <div className='stats_info'>
                <span>50 (3.1) CS</span>
              </div>
              <div className='stats_info'>
                <span className='stats_kill'>킬관여 58%</span>
              </div>
            </div>
            <div className='item'>
              <div className='item_list'>
                <div className='item'>
                  <img src={`${ITEM_IMG}/3089.png`} alt='item1' />
                </div>
                <div className='item'>
                  <img src='' alt='item2' />
                </div>
                <div className='item'>
                  <img src='' alt='item3' />
                </div>
                <div className='item'>
                  <img src='' alt='etc' />
                </div>
                <div className='item'>
                  <img src='' alt='item5' />
                </div>
                <div className='item'>
                  <img src='' alt='item6' />
                </div>
                <div className='item'>
                  <img src='' alt='item7' />
                </div>
                <div className='item'>
                  <img src='' alt='item8' />
                </div>
              </div>
            </div>
            <div className='players'>
              <div className='team'>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음asdasd</span>
                  </div>
                </div>
              </div>
              <div className='team'>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음</span>
                  </div>
                </div>
                <div className='summoner'>
                  <div className='play_champ'>
                    <img src='' alt='champ' />
                  </div>
                  <div className='player_name'>
                    <span>정신병돋음asdasd</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='stats_btn'></div>
          </div>
        </div>
      </div>
    </>
  )
}
