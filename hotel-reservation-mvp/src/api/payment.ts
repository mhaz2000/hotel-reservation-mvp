import type { PrePaymentInfo } from "../types/reservation";
import { authorizedAxios } from "./anonymousAxios";

export const requestPayment = async (reserveId: string): Promise<string> => {
  const { data } = await authorizedAxios.post<string>(`Payment/request/${reserveId}`);
  return data;
}

export const PaymentStatus = async (id: string): Promise<{ isSuccess: boolean, rrn: string, amount: number }> => {
  const { data } = await authorizedAxios.get<{ isSuccess: boolean, rrn: string, amount: number }>(`Payment/Status/${id}`);
  return data;
}


export const HotelPrePayment = async (reserveId: string): Promise<PrePaymentInfo> => {
  const { data } = await authorizedAxios.get<PrePaymentInfo>(`Booking/ReservationDetail/${reserveId}`);
  return data;
}