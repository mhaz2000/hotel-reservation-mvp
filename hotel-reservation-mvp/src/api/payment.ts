import { authorizedAxios } from "./anonymousAxios";

export const requestPayment = async (reserveId: string): Promise<string> => {
  const { data } = await authorizedAxios.post<string>(`Payment/request/${reserveId}`);
  return data;
}