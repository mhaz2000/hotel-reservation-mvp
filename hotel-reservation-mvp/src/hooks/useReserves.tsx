import { useEffect, useState } from "react";
import type { ReservationHistory } from "../types/reservationHistory";
import { getReservesHistory } from "../api/hotel";

export function useReserves(type: "completed" | "rejected" | "pending", phone: string) {
  const [data, setData] = useState<ReservationHistory[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getReservesHistory(type, phone);
      if (isMounted) setData(result);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchData();

  return () => {
    isMounted = false; // cleanup to avoid state update on unmounted component
  };
}, [type, phone]);


  return { data, loading };
}
