import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { PaymentStatus } from "../api/payment";

type PaymentResult = {
  isSuccess: boolean;
  rrn: string;
  amount: number;
};

export default function PaymentVerificationPage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<PaymentResult | null>(null);

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
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-gray-600 text-lg">در حال بررسی وضعیت پرداخت...</p>
          </div>
        ) : result?.isSuccess ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
            <h2 className="text-2xl font-bold text-green-700">پرداخت موفق</h2>
            <p className="text-gray-600">تراکنش شما با موفقیت انجام شد.</p>

            {/* نمایش جزئیات تراکنش */}
            <div className="bg-gray-50 rounded-xl p-4 mt-2 w-full text-right">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">شماره مرجع (RRN):</span> {result.rrn}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">مبلغ:</span>{" "}
                {result.amount.toLocaleString("fa-IR")} ریال
              </p>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              با مراجعه به صفحه‌ی سوابق رزرو می‌توانید واچر خود را دانلود کنید.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-14 h-14 text-red-600" />
            <h2 className="text-2xl font-bold text-red-700">پرداخت ناموفق</h2>
            <p className="text-gray-600">متاسفانه تراکنش شما انجام نشد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
