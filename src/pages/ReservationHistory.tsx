import { useEffect, useState } from "react";
import { getHotelSummary } from "../api/hotel";
import { toPersianDigits } from "../utils/persianDigits";
import type { HotelSummary } from "../types/hotelSummary";
import defaultRoom from "../assets/defaul-room.jpg";
import { Star } from "lucide-react";
import * as shamsi from "shamsi-date-converter";

function convertShamsiToGregorian(shamsiDate: any) {
    const [jy, jm, jd] = shamsiDate.split("/").map(Number);
    const [gy, gm, gd] = shamsi.jalaliToGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
}

interface RoomBooking {
    quantity: number;
    image?: string;
    name: string;
    price: number;
}

interface ReservationRecord {
    bookingData: {
        rooms: RoomBooking[];
        cityName: string | null;
        hotelName: string | null;
        startDate: string;
        endDate: string;
    };
    customerInfo: {
        firstName: string;
        lastName: string;
        mobile: string;
        phone?: string;
        email: string;
    };
    timestamp: string;
}

export default function ReservationHistory() {
    const [reservations, setReservations] = useState<ReservationRecord[]>([]);
    const [hotelSummaries, setHotelSummaries] = useState<Record<string, HotelSummary>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load reservations from localStorage
        const raw = localStorage.getItem("reserved");
        if (!raw) {
            setReservations([]);
            setLoading(false);
            return;
        }

        let parsed: ReservationRecord[] = [];
        try {
            parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) parsed = [];
        } catch {
            parsed = [];
        }
        setReservations(parsed);

        // Fetch hotel summaries for unique cityName+hotelName pairs
        const uniqueHotels = Array.from(
            new Set(parsed.map(r => `${r.bookingData.cityName}||${r.bookingData.hotelName}`))
        );

        Promise.all(
            uniqueHotels.map(async (key) => {
                const [cityName, hotelName] = key.split("||");
                if (cityName && hotelName) {
                    try {
                        const data = await getHotelSummary(cityName, hotelName);
                        return { key, data };
                    } catch {
                        return null;
                    }
                }
                return null;
            })
        ).then(results => {
            const summaries: Record<string, HotelSummary> = {};
            results.forEach(res => {
                if (res) summaries[res.key] = res.data;
            });
            setHotelSummaries(summaries);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>در حال بارگذاری...</p>;

    if (reservations.length === 0)
        return <p className="text-center text-gray-600">هیچ سابقه رزروی وجود ندارد.</p>;

    return (
        <div className="container mx-auto px-4 py-6 space-y-10">
            <h1 className="text-2xl font-bold mb-6 text-right">سابقه رزروها</h1>
            {reservations.map((reservation, idx) => {
                const key = `${reservation.bookingData.cityName}||${reservation.bookingData.hotelName}`;
                const hotelSummary = hotelSummaries[key];

                const startDate = convertShamsiToGregorian(reservation.bookingData.startDate);
                const endDate = convertShamsiToGregorian(reservation.bookingData.endDate);
                const nights = Math.max(Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)), 0);

                return (
                    <div key={idx} className="border rounded p-6 shadow space-y-4">
                        {/* Hotel info */}
                        {hotelSummary ? (
                            <div className="flex flex-row items-center justify-between mb-4 gap-1">
                                <div className="text-right flex-1 pr-4 space-y-1">
                                    <h2 className="text-xl font-bold">{hotelSummary.ModalHotelGallery.HotelName}</h2>
                                    <div className="flex items-center justify-start gap-1">
                                        {Array.from({ length: hotelSummary.HotelHeader.Star.GradeId }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">{hotelSummary.HotelHeader.Address.Address}</p>

                                    {/* Reservation dates */}
                                    <div className=" text-gray-700 flex flex-col justify-between max-w-md">
                                        <div className="flex gap-4">
                                            <div className="flex flex-row items-center gap-1">
                                                <p className="text-green-600">تاریخ ورود:</p>
                                                <p className="font-bold">{toPersianDigits(reservation.bookingData.startDate)}</p>
                                            </div>
                                            <div className="flex flex-row items-center gap-1">
                                                <p className="text-red-600">تاریخ خروج:</p>
                                                <p className="font-bold">{toPersianDigits(reservation.bookingData.endDate)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p className="pl-1">مدت اقامت:</p>
                                            <p className="text-blue-600">{toPersianDigits(nights)} شب</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-36 h-36 rounded overflow-hidden">
                                    {hotelSummary.ModalHotelGallery.Pictures[0] ? (
                                        <img
                                            src={hotelSummary.ModalHotelGallery.Pictures[0].Jpg}
                                            alt={hotelSummary.ModalHotelGallery.Pictures[0].Alt}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="bg-gray-200 w-full h-full" />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-red-500 text-right">اطلاعات هتل موجود نیست.</p>
                        )}

                        {/* Rooms */}
                        <div className="border rounded p-4 shadow">
                            <h3 className="font-semibold mb-4 text-right">اتاق‌های رزرو شده</h3>
                            {reservation.bookingData.rooms.length === 0 ? (
                                <p className="text-right">هیچ اتاقی رزرو نشده است.</p>
                            ) : (
                                <>
                                    <ul className="space-y-3">
                                        {reservation.bookingData.rooms.map((room, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <img
                                                    src={room.image ?? defaultRoom}
                                                    alt={room.name}
                                                    className="w-16 h-12 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-medium text-right">
                                                        {toPersianDigits(room.name)} × {toPersianDigits(room.quantity)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {(room.price * room.quantity).toLocaleString("fa-IR")} تومان
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Total amount */}
                                    <hr className="my-4" />
                                    <p className="font-bold text-lg text-right">
                                        مجموع:{" "}
                                        {toPersianDigits(
                                            reservation.bookingData.rooms.reduce(
                                                (sum, room) => sum + room.price * room.quantity,
                                                0
                                            ).toLocaleString("fa-IR")
                                        )}{" "}
                                        تومان
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Customer info */}
                        <div className="text-right">
                            <h3 className="font-semibold mb-2">اطلاعات رزرو کننده</h3>
                            <p>نام: {reservation.customerInfo.firstName}</p>
                            <p>نام خانوادگی: {reservation.customerInfo.lastName}</p>
                            <p>شماره موبایل: {reservation.customerInfo.mobile}</p>
                            {reservation.customerInfo.phone && <p>شماره تلفن: {reservation.customerInfo.phone}</p>}
                            <p>ایمیل: {reservation.customerInfo.email}</p>
                            <p className="text-gray-500 text-sm mt-1">
                                تاریخ ثبت: {new Date(reservation.timestamp).toLocaleString("fa-IR")}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
