export interface HotelSummary {
    ModalHotelGallery: ModalHotelGallery
    HotelHeader: HotelHeader
}

export interface ModalHotelGallery {
    HotelName: string
    Pictures: HotelPicture[]
}

export interface HotelPicture {
    Alt: string,
    Jpg: string,
    Webp: string,
}

export interface HotelHeader {
    Score: HoterHeaderScore,
    Star: HoterHeaderStar,
    Address: HoterHeaderAddress,
    text: string,
    total: number
}

export interface HoterHeaderScore {
    ScoreNumber: number
}

export interface HoterHeaderStar {
    GradeId: number
}

export interface HoterHeaderAddress {
    Address: string
}