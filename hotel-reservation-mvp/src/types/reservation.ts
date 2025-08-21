export interface RoomBooking {
  quantity: number;
  image?: string;
  name: string;
  price: number;
  id: number
}

export interface BookingData {
  rooms: RoomBooking[];
  hotelId: number;
  image: string,
  address: string,
  grade: string,
  startDate: string;
  endDate: string;
}


export interface PreReserveResponse {
  seserveId: string;
  stateId: number;
  statusText: string;
  paymentExpireDate: string;
  paymentExpireSeconds: number;

}

export interface FinalizeBookResponse {
  id: number
  priceToPay: number;
  isFinalized: boolean;
}