import { useEffect, useState } from "react";
import HotelRoomSelection from "../components/hotel/HotelRoomSelection";
import Basket from "../components/hotel/Basket";
import HotelSummaryHeader from "../components/hotel/HotelSummary";
import { useSearchParams } from "react-router-dom";
import type { HotelSummary } from "../types/hotelSummary";
import { getHotelSummary } from "../api/hotel";
import HotelSummaryInfo from "../components/hotel/HotelSummaryInfo";
import type { HotelRoom, InBasketRoom } from "../types/hotelDetail";

export default function HotelPage() {
    const [selectedRooms, setSelectedRooms] = useState<InBasketRoom[]>([]);

    const [searchParams] = useSearchParams();
    const hotelId = searchParams.get("hotelId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const [summary, setSummary] = useState<HotelSummary | null>(null);

    useEffect(() => {
        if (!startDate || !endDate || !hotelId) return;

        const fetchSummary = async () => {
            try {
                const data = await getHotelSummary(startDate, endDate, Number(hotelId));
                setSummary(data);
            } catch (err) {
                console.error(err);
            } finally {
            }
        };

        fetchSummary();
    }, [startDate, endDate, hotelId]);

    const handleIncrementRoom = (room: HotelRoom) => {
        setSelectedRooms((prev) => {
            const index = prev.findIndex(
                (r) =>
                    r.room.id === room.id
            );
            if (index > -1) {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    quantity: updated[index].quantity + 1,
                };
                return updated;
            }
            return [...prev, { room, quantity: 1 }];
        });
    };

    const handleDecrementRoom = (room: any) => {
        setSelectedRooms((prev) => {
            const index = prev.findIndex(
                (r) =>
                    r.room.id === room.id
            );
            if (index > -1) {
                const updated = [...prev];
                if (updated[index].quantity > 1) {
                    updated[index] = {
                        ...updated[index],
                        quantity: updated[index].quantity - 1,
                    };
                    return updated;
                } else {
                    return prev.filter((_, i) => i !== index);
                }
            }
            return prev;
        });
    };

    return (
        <div className="max-w-7xl mx-auto mt-8 p-4 grid grid-cols-3 gap-6">
            <div className="col-span-3">
                <HotelSummaryHeader summary={summary} />
            </div>
            <div className="col-span-3 lg:col-span-2 ">
                <HotelSummaryInfo summary={summary} />
                <HotelRoomSelection
                    onIncrementRoom={handleIncrementRoom}
                    onDecrementRoom={handleDecrementRoom}
                    selectedRooms={selectedRooms}
                />
            </div>
            <div className="col-span-3 lg:col-span-1">
                <Basket
                    selectedRooms={selectedRooms}
                    onRemoveRoom={(index) =>
                        setSelectedRooms((prev) =>
                            prev.filter((_, i) => i !== index)
                        )
                    }
                />
            </div>
        </div>
    );
}
