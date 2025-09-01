import { authorizedAxios } from "./anonymousAxios";

export const requestPayment = async (reserveId: string): Promise<string> => {
  const { data } = await authorizedAxios.post<string>(`Payment/request/${reserveId}`);
  return data;
}

export const PaymentStatus = async (): Promise<{isSuccess: boolean}> => {
  const { data } = await authorizedAxios.get<{isSuccess: boolean}>(`Payment/Status`);
  return data;
}