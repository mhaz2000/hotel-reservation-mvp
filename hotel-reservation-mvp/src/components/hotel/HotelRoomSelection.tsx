import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getHotelRooms } from "../../api/hotel";
import { Coffee, Pizza, Sandwich, User, Plus, Minus } from "lucide-react";
import { toPersianDigits } from "../../utils/persianDigits";
import type { HotelRoom, InBasketRoom } from "../../types/hotelDetail";

interface HotelRoomSelectionProps {
    onIncrementRoom: (room: HotelRoom) => void;
    onDecrementRoom: (room: HotelRoom) => void;
    selectedRooms: InBasketRoom[];
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

    const [rooms, setRooms] = useState<HotelRoom[] | null>(null);
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

    const getQuantity = (roomId: number) => {
        const found = selectedRooms.find(
            (r) => r.room.id === roomId
        );
        return found ? found.quantity : 0;
    };

    if (!startDate || !endDate || !hotelId) {
        return <p className="text-center mt-6 text-red-500">پارامترهای جستجو معتبر نیستند</p>;
    }
    if (loading) return <p className="text-center mt-6">در حال بارگذاری اتاق‌ها...</p>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="space-y-4 bg-slate-100 p-3 rounded-lg">
            {!rooms?.length ? (
                <p>اتاقی یافت نشد</p>
            ) : (
                rooms.map((room) => {
                    const quantity = getQuantity(room.id);
                    return (
                        <div
                            key={`${room.id}`}
                            className="bg-white border rounded-lg shadow p-4 flex flex-col md:flex-row md:gap-4"
                        >
                            {/* Image: on top for mobile, left for desktop */}
                            <div className="w-full md:w-36 h-36 md:h-28 flex-shrink-0 mb-2 md:mb-0">
                                {room.gallery.length > 0 ? (
                                    <img
                                        src={room.gallery[0].pictureUrl}
                                        alt={room.gallery[0].title}
                                        className="w-full h-full object-cover rounded"
                                    />
                                ) : (
                                    <div className="bg-gray-200 w-full h-full rounded" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between text-right">
                                <h2 className="text-lg font-bold mb-2">{toPersianDigits(room.name)}</h2>

                                <div className="flex flex-wrap flex-col gap-2 text-gray-600 text-sm">
                                    <div className="flex items-center gap-1">
                                        <User className="text-gray-500" size={16} />
                                        {toPersianDigits(room.adultCapacity)} بزرگسال
                                        {room.infantCapacity > 0 && (
                                            <>
                                                <span>،</span>
                                                {toPersianDigits(room.infantCapacity)} خردسال
                                            </>
                                        )}
                                    </div>
                                    {room.prices[0].nights[0].breakFast && (
                                        <div className="flex items-center gap-1">
                                            <Coffee size={16} /> صبحانه
                                        </div>
                                    )}
                                    {room.prices[0].nights[0].lunch && (
                                        <div className="flex items-center gap-1">
                                            <Sandwich size={16} /> ناهار
                                        </div>
                                    )}
                                    {room.prices[0].nights[0].dinner && (
                                        <div className="flex items-center gap-1">
                                            <Pizza size={16} /> شام
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price & Buttons */}
                            <div className="flex flex-col md:items-end justify-between text-right mt-2 md:mt-0">
                                <div className="flex flex-row-reverse gap-2 mb-2">
                                    <p className="text-sm line-through">
                                        {room.prices[0].nights
                                            .reduce((sum, night) => sum + night.boardPrice, 0)
                                            .toLocaleString("fa-IR")}{" "}
                                        ریال
                                    </p>
                                </div>
                                <div className="flex flex-row-reverse items-center gap-1">
                                    <p className="text-xs text-gray-500 mt-1">ریال</p>
                                    <p className="text-xl font-bold text-black">
                                        {room.prices[0].nights
                                            .reduce((sum, night) => sum + night.ihoPrice, 0)
                                            .toLocaleString("fa-IR")}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{toPersianDigits(room.prices[0].nights.length.toString())} شب</p>
                                </div>

                                {quantity === 0 ? (
                                    <button
                                        onClick={() => {
                                            if (room.availability[0].freeCapacity > 0) {
                                                onIncrementRoom(room);
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        disabled={room.availability[0].freeCapacity === 0}
                                    >
                                        انتخاب اتاق
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => onDecrementRoom(room)}
                                            className="p-2 border rounded hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span>{toPersianDigits(quantity)}</span>
                                        <button
                                            onClick={() => {
                                                if (quantity < room.availability[0].freeCapacity) {
                                                    onIncrementRoom(room);
                                                }
                                            }}
                                            className="p-2 border rounded hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                            disabled={quantity >= room.availability[0].freeCapacity}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    );
                })
            )}
        </div>

    );
}
