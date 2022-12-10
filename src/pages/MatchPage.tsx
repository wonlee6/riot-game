import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import API from '../service/api'
import { ChampInfoModel } from '../service/champion/model/get-champion-response-data'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'

import useSpell, { SpellModel } from '../hooks/useSpell'
import useRunes from '../hooks/useRunes'
import useChampion from '../hooks/useChampion'

import Nav from '../components/Nav'
import SummonerInfo from '../components/SummonerInfo'
import Summoner from '../components/Summoner'
import Match from '../components/Match'
import '../styles/main_page.scss'
import { MatchRecoilFn } from './MainPage'

const MatchPage = () => {
  const { summonerAuthData } = MatchRecoilFn()

  const [totalResult, setTotalResult] = useState({
    win: 0,
    lose: 0,
  })
  const [matchLength, setMatchLength] = useState(0)

  /**
   *  API State
   */
  // match data
  const [matchListData, setMatchListData] = useState([])
  // detail match data
  const [detailMatchData, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>([])

  // match 정보 가져오기
  const getMatches = async () => {
    if (summonerAuthData) {
      await API.match
        .matches(summonerAuthData.puuid, matchLength, matchLength + 10)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
            setMatchLength((prev) => prev + 10)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useLayoutEffect(() => {
    getMatches()
  }, [])

  // match detail 정보 가져오기
  const getDetailMatchData = async () => {
    try {
      const response = await Promise.allSettled(
        matchListData.map((item) => API.match.detailMatch(item))
      )
      response.forEach((item) => {
        if (item.status === 'fulfilled') {
          setDetailMatchData((prev) => [...prev, item.value.data])
        }
      })
    } catch (error) {
      console.log('match detail', error)
    }
  }

  const filteredData = useMemo(() => {
    return detailMatchData.sort((a, b) => b.info.gameCreation - a.info.gameCreation)
  }, [detailMatchData])

  useLayoutEffect(() => {
    if (matchListData.length > 0) {
      getDetailMatchData()
    }
  }, [matchListData])

  /**
   *  API - Spell, Runes, Champion
   */
  const spellData = useSpell()
  const runesData = useRunes()
  const championData = useChampion()

  const filteredSpellData: Array<SpellModel> = useMemo(() => {
    const result = []
    if (spellData.isSuccess) {
      for (const value of Object.values(spellData.data)) {
        result.push(value)
      }
    }
    return result
  }, [spellData])

  const filteredChampData: Array<ChampInfoModel> = useMemo(() => {
    if (championData.isSuccess) {
      return Object.values(championData.data)
    }
    return []
  }, [championData])

  const filteredTotalResultData = useMemo(() => {
    const self = [...detailMatchData]
      .map((i) =>
        i.info.participants.filter(
          (v) => summonerAuthData && v.summonerName.includes(summonerAuthData?.name)
        )
      )
      .map((i) => i.map((i) => i.win))
      .reduce((acc, cur) => acc.concat(cur), [])
      .reduce((acc: any, cur: any) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
      }, {})

    return self
  }, [detailMatchData, summonerAuthData])

  useLayoutEffect(() => {
    if (typeof filteredTotalResultData !== 'undefined') {
      setTotalResult({
        win: filteredTotalResultData.true,
        lose: filteredTotalResultData.false,
      })
    }
  }, [filteredTotalResultData])

  const [isAllData, setIsAllData] = useState(false)

  useEffect(() => {
    if (
      filteredData?.length > 0 &&
      filteredChampData?.length > 0 &&
      filteredSpellData?.length > 0 &&
      runesData?.length > 0
    ) {
      setIsAllData(true)
    }
  }, [filteredData, filteredChampData, filteredSpellData, runesData])

  return (
    <>
      <Nav />
      <div className='container'>
        <div className='summoner_info_container'>
          <div className='summoner_card'>
            <SummonerInfo />
          </div>
          <div className='match_container'>
            <div className='most_champ_box'>
              <Summoner totalResult={totalResult} />
            </div>
            <div className='match_list_box'>
              {summonerAuthData && isAllData
                ? filteredData.map((item) => (
                    <Match
                      key={item.info.gameId}
                      matchData={item}
                      summonerName={summonerAuthData.name}
                      spellData={filteredSpellData}
                      championData={filteredChampData}
                      runesData={runesData}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MatchPage
