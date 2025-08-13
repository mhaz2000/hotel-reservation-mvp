import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getHotelRooms } from "../../api/hotel";
import type { HtoelRoomDetial } from "../../types/hotelDetail";
import { Coffee, Pizza, Sandwich, User, Plus, Minus } from "lucide-react";
import { toPersianDigits } from "../../utils/persianDigits";

interface HotelRoomSelectionProps {
    onIncrementRoom: (room: any) => void;
    onDecrementRoom: (room: any) => void;
    selectedRooms: any[];
}

export default function HotelRoomSelection({
    onIncrementRoom,
    onDecrementRoom,
    selectedRooms,
}: HotelRoomSelectionProps) {
    const [searchParams] = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const hotelIdParam = searchParams.get("hotelId");
    const hotelId = hotelIdParam ? Number(hotelIdParam) : null;

    const [rooms, setRooms] = useState<HtoelRoomDetial | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!startDate || !endDate || !hotelId) return;
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getHotelRooms(startDate, endDate, hotelId);
                setRooms(data);
            } catch (err) {
                console.error("Error fetching rooms:", err);
                setError("خطا در دریافت اطلاعات اتاق‌ها");
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, [startDate, endDate, hotelId]);

    const getQuantity = (containerId: number) => {
        const found = selectedRooms.find(
            (r) => r.container.id === containerId
        );
        return found ? found.quantity : 0;
    };

    if (!startDate || !endDate || !hotelId) {
        return <p className="text-center mt-6 text-red-500">پارامترهای جستجو معتبر نیستند</p>;
    }
    if (loading) return <p className="text-center mt-6">در حال بارگذاری اتاق‌ها...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="space-y-4">
            {!rooms?.room?.roomContainer?.length ? (
                <p>اتاقی یافت نشد</p>
            ) : (
                rooms.room.roomContainer.map((container) =>
                    container.roomInfos.map((info, idx) => {
                        const quantity = getQuantity(container.id);
                        return (
                            <div
                                key={`${container.id}-${idx}`}
                                className="bg-white border rounded-lg shadow p-4 flex flex-col md:flex-row md:gap-4"
                            >
                                {/* Image: on top for mobile, left for desktop */}
                                <div className="w-full md:w-36 h-36 md:h-28 flex-shrink-0 mb-2 md:mb-0">
                                    {container.mainPicture?.jpg ? (
                                        <img
                                            src={container.mainPicture.jpg}
                                            alt={container.mainPicture.alt || container.name}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <div className="bg-gray-200 w-full h-full rounded" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between text-right">
                                    <h2 className="text-lg font-bold mb-2">{toPersianDigits(container.name)}</h2>

                                    <div className="flex flex-wrap gap-2 text-gray-600 text-sm">
                                        <div className="flex items-center gap-1">
                                            <User className="text-gray-500" size={16} />
                                            {info.roomCapacity.adultCapacity} بزرگسال
                                            {info.roomCapacity.infantCapacity > 0 && (
                                                <>
                                                    <span>،</span>
                                                    {info.roomCapacity.infantCapacity} خردسال
                                                </>
                                            )}
                                        </div>
                                        {info.roomDetail.breakfast && (
                                            <div className="flex items-center gap-1">
                                                <Coffee size={16} /> صبحانه
                                            </div>
                                        )}
                                        {info.roomDetail.lunch && (
                                            <div className="flex items-center gap-1">
                                                <Sandwich size={16} /> ناهار
                                            </div>
                                        )}
                                        {info.roomDetail.dinner && (
                                            <div className="flex items-center gap-1">
                                                <Pizza size={16} /> شام
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Price & Buttons */}
                                <div className="flex flex-col md:items-end justify-between text-right mt-2 md:mt-0">
                                    {info.roomPrice.discount > 0 && (
                                        <div className="flex flex-row-reverse gap-2 mb-2">
                                            <div className="bg-green-100 text-green-600 text-sm font-bold px-2 py-1 rounded w-fit">
                                                {info.roomPrice.discount.toLocaleString("fa-IR")}%
                                            </div>
                                            <p className="text-sm line-through">
                                                {info.roomPrice.price.boardPrice.toLocaleString("fa-IR")} تومان
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex flex-row-reverse items-center gap-1">
                                        <p className="text-xs text-gray-500 mt-1">تومان</p>
                                        <p className="text-xl font-bold text-black">
                                            {info.roomPrice.price.ihoPrice.toLocaleString("fa-IR")}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{info.roomPrice.price.nights} شب</p>
                                    </div>

                                    {quantity === 0 ? (
                                        <button
                                            onClick={() => onIncrementRoom({ container, info })}
                                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2"
                                        >
                                            انتخاب اتاق
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => onDecrementRoom({ container, info })}
                                                className="p-2 border rounded hover:bg-gray-100"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span>{toPersianDigits(quantity)}</span>
                                            <button
                                                onClick={() => onIncrementRoom({ container, info })}
                                                className="p-2 border rounded hover:bg-gray-100"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )
            )}
        </div>

    );
}
