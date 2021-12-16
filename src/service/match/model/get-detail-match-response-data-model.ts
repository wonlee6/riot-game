export default interface GetDetailMatchResponseDataModel {
  info: {
    gameCreation: number
    gameDuration: number
    gameEndTimestamp: number
    gameId: number
    gameMode: string
    gameName: string
    gameStartTimestamp: number
    gameType: string
    gameVersion: string
    mapId: number
    participants: [
      {
        assists: number
        baronKills: number
        bountyLevel: number
        champLevel: number
        championId: number
        championName: string
        deaths: number
        doubleKills: number
        dragonKills: number
        firstBloodAssist: false
        firstBloodKill: true
        firstTowerAssist: false
        firstTowerKill: false
        gameEndedInEarlySurrender: false
        gameEndedInSurrender: true
        goldEarned: number
        goldSpent: number
        individualPosition: string
        inhibitorKills: number
        inhibitorTakedowns: number
        inhibitorsLost: number
        item0: number
        item1: number
        item2: number
        item3: number
        item4: number
        item5: number
        item6: number
        itemsPurchased: number
        killingSprees: number
        kills: number
        lane: string
        largestCriticalStrike: number
        largestKillingSpree: number
        largestMultiKill: number
        longestTimeSpentLiving: number
        magicDamageDealt: number
        magicDamageDealtToChampions: number
        magicDamageTaken: number
        neutralMinionsKilled: number
        nexusKills: number
        nexusLost: number
        nexusTakedowns: number
        participantId: number
        pentaKills: number
        perks: {
          statPerks: {
            defense: number
            flex: number
            offense: number
          }
          styles: [
            {
              description: string
              selections: [
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                },
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                },
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                },
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                }
              ]
              style: number
            },
            {
              description: string
              selections: [
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                },
                {
                  perk: number
                  var1: number
                  var2: number
                  var3: number
                }
              ]
              style: number
            }
          ]
        }
        physicalDamageDealtToChampions: number
        profileIcon: number
        puuid: string
        quadraKills: number
        role: string
        sightWardsBoughtInGame: number
        spell1Casts: number
        spell2Casts: number
        spell3Casts: number
        spell4Casts: number
        summoner1Casts: number
        summoner1Id: number
        summoner2Casts: number
        summoner2Id: number
        summonerId: string
        summonerLevel: number
        summonerName: string
        teamEarlySurrendered: false
        teamId: number
        teamPosition: ''
        timeCCingOthers: number
        timePlayed: number
        totalDamageDealt: number
        totalDamageDealtToChampions: number
        totalDamageShieldedOnTeammates: number
        totalDamageTaken: number
        totalHeal: number
        totalHealsOnTeammates: number
        totalMinionsKilled: number
        totalTimeCCDealt: number
        totalTimeSpentDead: number
        totalUnitsHealed: number
        tripleKills: number
        trueDamageDealt: number
        trueDamageDealtToChampions: number
        trueDamageTaken: number
        turretKills: number
        turretTakedowns: number
        turretsLost: number
        unrealKills: number
        visionScore: number
        visionWardsBoughtInGame: number
        wardsKilled: number
        wardsPlaced: number
        win: string
      }
    ]
  }
}
