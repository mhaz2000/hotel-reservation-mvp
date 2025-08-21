import { Clock, CreditCard, XCircle, CheckCircle2, Hourglass } from "lucide-react";
import type { JSX } from "react";

interface StatusBadgeProps {
  status: string;
  statusText: string;
}

const statusStyles: Record<
  string,
  { icon: JSX.Element; classes: string }
> = {
  WaitingForHotelApproval: {
    icon: <Hourglass className="w-4 h-4 text-yellow-600" />,
    classes: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  WaitingForPayment: {
    icon: <CreditCard className="w-4 h-4 text-blue-600" />,
    classes: "bg-blue-50 text-blue-700 border border-blue-200 animate-pulse",
  },
  WaitingList: {
    icon: <Clock className="w-4 h-4 text-orange-600" />,
    classes: "bg-orange-50 text-orange-700 border border-orange-200",
  },
  Reject: {
    icon: <XCircle className="w-4 h-4 text-red-600" />,
    classes: "bg-red-50 text-red-700 border border-red-200",
  },
  Reserved: {
    icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    classes: "bg-green-50 text-green-700 border border-green-200",
  },
};

export const ReservationStatusBadge = ({ status, statusText }: StatusBadgeProps) => {
  const style = statusStyles[status] ?? {
    icon: <Clock className="w-4 h-4 text-gray-600" />,
    classes: "bg-gray-50 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium shadow-sm ${style.classes}`}
    >
      {style.icon}
      {statusText}
    </span>
  );
};
