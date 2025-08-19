
export interface InBasketRoom {
  quantity: number
  room: HotelRoom
}

export interface HotelRoom {
  availability: Availability[]
  gallery: Gallery[]
  id: number
  name: string
  extraCapacity: number
  adultCapacity: number
  adultCapacityDescription: string
  infantCapacity: number
  infantCapacityDescription: string
  description: string
  roomSize: string
  bedSize: string
  facilities: Facility[]
  prices: Price[]
  hasEnter: boolean
  hasExit: boolean
}

export interface Availability {
  currentDate: string
  full: boolean
  blocked: boolean
  hasNoEnter: boolean
  hasNoExit: boolean
  closed: boolean
  isPackage: boolean
  freeCapacity: number
  roomId: number
}

export interface Gallery {
  title?: string
  pictureUrl: string
}

export interface Facility {
  title: string
  description: string
}

export interface Price {
  nights: Night[]
  promotions: any[]
  nonRefundable: boolean
}

export interface Night {
  currentDate: string
  boardPrice: number
  boardPriceEn: number
  ihoPrice: number
  rawIhoPrice: number
  ihoPriceEn: number
  minSalePrice: number
  commissionPrice: number
  extraBoardPrice: number
  extraIhoPrice: number
  breakFast: boolean
  lunch: boolean
  dinner: boolean
}
