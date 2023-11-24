export type CrateType = {
  name : string,
  limitRate: number,
  skins : SkinType[]
}
type SkinType = {
    name : string,
    color: string,
    price: number,
    img: string,
    minRate: number,
    maxRate: number,
    wear? : WearType[]
}
type WearType = {
  wearType : string, wearRate : number
}