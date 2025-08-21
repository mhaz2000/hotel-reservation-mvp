import { useReserves } from "../../hooks/useReserves";
import ReservesDetail from "./ReservesDetail";

interface FailedReservesProps {
  phone: string
}

const FailedReserves = ({phone} : FailedReservesProps) => {
  const { data, loading } = useReserves("rejected", phone);

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return <ReservesDetail reservations={data} />;
};

export default FailedReserves;
