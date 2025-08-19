export interface State {
  Id: number
  Title: string
  Cities: City[]
}

export interface City {
  Id: number
  Title: string
}


export interface FlatLocation {
  state: string
  stateId: number
  city: string
  cityId: number
}