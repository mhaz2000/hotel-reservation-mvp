import type { HotelResponse } from "../types/hotel";
import type { HotelRoom } from "../types/hotelDetail";
import type { HotelSummary } from "../types/hotelSummary";
import type { FlatLocation} from "../types/states";
import { authorizedAxios } from "./anonymousAxios";


export const getStatesAndCities = async (search: string): Promise<FlatLocation[]> => {
  const { data } = await authorizedAxios.get<FlatLocation[]>(`Locations?search=${search}`);
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