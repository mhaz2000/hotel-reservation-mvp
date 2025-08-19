export interface HotelSummary {
  wifi: boolean
  wifiDescription: string
  parking: boolean
  parkingDescription: string
  gallery: Gallery[]
  checkin: string
  checkout: string
  seasonNotes: any[]
  cancellationPolicy: string
  childrenCancellationPolicy: string
  otherNotes: string
  noroozNotes: any[]
  about: string
  location: Location
  restaurant: string
  facilityCategories: FacilityCategory[]
  rates: Rate[]
  freeWifi: boolean
  freeParking: boolean
  id: number
  name: string
  hotelRank: string
  address: string
  rankName: string
  gradeName: string
  boardPrice: number
  ihoPrice: number
  ihoPriceEn: number
  boardPriceEn: number
  rawIhoPrice: number
  hasFreeTransfer: boolean
  fullName: string
  fullCapacity: boolean
}

export interface Gallery {
  title: any
  titleEn: string
  pictureUrl: string
}

export interface Location {
  lat: string
  lng: string
}

export interface FacilityCategory {
  name: string
  facilities: Facility[]
}

export interface Facility {
  name: string
}

export interface Rate {
  question: string
  rate: string
}
