export interface CustomerBookingInfo {
    hotelId?: number,
    arrivalDate?: string,
    checkoutDate?: string,
    hotelImage?: string,
    hotelAddress?: string,
    hotelGrade?: string,
    hotelName? :string,
    email: string,
    phone?: string,
    mobile: string,
    lastName: string,
    firstName: string,
    isBusinessTravel?: number,
    rooms: CustomerBookingRoomInfo[]
}

export interface CustomerBookingRoomInfo {
    roomId: number;
    roomPrice: number;
    roomName: string;
    roomImage: string;
    guestLastName: string,
    guestFirstName: string,
    nationality: string,
    nationId?: number,
}