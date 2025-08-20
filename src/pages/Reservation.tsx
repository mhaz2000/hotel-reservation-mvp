import { useEffect, useState } from "react";
import { getHotelSummary } from "../api/hotel";
import { toPersianDigits } from "../utils/persianDigits";
import type { HotelSummary } from "../types/hotelSummary";
import defaultRoom from "../assets/defaul-room.jpg";
import { Star } from "lucide-react";
import * as shamsi from "shamsi-date-converter";
import { useNavigate } from "react-router-dom";
import ReserveForm from "../components/hotel/ReserveForm";
import type { CustomerBookingInfo } from "../types/CustomerBookingData";

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

interface BookingData {
  rooms: RoomBooking[];
  hotelId: number;
  startDate: string;
  endDate: string;
}



export default function ReservationPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [hotelSummary, setHotelSummary] = useState<HotelSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const stored = localStorage.getItem("bookingData");
      if (!stored) {
        alert("هیچ اطلاعات رزروی یافت نشد.");
        setLoading(false);
        return;
      }
      const parsed: BookingData = JSON.parse(stored);
      setBookingData(parsed);

      if (parsed.startDate && parsed.endDate && parsed.hotelId) {
        try {
          const data = await getHotelSummary(parsed.startDate, parsed.endDate, parsed.hotelId);
          setHotelSummary(data);
        } catch (e) {
          console.error("خطا در دریافت اطلاعات هتل:", e);
          alert("خطا در دریافت اطلاعات هتل");
        }
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const onSubmit = (data: CustomerBookingInfo) => {
    if (!bookingData) {
      alert("اطلاعات رزرو موجود نیست.");
      return;
    }

    // Compose the new reservation record
    const newReservation = {
      bookingData,
      customerInfo: data,
      timestamp: new Date().toISOString(), // optional, for tracking
    };

    // Get existing reservations from localStorage or initialize empty array
    const existingReservationsRaw = localStorage.getItem("reserved");
    let existingReservations = [];
    if (existingReservationsRaw) {
      try {
        existingReservations = JSON.parse(existingReservationsRaw);
        if (!Array.isArray(existingReservations)) {
          existingReservations = [];
        }
      } catch {
        existingReservations = [];
      }
    }

    // Add new reservation
    existingReservations.push(newReservation);

    // Save back to localStorage
    localStorage.setItem("reserved", JSON.stringify(existingReservations));

    navigate('/')
  };


  if (loading) return <p>در حال بارگذاری...</p>;

  if (!bookingData)
    return <p className="text-center text-red-500">اطلاعات رزرو موجود نیست.</p>;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
      {/* Left side: Hotel info + rooms */}
      <div className="w-full lg:w-1/3 space-y-6 top-20 self-start">
        {/* Hotel info */}
        {hotelSummary ? (
          <>
            <div className="flex items-center justify-between mb-4 gap-1">
              {/* Right side: title, stars, address */}
              <div className="text-right flex-1 pr-4 space-y-1">
                <h2 className="text-xl font-bold">{hotelSummary.fullName}</h2>
                <div className="flex items-center justify-start gap-1">
                  {/* Render stars based on GradeId */}
                  <div className="flex items-center justify-end gap-1">
                    {Array.from({ length: Number(hotelSummary.gradeName) }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{hotelSummary.address}</p>
              </div>

              {/* Left side: hotel image */}
              <div className="flex-shrink-0 w-28 h-36 rounded overflow-hidden">
                {hotelSummary.gallery[0] ? (
                  <img
                    src={hotelSummary.gallery[0].pictureUrl}
                    alt={hotelSummary.gallery[0].title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full" />
                )}
              </div>
            </div>

            {/* Divider */}
            <hr className="mb-4" />

            {/* Dates and nights */}
            <div className="text-right space-y-1 text-gray-700 w-full">
              {(() => {
                const startDateStr = bookingData.startDate;
                const endDateStr = bookingData.endDate;

                const startDate = convertShamsiToGregorian(startDateStr);
                const endDate = convertShamsiToGregorian(endDateStr);

                const diffTime = endDate.getTime() - startDate.getTime();
                const nights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

                return (
                  <div className="flex justify-between items-center gap-1 w-full">
                    <div className="flex flex-col justify-center items-center w-full">
                      <p className="text-green-600">تاریخ ورود</p>
                      <p className="font-bold">{toPersianDigits(startDateStr)}</p>
                    </div>

                    <div className="flex flex-col items-center w-full">
                      <p>مدت اقامت</p>
                      <p className="text-blue-600">{toPersianDigits(nights)} شب</p>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full">
                      <p className="text-red-600">تاریخ خروج</p>
                      <p className="font-bold">{toPersianDigits(endDateStr)}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        ) : (
          <p>اطلاعات هتل موجود نیست.</p>
        )}

        {/* Rooms info */}
        <div className="border rounded p-4 shadow">
          <h3 className="font-semibold mb-4">اتاق‌های انتخاب شده</h3>
          {bookingData.rooms.length === 0 ? (
            <p>هیچ اتاقی انتخاب نشده است.</p>
          ) : (
            <>
              <ul className="space-y-3">
                {bookingData.rooms.map((room, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <img
                      src={room.image ?? defaultRoom}
                      alt={room.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">
                        {toPersianDigits(room.name)} × {toPersianDigits(room.quantity)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(room.price * room.quantity).toLocaleString("fa-IR")} ریال
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
                  bookingData.rooms.reduce((sum, room) => sum + room.price * room.quantity, 0).toLocaleString("fa-IR")
                )}{" "}
                ریال
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-2/3 ">
          <ReserveForm onSubmit={onSubmit} price={bookingData.rooms.reduce((sum, room) => sum + room.price * room.quantity, 0)} />
      </div>
    </div>
  );
}
