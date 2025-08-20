export interface CustomerBookingInfo {
    email: string,
    phone?: string,
    mobile: string,
    lastName: string,
    firstName: string,
    guestLastName: string,
    guestFirstName: string,
    nationality: number,
    nationId?: number,
    isBusinessTravel?: number,
}