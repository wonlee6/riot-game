import { Icon } from '@iconify/react'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { CHAMP_IMG, ITEM_IMG, RUNES_IMG, SPELL_IMG } from '../function/api-constant'
import { fromNowDate, second2MS } from '../function/function'
import API from '../service/api'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'
import GetRunesResponseDataModel from '../service/runes/model/get-runes-response-data-model'
import GetSpellResponseDataModel from '../service/spell/model/get-spell-response-data-model'
import '../styles/match.scss'

type MatchModel = {
  puuid: string | undefined
  search_name: string
}
type SpellDataModel = {
  key: string
  name: string
  description: string
  image: {
    full: string
  }
}

export default function Match({ puuid, search_name }: MatchModel) {
  const [count, setCount] = useState(20)

  // match data
  const [match_list_data, setMatchListData] = useState([])
  // detail match data
  const [detail_match_data, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>(
    []
  )
  // spell data
  const [spell_data, setSpellData] = useState<GetSpellResponseDataModel>()
  // runes data
  const [runes_data, setRunesData] = useState<Array<GetRunesResponseDataModel>>([])

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

  // spell 정보 가져오기
  const spell = async () => {
    if (spell_data) return
    await API.spell
      .spell()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data
          setSpellData(data)
        }
      })
      .catch((err) => console.log(err))
  }

  // 룬 정보 가져오기
  const runes = async () => {
    await API.runes
      .runes()
      .then((res) => {
        setRunesData(res.data)
      })
      .catch((err) => console.log(err))
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

  useEffect(() => {
    spell()
    runes()
  }, [])

  // 배열 정렬
  const filtered_data = useMemo(() => {
    return [...detail_match_data].sort((a, b) => b.info.gameCreation - a.info.gameCreation)
  }, [detail_match_data])

  // spell info data
  const filtered_spell_data = useMemo(() => {
    const result = [] as any
    result.push(spell_data?.SummonerBarrier)
    result.push(spell_data?.SummonerBoost)
    result.push(spell_data?.SummonerDot)
    result.push(spell_data?.SummonerExhaust)
    result.push(spell_data?.SummonerFlash)
    result.push(spell_data?.SummonerHaste)
    result.push(spell_data?.SummonerHeal)
    result.push(spell_data?.SummonerMana)
    result.push(spell_data?.SummonerPoroRecall)
    result.push(spell_data?.SummonerPoroThrow)
    result.push(spell_data?.SummonerSmite)
    result.push(spell_data?.SummonerSnowURFSnowball_Mark)
    result.push(spell_data?.SummonerSnowball)
    result.push(spell_data?.SummonerTeleport)
    result.push(spell_data?.Summoner_UltBookPlaceholder)
    result.push(spell_data?.Summoner_UltBookSmitePlaceholder)
    return result
  }, [spell_data])

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

        const largestKill = self.map((i) => i.largestMultiKill).join('')

        const gameCreation = moment(item.info.gameCreation).fromNow()

        const spell1 = self.map((i) => i.summoner1Id).join('')
        const spell2 = self.map((i) => i.summoner2Id).join('')

        const spell1_img = filtered_spell_data
          ?.filter((item: SpellDataModel) => item.key === spell1)
          .map((i: SpellDataModel) => i.image.full)

        const spell2_img = filtered_spell_data
          ?.filter((item: SpellDataModel) => item.key === spell2)
          .map((i: SpellDataModel) => i.image.full)

        const mainRunes = self.map((i) => i.perks.styles)[0][0].style
        const subRunes = self.map((i) => i.perks.styles)[0][1].style

        const mainRunes_img = runes_data
          ?.filter((i) => i.id === mainRunes)
          .map((i) => i.slots[0].runes[0].icon)

        const subRunes_img = runes_data?.filter((i) => i.id === subRunes).map((i) => i.icon)

        const redTeam = item.info.participants.filter((i) => i.teamId === 100)

        const blueTeam = item.info.participants.filter((i) => i.teamId === 200)
        return (
          <React.Fragment key={index}>
            <div className='match_item'>
              <div className='match_wrap'>
                <div className={`content ${win === 'true' ? 'Win' : 'Lose'}`}>
                  <div className='game_stats'>
                    <div className='game_type'>
                      <span>{item.info.gameMode === 'ARAM' ? '칼바람 나락' : '일반'}</span>
                    </div>
                    <div className='game_time'>{fromNowDate(gameCreation)}</div>
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
                          src={`${CHAMP_IMG}/${self.map((i) => i.championName)}.png`}
                          alt='champ_img'
                        />
                      </div>
                      <div className='spell'>
                        <div className='spell_item'>
                          <img src={`${SPELL_IMG}/${spell1_img}`} alt='spell' />
                        </div>
                        <div className='spell_item'>
                          <img src={`${SPELL_IMG}/${spell2_img}`} alt='spell2' />
                        </div>
                      </div>
                      <div className='runes'>
                        <div className='runes_item'>
                          <img src={`${RUNES_IMG}/${mainRunes_img}`} alt='runes' />
                        </div>
                        <div className='runes_item'>
                          <img src={`${RUNES_IMG}/${subRunes_img}`} alt='spell' />
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
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item0)
                              .map((i) => i.item0)}.png`}
                            alt='item0'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item1).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item1)
                              .map((i) => i.item1)}.png`}
                            alt='item1'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item2).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item2)
                              .map((i) => i.item2)}.png`}
                            alt='item2'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item6).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item6)
                              .map((i) => i.item6)}.png`}
                            alt='item6'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item3).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item3)
                              .map((i) => i.item3)}.png`}
                            alt='item3'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item4).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item4)
                              .map((i) => i.item4)}.png`}
                            alt='item1'
                          />
                        ) : (
                          <div className='noneItem'></div>
                        )}
                      </div>
                      <div className='item'>
                        {+self.filter((i) => i.item5).join('') !== 0 ? (
                          <img
                            src={`${ITEM_IMG}/${self
                              .filter((i) => i.item5)
                              .map((i) => i.item5)}.png`}
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
                      {redTeam.map((i, idx) => (
                        <React.Fragment key={idx}>
                          <div className='summoner'>
                            <div className='play_champ'>
                              <img src={`${CHAMP_IMG}/${i.championName}.png`} alt='champ' />
                            </div>
                            <div className='player_name'>
                              <span>{i.summonerName}</span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className='team'>
                      {blueTeam.map((i, idx) => (
                        <React.Fragment key={idx}>
                          <div className='summoner'>
                            <div className='play_champ'>
                              <img src={`${CHAMP_IMG}/${i.championName}.png`} alt='champ' />
                            </div>
                            <div className='player_name'>
                              <span>{i.summonerName}</span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className='stats_btn'></div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}
