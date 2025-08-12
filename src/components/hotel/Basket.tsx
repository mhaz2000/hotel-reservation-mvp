import { useNavigate, useSearchParams } from "react-router-dom";
import { toPersianDigits } from "../../utils/persianDigits";

interface BasketProps {
    selectedRooms: any[];
    onRemoveRoom: (index: number) => void;
}

export default function Basket({ selectedRooms, onRemoveRoom }: BasketProps) {
    const [searchParams] = useSearchParams();
    const cityName = searchParams.get("cityName");
    const hotelName = searchParams.get("hotelName");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const navigate = useNavigate();


    const total = selectedRooms.reduce(
        (sum, r) => sum + r.info.roomPrice.price.ihoPrice * r.quantity,
        0
    );

    const onConfirm = () => {
        if (selectedRooms.length === 0) {
            alert("ابتدا باید اتاقی را انتخاب کنید");
            return;
        }

        try {
            localStorage.setItem("bookingData", JSON.stringify({
                rooms: selectedRooms.map(s => ({
                    quantity: s.quantity,
                    image: s.container.mainPicture?.jpg,
                    name: s.container.name,
                    price: s.container.roomInfos[0].roomPrice.price.ihoPrice,
                })),
                startDate,
                endDate,
                cityName: cityName,
                hotelName: hotelName
            }));
            navigate('/hotel/reservation')
        } catch (error) {
            console.error("خطا در ذخیره اطلاعات رزرو:", error);
            alert("خطایی در ذخیره رزرو پیش آمد");
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-bold mb-4">سبد رزرو</h2>
            {selectedRooms.length === 0 ? (
                <p className="text-gray-500">هیچ اتاقی انتخاب نشده است</p>
            ) : (
                <>
                    <ul className="space-y-3">
                        {selectedRooms.map((room, i) => (
                            <li key={i} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        {toPersianDigits(room.container.name)} ×{" "}
                                        {toPersianDigits(room.quantity)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {(room.info.roomPrice.price.ihoPrice * room.quantity).toLocaleString("fa-IR")} تومان
                                    </p>
                                </div>
                                <button
                                    className="text-red-500 text-sm"
                                    onClick={() => onRemoveRoom(i)}
                                >
                                    حذف
                                </button>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4" />
                    <p className="font-bold text-lg">
                        مجموع: {total.toLocaleString("fa-IR")} تومان
                    </p>
                    <button
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                        onClick={onConfirm}
                    >
                        نهایی کردن رزرو
                    </button>
                </>
            )}
        </div>
    );
}
