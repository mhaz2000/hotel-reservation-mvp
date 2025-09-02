import { authorizedAxios } from "./anonymousAxios";

export const requestPayment = async (reserveId: string): Promise<string> => {
  const { data } = await authorizedAxios.post<string>(`Payment/request/${reserveId}`);
  return data;
}

export const PaymentStatus = async (id:string): Promise<{isSuccess: boolean, rrn: string, amount:number}> => {
  const { data } = await authorizedAxios.get<{isSuccess: boolean, rrn: string, amount:number}>(`Payment/Status/${id}`);
  return data;
}