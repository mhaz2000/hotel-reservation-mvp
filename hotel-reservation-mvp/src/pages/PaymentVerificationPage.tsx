import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react"; // icons
import { PaymentStatus } from "../api/payment";

export default function PaymentVerificationPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await PaymentStatus();
        setStatus(result.isSuccess); // careful: it's `staus` in API not `status`
      } catch (error) {
        setStatus(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-gray-600 text-lg">در حال بررسی وضعیت پرداخت...</p>
          </div>
        ) : status ? (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="w-14 h-14 text-green-600" />
            <h2 className="text-2xl font-bold text-green-700">پرداخت موفق</h2>
            <p className="text-gray-600">تراکنش شما با موفقیت انجام شد.</p>
            <p>با مراجعه به صفحه‌ی سوابق رزرو می‌توانید واچر خود را دانلود کنید.</p>
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
