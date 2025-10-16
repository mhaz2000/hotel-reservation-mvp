import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { PaymentStatus } from "../api/payment";
import logo from '../assets/logo-donyasier.png';

type PaymentResult = {
  isSuccess: boolean;
  rrn: string;
  amount: number;
};

export default function PaymentVerificationPage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PaymentResult | null>(null);

  // 🔹 Show logo if API base URL contains donyaseir
  const showLogo = (import.meta.env.VITE_API_BASE_URL as string).includes("donyaseir");

  useEffect(() => {
    const fetchStatus = async () => {
      if (!invoiceId) return;

      try {
        const data = await PaymentStatus(invoiceId);
        setResult(data);
      } catch (error) {
        setResult({ isSuccess: false, rrn: "", amount: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [invoiceId]);

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
            بررسی وضعیت پرداخت
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
              <p className="text-white text-lg">در حال بررسی وضعیت پرداخت...</p>
            </div>
          ) : result?.isSuccess ? (
            <div className="flex flex-col items-center gap-4 text-gray-800">
              <CheckCircle2 className="w-14 h-14 text-green-600" />
              <h2 className="text-2xl font-bold text-green-700">پرداخت موفق</h2>
              <p className="text-gray-700 text-sm text-center">
                تراکنش شما با موفقیت انجام شد.
              </p>

              {/* Transaction details */}
              <div className="bg-gray-50 rounded-xl p-4 mt-2 w-full text-right">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">شماره مرجع (RRN):</span> {result.rrn}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">مبلغ:</span>{" "}
                  {result.amount.toLocaleString("fa-IR")} ریال
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-3 text-center">
                با مراجعه به صفحه‌ی سوابق رزرو می‌توانید واچر خود را دانلود کنید.
              </p>

              {/* 🔹 Forward to Donyaseir button */}
              <button
                onClick={() => window.location.href = "https://donyaseir.ir/travel/hotel/"}
                className="w-full mt-4 bg-[#28478B] hover:bg-[#5b81d5] transition-colors text-white py-3 rounded-xl text-base font-semibold"
              >
                بازگشت 
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-800">
              <XCircle className="w-14 h-14 text-red-600" />
              <h2 className="text-2xl font-bold text-red-700">پرداخت ناموفق</h2>
              <p className="text-gray-700 text-sm text-center">
                متاسفانه تراکنش شما انجام نشد.
              </p>

              {/* 🔹 Forward to Donyaseir button even on failure */}
              <button
                onClick={() => window.location.href = "https://donyaseir.ir/travel/hotel/"}
                className="w-full mt-4 bg-[#28478B] hover:bg-[#5b81d5] transition-colors text-white py-3 rounded-xl text-base font-semibold"
              >
                بازگشت
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
