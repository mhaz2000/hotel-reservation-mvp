export interface ReservationHistory {
    reserveId: number;
    hotelName: string;
    hotelGrade: string;
    hotelImage: string;
    hotelAddress: string;
    startDate: string;
    endDate: string;
    firstName: string;
    lastName: string;
    mobile: string;
    phone: string;
    email: string;
    reserveDate: string;
    statusText: string;
    status: string;
    paymentExpiredIn: number;
    rooms: ReservationRoomHistory[];
}

export interface ReservationRoomHistory {
    name: string;
    quantity: number;
    price: number;
    image: string
}