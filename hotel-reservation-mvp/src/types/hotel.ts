export interface HotelSelectLocaion {
    cityId: number;
    stateId: number;
}

export interface HotelResponse {
  pageIndex: number
  pageSize: number
  totalItems: number
  data: Hotel[]
}

export interface Hotel {
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
