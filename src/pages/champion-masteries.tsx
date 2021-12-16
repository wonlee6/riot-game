import { useEffect, useState } from 'react'
import API from '../service/api'

type ChampionMasteriesModel = {
  uid: string
}

export default function ChampionMasteries({ uid }: ChampionMasteriesModel) {
  /*
   * API REQUEST
   */
  // 모든 챔피언 숙련도 정보 가져오기
  const championMasteries = async () => {
    await API.champion_masteries
      .getChampionMasteries(uid)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (uid) {
      championMasteries()
    }
  }, [uid])
  return (
    <>
      <div>ddd</div>
    </>
  )
}
