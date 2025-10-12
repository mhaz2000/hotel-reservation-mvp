import { useState } from "react";
import SuccessfulReserves from "../components/hotel/SuccessfulReserves";
import FailedReserves from "../components/hotel/FailedReserves";
import PendingReserves from "../components/hotel/PendingReserves";

export default function ReservationHistory() {
  const [activeTab, setActiveTab] = useState<"success" | "failed" | "pending">("success");
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState<string | null>(null);

  const renderContent = () => {
    if (!submittedPhone) {
      return <p className="text-center text-gray-600 mt-4">شماره موبایل را وارد کنید</p>;
    }

    switch (activeTab) {
      case "success":
        return <SuccessfulReserves phone={submittedPhone} />;
      case "failed":
        return <FailedReserves phone={submittedPhone} />;
      case "pending":
        return <PendingReserves phone={submittedPhone} onPaid={() => setActiveTab('success')} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-6">
      {/* Phone number input */}
      <div className="mb-4 flex gap-2 justify-center flex-wrap md:justify-end">
        <input
          type="tel"
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded px-3 py-2 text-right w-64 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={() => setSubmittedPhone(phone)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          تایید
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("success")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "success"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-blue-500"
            }`}
        >
          رزرو های موفق
        </button>
        <button
          onClick={() => setActiveTab("failed")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "failed"
              ? "border-b-2 border-red-500 text-red-600"
              : "text-gray-600 hover:text-red-500"
            }`}
        >
          رزرو های ناموفق
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "pending"
              ? "border-b-2 border-yellow-500 text-yellow-600"
              : "text-gray-600 hover:text-yellow-500"
            }`}
        >
          رزرو های در انتظار
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
