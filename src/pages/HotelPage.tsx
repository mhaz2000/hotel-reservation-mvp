import { useState } from "react";
import HotelRoomSelection from "../components/hotel/HotelRoomSelection";
import Basket from "../components/hotel/Basket";
import HotelSummaryHeader from "../components/hotel/HotelSummary";

export default function HotelPage() {
    const [selectedRooms, setSelectedRooms] = useState<any[]>([]);

    const handleIncrementRoom = (room: any) => {
        setSelectedRooms((prev) => {
            const index = prev.findIndex(
                (r) =>
                    r.container.id === room.container.id &&
                    r.info.roomCollapseViewId === room.info.roomCollapseViewId
            );
            if (index > -1) {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    quantity: updated[index].quantity + 1,
                };
                return updated;
            }
            return [...prev, { ...room, quantity: 1 }];
        });
    };

    const handleDecrementRoom = (room: any) => {
        setSelectedRooms((prev) => {
            const index = prev.findIndex(
                (r) =>
                    r.container.id === room.container.id &&
                    r.info.roomCollapseViewId === room.info.roomCollapseViewId
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
                <HotelSummaryHeader />
            </div>
            <div className="col-span-2">
                <HotelRoomSelection
                    onIncrementRoom={handleIncrementRoom}
                    onDecrementRoom={handleDecrementRoom}
                    selectedRooms={selectedRooms}
                />
            </div>
            <div>
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
