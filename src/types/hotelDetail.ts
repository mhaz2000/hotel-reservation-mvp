export interface HtoelRoomDetial {
    room: Room
}

export interface Room {
    roomContainer: RoomContainer[]
}

export interface RoomContainer {
    id: number
    isHourly: boolean
    name: string
    foreignName: any
    packageId: any
    roomInfos: RoomInfo[]
    mainPicture?: MainPicture
}

export interface MainPicture {
    alt: string
    jpg: string
    webp: string
    lazy: boolean
    thumbnailUrl: string
}

export interface RoomInfo {
    noPrice: boolean
    letMeKnow: boolean
    roomCollapseViewId: string
    reservable: boolean
    bestRoomClass: string
    lastRoomLeft: boolean
    canReserveByTour: boolean
    roomCapacity: RoomCapacity
    roomPrice: RoomPrice
    roomDetail: RoomDetail
    roomInfoFacility: any
}

export interface RoomDetail {
    nonRefundable: boolean
    breakfast: boolean
    lunch: boolean
    dinner: boolean
    foodText: any
}

export interface RoomCapacity {
    adultCapacity: number
    infantCapacity: number
    extraCapacity: number
    extraCapacityPrice: number
    extraCapacityText: string
    hotelPolicyChildDescription: string
}

export interface RoomPrice {
    discount: number
    price: Price
}

export interface Price {
    startingText: string
    oldPrice: boolean
    boardPrice: number
    ihoPrice: number
    nights: number
    averageIhoPrice: number
}