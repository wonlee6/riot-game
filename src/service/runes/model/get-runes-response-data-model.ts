export default interface GetRunesResponseDataModel {
  icon: string
  id: number
  key: string
  name: string
  slots: {
    runes: {
      icon: string
      id: number
      key: string
      longDesc: string
      name: string
      shortDesc: string
    }[]
  }[]
}
