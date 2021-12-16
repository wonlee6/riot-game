import { Icon } from '@iconify/react'
import React, { useEffect, useMemo, useState } from 'react'
import { CHAMP_URL, ITEM_IMG, RUNES_IMG, SPELL_URL } from '../function/api-constant'
import { second2MS } from '../function/function'
import API from '../service/api'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'
import '../styles/match.scss'

type MatchModel = {
  puuid: string | undefined
  search_name: string
}
export default function Match({ puuid, search_name }: MatchModel) {
  const [count, setCount] = useState(20)

  // match data
  const [match_list_data, setMatchListData] = useState([])
  // detail match data
  const [detail_match_data, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>(
    []
  )

  // function

  /**
   *  API Request
   */

  // match 정보 가져오기
  const getMatches = async () => {
    if (puuid) {
      await API.match
        .matches(puuid, count)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const getDetailMatchData = () => {
    if (detail_match_data.length >= 19) return
    else {
      match_list_data.map((item) =>
        API.match
          .detailMatch(item)
          .then(async (res) => {
            if (res.status === 200) {
              await setDetailMatchData((prev) => {
                return prev[res.data] ? [...prev] : [...prev, res.data]
              })
            }
          })
          .catch((err) => console.log(err))
      )
    }
  }

  useEffect(() => {
    if (puuid) {
      getMatches()
    }
  }, [puuid])

  useEffect(() => {
    if (detail_match_data.length <= 19) {
      getDetailMatchData()
    }
  }, [match_list_data.length > 0])

  // 배열 정렬
  const filtered_data = useMemo(() => {
    return [...detail_match_data].sort((a, b) => b.info.gameCreation - a.info.gameCreation)
  }, [detail_match_data])

  useEffect(() => {
    console.log(filtered_data)
  }, [filtered_data])
  return (
    <>
      {filtered_data?.map((item, index) => {
        const self = item.info.participants.filter((i) => i.summonerName.includes(search_name))
        const win = item.info.participants
          .filter((i) => i.summonerName.includes(search_name))
          .map((i) => i.win)
          .join('')

        const totalKill = item.info.participants
          .filter((i) => i.teamId === +self.filter((item) => item.teamId).map((v) => v.teamId))
          .map((i) => i.kills)
          .reduce((acc, cur) => acc + cur, 0)

        const largestKill = self
          .filter((i) => i.largestMultiKill)
          .map((i) => i.largestMultiKill)
          .join('')

        return (
          <div className='match_item'>
            <div className='match_wrap'>
              <div className={`content ${win === 'true' ? 'Win' : 'Lose'}`}>
                <div className='game_stats'>
                  <div className='game_type'>
                    <span>{item.info.gameMode === 'ARAM' ? '칼바람 나락' : '일반'}</span>
                  </div>
                  <div className='game_time'>18시간전</div>
                  <div className='bar'></div>
                  <div className={`game_result ${win === 'true' ? 'win' : 'lose'}`}>
                    {win === 'true' ? '승리' : '패배'}
                  </div>
                  <div className='game_length'>{second2MS(item.info.gameDuration)}</div>
                </div>
                <div className='game_setting_info'>
                  <div className='info_box'>
                    <div className='cham_img'>
                      <img
                        src={`${CHAMP_URL}/${self.map((i) => i.championName)}.png`}
                        alt='champ_img'
                      />
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
                        <img
                          src={`${RUNES_IMG}/Domination/DarkHarvest/DarkHarvest.png`}
                          alt='runes'
                        />
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
                    {self.map((i) => i.kills)} / <span>{self.map((i) => i.deaths)}</span> /{' '}
                    {self.map((i) => i.assists)}
                  </div>
                  <div className='kda_avg'>
                    {(
                      (parseInt(self.map((i) => i.kills).join('')) +
                        parseInt(self.map((i) => i.assists).join(''))) /
                      parseInt(self.map((i) => i.deaths).join(''))
                    ).toFixed(2)}
                    :1 <span>평점</span>
                  </div>
                  <div className='kda_kill'>
                    {largestKill !== '1' && (
                      <span>
                        {largestKill === '2'
                          ? '더블킬'
                          : largestKill === '3'
                          ? '트리플킬'
                          : largestKill === '4'
                          ? '쿼드라킬'
                          : '펜타킬'}
                      </span>
                    )}
                  </div>
                </div>
                <div className='stats'>
                  <div className='stats_info'>
                    <span>레벨{self.map((i) => i.champLevel)}</span>
                  </div>
                  <div className='stats_info'>
                    <span>50 (3.1) CS</span>
                  </div>
                  <div className='stats_info'>
                    <span className='stats_kill'>
                      킬관여
                      {(
                        ((parseInt(self.map((i) => i.kills).join('')) +
                          parseInt(self.map((i) => i.assists).join(''))) /
                          totalKill) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
                <div className='item'>
                  <div className='item_list'>
                    <div className='item'>
                      {+self.filter((i) => i.item0).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item0).map((i) => i.item0)}.png`}
                          alt='item0'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item1).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item1).map((i) => i.item1)}.png`}
                          alt='item1'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item2).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item2).map((i) => i.item2)}.png`}
                          alt='item2'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item6).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item6).map((i) => i.item6)}.png`}
                          alt='item6'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item3).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item3).map((i) => i.item3)}.png`}
                          alt='item3'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item4).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item4).map((i) => i.item4)}.png`}
                          alt='item1'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      {+self.filter((i) => i.item5).join('') !== 0 ? (
                        <img
                          src={`${ITEM_IMG}/${self.filter((i) => i.item5).map((i) => i.item5)}.png`}
                          alt='item1'
                        />
                      ) : (
                        <div className='noneItem'></div>
                      )}
                    </div>
                    <div className='item'>
                      <div className='noneItem'>
                        <Icon icon='mdi:magic-staff' className='magic' />
                      </div>
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
        )
      })}
    </>
  )
}
