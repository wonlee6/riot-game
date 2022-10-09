import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useLocation } from 'react-router'
import { AxiosResponse } from 'axios'

import summonerAuth, { summonerAuthData } from '../recoil/summonerAuth'
import summonerData from '../recoil/summonerData'

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
import LoadingSpinner from '../components/common/LoadingSpinner'
import '../styles/main_page.scss'

export const MatchRecoilFn = () => ({
  setSummonerAuth: useSetRecoilState(summonerAuth),
  summonerAuthData: useRecoilValue(summonerAuthData),
  summonerData: useRecoilValue(summonerData),
})

const MatchPage = () => {
  const location = useLocation()
  const { setSummonerAuth, summonerAuthData } = MatchRecoilFn()

  const [isPending, startTransition] = useTransition()
  const matchLength: React.MutableRefObject<number> = useRef<number>(0)
  /**
   *  API State
   */
  // match data
  const [matchListData, setMatchListData] = useState([])
  // detail match data
  const [detailMatchData, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>([])

  const [isMatchListData, setIsMatchListData] = useState<boolean>(false)

  // 서머너 검색
  const searchSummoner = async (name: string) => {
    await API.summoner //
      .searchSummoner(name)
      .then((res) => {
        if (res.status === 200) {
          setSummonerAuth(res.data)
          setIsMatchListData(true)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    const stateName = location.state as string
    if (stateName) {
      searchSummoner(stateName)
    }

    return () => {
      setMatchListData([])
      setDetailMatchData([])
      matchLength.current = 0
    }
  }, [location.state])

  useEffect(() => {
    if (isMatchListData) {
      setTimeout(() => {
        setIsMatchListData(false)
      }, 1000)
    }
  }, [isMatchListData])

  // match 정보 가져오기
  const getMatches = async () => {
    if (summonerAuthData) {
      await API.match
        .matches(summonerAuthData.puuid, matchLength.current, matchLength.current + 19)
        .then((res) => {
          if (res.status === 200) {
            setMatchListData(res.data)
            matchLength.current = matchLength.current + 19
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    getMatches()
  }, [summonerAuthData])

  // match detail 정보 가져오기
  const getDetailMatchData = async () => {
    await Promise.allSettled(matchListData.map((item) => API.match.detailMatch(item))).then(
      (response: PromiseSettledResult<AxiosResponse<any, any>>[]) =>
        response.forEach((item) => {
          if (item.status === 'fulfilled') {
            startTransition(() => {
              setDetailMatchData((prev) => [...prev, item.value.data])
            })
          }
        })
    )
  }

  const filtered_data = useMemo(() => {
    return detailMatchData.sort((a, b) => b.info.gameCreation - a.info.gameCreation)
  }, [detailMatchData])

  useEffect(() => {
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

  return (
    <>
      <Nav />
      <div className='container'>
        <div className='summoner_info_container'>
          <div className='summoner_card'>
            {isMatchListData ? <LoadingSpinner /> : <SummonerInfo />}
          </div>
          <div className='match_container'>
            <div className='most_champ_box'>
              <Summoner />
            </div>
            <div className='match_list_box'>
              {isPending ? (
                <LoadingSpinner />
              ) : (
                summonerAuthData &&
                filtered_data.map((item) => (
                  <Match
                    key={item.info.gameId}
                    matchData={item}
                    summonerName={summonerAuthData.name}
                    spellData={filteredSpellData}
                    championData={filteredChampData}
                    runesData={runesData.data}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MatchPage
