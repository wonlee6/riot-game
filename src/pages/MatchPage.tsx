import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import API from '../service/api'
import '../styles/main_page.scss'
import Nav from '../components/Nav'
import SummonerInfo from '../components/SummonerInfo'
import { useLocation } from 'react-router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import summonerAuth, { summonerAuthData } from '../recoil/summonerAuth'
import summonerData from '../recoil/summonerData'
import GetDetailMatchResponseDataModel from '../service/match/model/get-detail-match-response-data-model'
import { AxiosResponse } from 'axios'
import Summoner from '../components/Summoner'
import Match from '../components/Match'
import LoadingSpinner from '../components/common/LoadingSpinner'
import GetSpellResponseDataModel from '../service/spell/model/get-spell-response-data-model'
import GetRunesResponseDataModel from '../service/runes/model/get-runes-response-data-model'

export interface ChampionDataModel {
  [e: string]: {
    id: string
    name: string
  }
}

export const MatchRecoilFn = () => ({
  setSummonerAuth: useSetRecoilState(summonerAuth),
  summonerAuthData: useRecoilValue(summonerAuthData),
  summonerData: useRecoilValue(summonerData),
})

const MatchPage = () => {
  const location = useLocation()
  const { setSummonerAuth, summonerAuthData } = MatchRecoilFn()

  // match data
  const [matchListData, setMatchListData] = useState([])
  // detail match data
  const [detailMatchData, setDetailMatchData] = useState<Array<GetDetailMatchResponseDataModel>>([])

  const matchLength: React.MutableRefObject<number> = useRef<number>(0)

  const [isMatchListData, setIsMatchListData] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  // spell data
  const [spellData, setSpellData] = useState<GetSpellResponseDataModel>()
  // runes data
  const [runesData, setRunesData] = useState<Array<GetRunesResponseDataModel>>([])
  // champion data
  const [championData, setChampionData] = useState<ChampionDataModel>()

  /**
   *  API Request
   */
  // spell 정보 가져오기
  const spell = useCallback(async () => {
    await API.spell
      .spell()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data
          setSpellData(data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  // 룬 정보 가져오기
  const runes = useCallback(async () => {
    await API.runes
      .runes()
      .then((res) => {
        setRunesData(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  // 챔피언 이름 가져오기
  const champion = useCallback(async () => {
    await API.champion
      .champion()
      .then((res) => {
        if (res.status === 200) {
          setChampionData(res.data.data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    spell()
    runes()
    champion()
  }, [])

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
        response.map((item) => {
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
                    spellData={spellData}
                    championData={championData}
                    runesData={runesData}
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
