import type { CustomerBookingInfo } from "../types/CustomerBookingData";
import type { HotelResponse } from "../types/hotel";
import type { HotelRoom } from "../types/hotelDetail";
import type { HotelSummary } from "../types/hotelSummary";
import type { Nation } from "../types/nations";
import type { FinalizeBookResponse, PreReserveResponse } from "../types/reservation";
import type { ReservationHistory } from "../types/reservationHistory";
import type { FlatLocation } from "../types/states";
import { authorizedAxios } from "./anonymousAxios";


export const getStatesAndCities = async (search: string): Promise<FlatLocation[]> => {
  const { data } = await authorizedAxios.get<FlatLocation[]>(`Locations?search=${search}`);
  return data;
};

export const getNations = async (): Promise<Nation[]> => {
  const { data } = await authorizedAxios.get<Nation[]>(`Nations`);
  return data;
};

export const getHotels = async (startDate: string, endDate: string, pageIndex: number, cityId: number, stateId: number): Promise<HotelResponse> => {
  const { data } = await authorizedAxios.post<HotelResponse>('Hotels', {
    startDate,
    endDate,
    cityId,
    stateId,
    pageIndex
  });
  return data;
}

export const getHotelRooms = async (startDate: string, endDate: string, hotelId: number): Promise<HotelRoom[]> => {
  const { data } = await authorizedAxios.get<HotelRoom[]>(`Hotels/${hotelId}/GetRooms?startDate=${startDate}&endDate=${endDate}`);
  return data;
}

export const getHotelSummary = async (startDate: string, endDate: string, hotelId: number): Promise<HotelSummary> => {
  const { data } = await authorizedAxios.get<HotelSummary>(`Hotels/${hotelId}?startDate=${startDate}&endDate=${endDate}`);
  return data;
}

export const preReserve = async (input: CustomerBookingInfo): Promise<PreReserveResponse> => {
  const { data } = await authorizedAxios.post<PreReserveResponse>('Booking', input);
  return data;
}

export const getReservesHistory = async (type: "completed" | "rejected" | "pending", phone: string): Promise<ReservationHistory[]> => {
  let url = "";

  if (type === "completed") url = "Booking/Completed";
  if (type === "rejected") url = "Booking/Rejected";
  if (type === "pending") url = "Booking/Pending";

  const { data } = await authorizedAxios.get<ReservationHistory[]>(`${url}/${phone}`);
  return data;
};

export const finalizeBook = async (reserveId: string): Promise<FinalizeBookResponse> => {
  const { data } = await authorizedAxios.post<FinalizeBookResponse>(`Booking/FinalizeBook/${reserveId}`);
  return data;
}