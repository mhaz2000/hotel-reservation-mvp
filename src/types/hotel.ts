export interface HotelSelectLocaion {
    cityId: number;
    country: string;
}

export interface LocationOrHotel {
    category: string;
    city: string;
    count: number;
    country: string;
    grade: number;
    id: number;
    name: string;
    link: string;
    placeName: string
    state: string;
}

export interface HotelResponse {
    PageTitle: PageTitle
    MetaTags: MetaTags
    Cards: Card[]
    FilterBar: FilterBar[]
    IsLoggedIn: boolean
    JsonInfo: string
    JsonBreadcrumb: string
    JsonFaq: string
    MapUrl: string
    ShowBanner: boolean
    HashKey: string
    FAQs: any[]
    Search: Search
    Breadcrumb: Breadcrumb
    SupportPhone: string
    OtherHotels: any[]
    PopularHotels: any[]
    PageGeneratorLinks: any[]
    ShabIndex: number
}

export interface PageTitle {
    Title: string
    CountHotel: number
    EndDate: string
    StartDate: string
}

export interface MetaTags {
    Title: string
    PageDescription: string
    Keywords: string
}

export interface Card {
    Header?: string
    Image: Image
    Labels: Labels
    FullCapacity: boolean
    Comment: boolean
    CardData: CardData
    LastVote: any
    RoomInfoHeader?: RoomInfoHeader
    Type: number
}

export interface Image {
    Label?: boolean
    Labels?: number[]
}

export interface Labels {
    Tags: Tag[]
    Promotions: Promotion[]
    IHOPlus: boolean
}

export interface Tag {
    Code: number
    Title: string
}

export interface Promotion {
    Description: string
    CountdownTimer: any
    Code: number
    Title: string
}

export interface CardData {
    Id: number
    ProviderHotelId: any
    HotelName: string
    HotelForeignName: any
    HotelUrl: string
    TypeTitle: string
    TypeId: number
    StyleId: number
    CityName: string
    CityEnName: string
    Pictures: Picture[]
    Score: Score
    Star?: Star
    Address: Address
    DiscountBalloon: DiscountBalloon
    Price: Price
    Weight: number
    FreeCapacity: boolean
    detailsRoom: any
    FullName: string
    RegionId: number
    HouseId: any
}

export interface Picture {
    Alt: string
    Jpg: string
    Webp: string
    Lazy: boolean
    ThumbnailUrl: any
}

export interface Score {
    ScoreNumber: number
    Text: string
    Description: string
    Fill: boolean
    SolidType: any
    Total: number
    PoorRank: number
    MiddleRank: number
    GoodRank: number
    VeryGoodRank: number
    ExcellentRank: number
    PoorRankPercent: number
    MiddleRankPercent: number
    GoodRankPercent: number
    VeryGoodRankPercent: number
    ExcellentRankPercent: number
    Url: any
}

export interface Star {
    BaseClassName: string
    HotelRate: boolean
    StarClassName: string
    GradeId: number
}

export interface Address {
    ClassName: string
    Address: string
    CityName: string
    CityEnName: any
    Long: number
    Lat: number
    State: string
    Map: any
}

export interface DiscountBalloon {
    Discount: number
    Type: string
    ClassName: string
}

export interface Price {
    StartingText: string
    OldPrice: boolean
    BoardPrice: number
    IhoPrice: number
    Nights: number
    AverageIhoPrice: number
}

export interface RoomInfoHeader {
    PromotionId: number
    PromotionType: number
    Description: string
    CountdownTimer: any
    Title: string
}

export interface FilterBar {
    Key: string
    Title: string
    Items: Item[]
}

export interface Item {
    Value: string
    Title?: string
}

export interface Search {
    StartDate: string
    EndDate: string
    StartDateGeorgian: string
    EndDateGeorgian: string
    Night: number
    SearchBox: string
    State: string
    Type: number
    Id: number
    Link: string
    HotelTypeId: number
    HotelStyleId: number
}

export interface Breadcrumb {
    "@context": string
    "@type": string
    itemListElement: any[]
}
