import React, { memo, useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { CHAMP_IMG, ITEM_IMG, RUNES_IMG, SPELL_IMG } from '../function/api-constant'
import { second2MS } from '../function/function'
import { SpellModel } from '../hooks/useSpell'
import GetRunesResponseDataModel from '../service/runes/model/get-runes-response-data-model'
import { ChampInfoModel } from '../service/champion/model/get-champion-response-data'
import GetDetailMatchResponseDataModel, {
  PartcipantMoel,
} from '../service/match/model/get-detail-match-response-data-model'
import 'moment/locale/ko'
import '../styles/match.scss'

interface Props {
  matchData: GetDetailMatchResponseDataModel
  summonerName: string
  spellData: SpellModel[]
  championData: Array<ChampInfoModel>
  runesData: GetRunesResponseDataModel[]
}

const Match = (props: Props) => {
  const [self, setSelf] = useState<PartcipantMoel | undefined>(undefined)

  const queueId = props.matchData.info.queueId

  const totalKill = props.matchData.info.participants
    .filter((i) => i.teamId === self?.teamId)
    .map((i) => i.kills)
    .reduce((acc, cur) => acc + cur, 0)

  const largestKill = useMemo(() => self?.largestMultiKill ?? 0, [self])

  const gameCreation = moment(props.matchData.info.gameStartTimestamp).fromNow()

  const champion_name = useMemo(() => self?.championName ?? '', [self])
  const name = useMemo(
    () => props.championData.find((v) => v.id === champion_name)?.name ?? '',
    [props.championData, champion_name]
  )

  const spell1 = useMemo(() => self?.summoner1Id, [self])
  const spell2 = useMemo(() => self?.summoner2Id, [self])

  const spell1_img = useMemo(
    () => props.spellData?.find((i) => i.key === spell1 + '')?.image.full,
    [props.spellData, spell1]
  )
  const spell2_img = useMemo(
    () => props.spellData?.find((i) => i.key === spell2 + '')?.image.full,
    [props.spellData, spell2]
  )

  const mainRunes = useMemo(() => self?.perks.styles[0].style ?? '', [self])
  const subRunes = useMemo(() => self?.perks.styles[1].style ?? '', [self])

  const mainRunes_img = useMemo(() => {
    if (mainRunes) {
      return props.runesData.find((i) => i.id === mainRunes)?.slots[0].runes[0].icon ?? ''
    }
    return ''
  }, [mainRunes, props.runesData])

  const subRunes_img = useMemo(() => {
    if (subRunes) {
      return props.runesData.find((i) => i.id === subRunes)?.icon ?? ''
    }
    return ''
  }, [subRunes, props.runesData])

  const redTeam = useMemo(
    () => props.matchData.info.participants.filter((i) => i.teamId === 100),
    [props.matchData]
  )
  const blueTeam = useMemo(
    () => props.matchData.info.participants.filter((i) => i.teamId === 200),
    [props.matchData]
  )

  useEffect(() => {
    if (props.matchData && props.summonerName) {
      setSelf(() =>
        props.matchData.info.participants.find((i) => i.summonerName === props.summonerName)
      )
    }
  }, [])

  if (!self) return null

  return (
    <React.Fragment>
      <div className='match_item'>
        <div className='match_wrap'>
          <div className={`content ${self.win === true ? 'Win' : 'Lose'}`}>
            <div className='game_stats'>
              <div className='game_type'>
                <span>{queueId === 420 ? '솔랭' : queueId === 430 ? '일반' : '칼바람 나락'}</span>
              </div>
              <div className='game_time'>{gameCreation}</div>
              <div className='bar'></div>
              <div className={`game_result ${self.win === true ? 'win' : 'lose'}`}>
                {self.win === true ? '승리' : '패배'}
              </div>
              <div className='game_length'>{second2MS(props.matchData.info.gameDuration)}</div>
            </div>
            <div className='game_setting_info'>
              <div className='info_box'>
                <div className='cham_img'>
                  <img
                    src={`${CHAMP_IMG}/${
                      self.championName === 'FiddleSticks'
                        ? 'Fiddlesticks.png'
                        : self.championName + '.png'
                    }`}
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
                <span>{name}</span>
              </div>
            </div>
            <div className='kda'>
              <div className='kda_score'>
                {self?.kills} / <span>{self?.deaths}</span> / {self?.assists}
              </div>
              <div className='kda_avg'>
                {self
                  ? ((Number(self.kills) + Number(self.assists)) / Number(self.deaths)).toFixed(2)
                  : ''}
                :1 <span>평점</span>
              </div>
              <div className='kda_kill'>
                <span>{multiKillNameBylargestKill(largestKill)}</span>
              </div>
            </div>
            <div className='stats'>
              <div className='stats_info'>
                <span>{`레벨 ${self.champLevel}`}</span>
              </div>
              <div className='stats_info'>
                <span className='stats_kill'>
                  {`킬관여 ${(
                    ((Number(self.kills) + Number(self.assists)) / totalKill) *
                    100
                  ).toFixed(0)}%`}
                </span>
              </div>
            </div>
            <div className='item'>
              <div className='item_list'>
                <div className='item'>
                  {+self.item0 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item0}.png`} alt='item0' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item1 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item1}.png`} alt='item1' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item2 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item2}.png`} alt='item2' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item6 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item6}.png`} alt='item6' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item3 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item3}.png`} alt='item3' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item4 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item4}.png`} alt='item1' />
                  ) : (
                    <div className='noneItem'></div>
                  )}
                </div>
                <div className='item'>
                  {+self.item5 !== 0 ? (
                    <img src={`${ITEM_IMG}/${self.item5}.png`} alt='item1' />
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
              <div style={{ width: '100%', display: 'flex' }}>
                <div className='team'>
                  {redTeam.map((i, idx) => (
                    <React.Fragment key={idx}>
                      <div className='summoner'>
                        <div className='play_champ'>
                          <img
                            src={`${CHAMP_IMG}/${
                              i.championName === 'FiddleSticks' ? 'Fiddlesticks' : i.championName
                            }.png`}
                            alt='champ'
                          />
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
                          <img
                            src={`${CHAMP_IMG}/${
                              i.championName === 'FiddleSticks' ? 'Fiddlesticks' : i.championName
                            }.png`}
                            alt='champ'
                          />
                        </div>
                        <div className='player_name'>
                          <span>{i.summonerName}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className='stats_btn'></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default memo(Match)

const multiKillNameBylargestKill = (largestKill = 0) => {
  switch (largestKill) {
    case 2:
      return '더블킬'
    case 3:
      return '트리플킬'
    case 4:
      return '쿼드라킬'
    case 5:
      return '펜타킬'
    default:
      return null
  }
}
