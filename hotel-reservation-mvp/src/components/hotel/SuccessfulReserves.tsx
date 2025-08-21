import { useReserves } from "../../hooks/useReserves";
import ReservesDetail from "./ReservesDetail";

interface SuccessfulReservesProps {
  phone: string
}

const SuccessfulReserves = ({ phone }: SuccessfulReservesProps) => {
  const { data, loading } = useReserves("completed", phone);

  if (loading) return <p className="text-center">در حال بارگذاری...</p>;

  return <ReservesDetail reservations={data} />;
};

export default SuccessfulReserves;
