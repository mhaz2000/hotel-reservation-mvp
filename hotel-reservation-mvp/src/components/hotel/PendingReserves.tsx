import { useReserves } from "../../hooks/useReserves";
import ReservesDetail from "./ReservesDetail";

interface PendingReservesProps {
    phone: string
    onPaid?: () => void;
}

const PendingReserves = ({ phone, onPaid }: PendingReservesProps) => {
    const { data, loading } = useReserves("pending", phone);

    if (loading) return <p className="text-center">در حال بارگذاری...</p>;

    return <ReservesDetail reservations={data} onPaid={onPaid}/>;
};

export default PendingReserves;
