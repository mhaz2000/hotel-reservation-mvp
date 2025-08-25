import defaultRoom from "../../assets/defaul-room.jpg";
import * as shamsi from "shamsi-date-converter";
import type { ReservationHistory } from "../../types/reservationHistory";
import { Star } from "lucide-react";
import { toPersianDigits } from "../../utils/persianDigits";
import { CountdownTimer } from "../ui/CountdownTimer";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import { Dialog } from "../ui/Dialog";
import { useState } from "react";
import { downloadVoucher } from "../../api/hotel";
import { requestPayment } from "../../api/payment";

interface ReservesDetailProps {
    reservations: ReservationHistory[];
    onPaid?: () => void;
}

function convertShamsiToGregorian(shamsiDate: any) {
    const [jy, jm, jd] = shamsiDate.split("/").map(Number);
    const [gy, gm, gd] = shamsi.jalaliToGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
}

export default function ReservesDetail({ reservations }: ReservesDetailProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reservationToPay, setReservationToPay] = useState<ReservationHistory | null>(null);
    const [paymentMessage, setPaymentMessage] = useState<{ message: string, isSuccess: boolean } | null>(null)

    const handleConfirmPayment = async () => {
        if (!reservationToPay) return;

        try {
            // Call the API
            var url = await requestPayment(reservationToPay.reserveId.toString());

            window.location.href = url;
        } catch (error: any) {
            // Handle error and set message
            const message =
                error?.response?.data || error?.message || "خطای نامشخص در پرداخت";
            setPaymentMessage({ isSuccess: false, message });
        }
    };


    if (reservations.length === 0)
        return <p className="text-center text-gray-600">هیچ سابقه رزروی وجود ندارد.</p>;

    return (
        <div className="container mx-auto px-4 py-6 space-y-10">
            <h1 className="text-2xl font-bold mb-6 text-right">سابقه رزروها</h1>
            {reservations.map((reservation, idx) => {
                const startDate = convertShamsiToGregorian(reservation.startDate);
                const endDate = convertShamsiToGregorian(reservation.endDate);
                const nights = Math.max(Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)), 0);

                return (
                    <div key={idx} className="border rounded p-4 lg:p-6 shadow space-y-4 flex flex-col lg:flex-col">
                        {/* Hotel info */}

                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="w-full lg:flex-1 space-y-2 text-right">
                                <h2 className="text-xl font-bold">{reservation.hotelName}</h2>
                                <div className="flex items-center gap-1 justify-start lg:justify-start">
                                    {Array.from({ length: Number(reservation.hotelGrade) }).map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-600">{reservation.hotelAddress}</p>

                                {/* Reservation dates */}
                                <div className="flex flex-col lg:flex-row gap-2 text-gray-700 mt-2">
                                    <div className="flex gap-1 items-center">
                                        <p className="text-green-600">تاریخ ورود:</p>
                                        <p className="font-bold">{toPersianDigits(reservation.startDate)}</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <p className="text-red-600">تاریخ خروج:</p>
                                        <p className="font-bold">{toPersianDigits(reservation.endDate)}</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <p>مدت اقامت:</p>
                                        <p className="text-blue-600">{toPersianDigits(nights)} شب</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-36 h-48 lg:h-36 rounded overflow-hidden flex-shrink-0">
                                {reservation.hotelImage ? (
                                    <img
                                        src={reservation.hotelImage}
                                        alt={reservation.hotelName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-gray-200 w-full h-full" />
                                )}
                            </div>
                        </div>

                        {/* Rooms */}
                        <div className="border rounded p-4 shadow">
                            <h3 className="font-semibold mb-4 text-right">اتاق‌های رزرو شده</h3>
                            {reservation.rooms.length === 0 ? (
                                <p className="text-right">هیچ اتاقی رزرو نشده است.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {reservation.rooms.map((room, i) => (
                                        <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                                            <img
                                                src={room.image ?? defaultRoom}
                                                alt={room.name}
                                                className="w-full sm:w-16 h-24 sm:h-12 object-cover rounded flex-shrink-0"
                                            />
                                            <div className="flex-1 text-right">
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
                            )}

                            {/* Total amount */}
                            {reservation.rooms.length > 0 && (
                                <p className="font-bold text-lg text-right mt-4">
                                    مجموع:{" "}
                                    {toPersianDigits(
                                        reservation.rooms.reduce((sum, room) => sum + room.price * room.quantity, 0).toLocaleString("fa-IR")
                                    )}{" "}
                                    ریال
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between gap-6">
                            {/* Customer info */}
                            <div className="text-right mt-2 flex-1">
                                <h3 className="font-semibold mb-2">اطلاعات رزرو کننده</h3>
                                <p>نام: {reservation.firstName}</p>
                                <p>نام خانوادگی: {reservation.lastName}</p>
                                <p>شماره موبایل: {toPersianDigits(reservation.mobile)}</p>
                                {reservation.phone && <p>شماره تلفن: {toPersianDigits(reservation.phone)}</p>}
                                <p>ایمیل: {reservation.email}</p>
                                <p className="text-gray-500 text-sm mt-1">
                                    تاریخ ثبت: {toPersianDigits(reservation.reserveDate)}
                                </p>
                            </div>

                            {/* Reservation status */}
                            <div className="text-right flex flex-col items-end gap-2">
                                <div className="flex items-center justify-end mt-2">
                                    <ReservationStatusBadge status={reservation.status} statusText={reservation.statusText} />
                                </div>

                                {reservation.status === "WaitingForPayment" && (
                                    <>
                                        {/* Countdown */}
                                        <CountdownTimer seconds={reservation.paymentExpiredIn} />

                                        {/* Pay button */}
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                                            onClick={() => {
                                                setIsDialogOpen(true)
                                                setReservationToPay(reservation)
                                            }}
                                        >
                                            پرداخت
                                        </button>
                                    </>
                                )}

                                {reservation.status === "Reserved" && (
                                    <>
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                                            onClick={async () => {
                                                try {
                                                    const voucherBlob = await downloadVoucher(reservation.reserveId);
                                                    const url = window.URL.createObjectURL(new Blob([voucherBlob]));
                                                    const link = document.createElement("a");
                                                    link.href = url;
                                                    link.setAttribute("download", "voucher.pdf");
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    link.parentNode?.removeChild(link);
                                                } catch (error) {
                                                    console.error("Error downloading voucher:", error);
                                                }
                                            }}
                                        >
                                            دانلود واچر
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                );
            })}

            <Dialog
                title="تایید پرداخت"
                content="آیا مطمئن هستید که می‌خواهید این رزرو را پرداخت کنید؟"
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmPayment}
                confirmText="بله، پرداخت"
                cancelText="لغو"
                destructive={false}
                additionalMessage={paymentMessage ?? undefined}
            />

        </div>
    );
}
