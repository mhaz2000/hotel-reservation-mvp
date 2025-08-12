import type { HotelResponse, LocationOrHotel } from "../types/hotel";
import type { HtoelRoomDetial } from "../types/hotelDetail";
import type { HotelSummary } from "../types/hotelSummary";
import anonymousAxios from "./anonymousAxios";

export const getSuggestion = async (search: string): Promise<LocationOrHotel[]> => {
    const { data } = await anonymousAxios.get<LocationOrHotel[]>(`mvc/hotelInfo/suggest?query=${search}&take=20`);
    return data;
};


export const getHotels = async (startDate: string, endDate: string, pageIndex: number, cityId: number, country: string): Promise<HotelResponse> => {
    if (cityId && cityId !== 0)
        country = ''
    const { data } = await anonymousAxios.get<HotelResponse>(`mvc/v1/search/filter?CityId=${cityId}&ReferUrl=home&StartDate=${startDate}&EndDate=${endDate}&CountryName=${country}&PageIndex=${pageIndex}&PageSize=10`);
    return data;
}


export const getHotelRooms = async (startDate: string, endDate: string, hotelId: number): Promise<HtoelRoomDetial> => {
    const { data } = await anonymousAxios.post<HtoelRoomDetial>(`mvc/v1/hotelInfo/hotelRooms`, { startDate, endDate, hotelId });
    return data;
}

export const getHotelSummary = async (cityName: string, hotelName: string): Promise<HotelSummary> => {
    const { data } = await anonymousAxios.get<HotelSummary>(`mvc/v1/hotelInfo/getHotelSummaryInfo?cityName=${cityName}&hotelName=${hotelName}`);
    return data;
}