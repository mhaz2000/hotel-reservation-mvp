import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PrePaymentInfo } from "../types/reservation";
import { HotelPrePayment, requestPayment } from "../api/payment";
import logo from '../assets/logo-donyasier.png'
import { toPersianDigits } from "../utils/persianDigits";

const PrePaymentPage = () => {
  const [searchParams] = useSearchParams();
  const reserveId = searchParams.get("reserveId");

  const [info, setInfo] = useState<PrePaymentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  // 🔹 Check if current route contains "donyaseir"
  const showLogo = (import.meta.env.VITE_API_BASE_URL as string).includes("donyaseir");

  // 🔹 Load prepayment info
  useEffect(() => {
    const fetchData = async () => {
      if (!reserveId) {
        setError("شناسه رزرو یافت نشد");
        return;
      }
      try {
        setLoading(true);
        const data = await HotelPrePayment(reserveId);
        setInfo(data);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات پیش‌پرداخت");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reserveId]);

  // 🔹 Handle payment
  const handlePayment = async () => {
    if (!reserveId) return;
    try {
      setPaying(true);
      const paymentUrl = await requestPayment(reserveId);
      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);
      alert("خطا در ارتباط با درگاه پرداخت");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-[#2F53A3] py-10 px-4"
    >
      {/* 🔹 Logo on top of the card */}
      {showLogo && (
        <div className="mb-16">
          <img
            src={logo}
            alt="Donyaseir Logo"
            className="h-16 object-contain"
          />
        </div>
      )}

      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-l from-[#28478B] to-[#28478B] text-white text-center py-4">
          <h2 className="text-xl font-semibold">
            تأیید و پرداخت رزرو هتل
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading && (
            <p className="text-center text-gray-500">در حال بارگذاری اطلاعات...</p>
          )}
          {error && (
            <p className="text-center text-red-600 bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          {!loading && info && (
            <>
              <div className="space-y-3 text-gray-800 text-base leading-6">
                <p>
                  <span className="font-semibold">نام هتل:</span> <span className="font-bold">{info.hotelName}</span>
                </p>
                <p>
                  <span className="font-semibold">تاریخ ورود:</span> {toPersianDigits(info.startDate)}
                </p>
                <p>
                  <span className="font-semibold">تاریخ خروج:</span> {toPersianDigits(info.endDate)}
                </p>
                <p>
                  <span className="font-semibold">شناسه رزرو:</span> {toPersianDigits(info.reserveId)}
                </p>

                <div className="border-t pt-3 mt-3">
                  <p className="font-semibold text-lg text-center">
                    مبلغ قابل پرداخت:{" "}
                    <span className="text-[#28478B] font-bold">
                      {info.totalAmount.toLocaleString("fa-IR")} ریال
                    </span>
                  </p>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={paying}
                className="w-full mt-6 bg-[#28478B] hover:bg-[#5b81d5] transition-colors text-white py-3 rounded-xl text-base font-semibold disabled:opacity-70"
              >
                {paying ? "در حال انتقال به درگاه..." : "پرداخت آنلاین"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrePaymentPage;
