import { useCountdown } from "../../hooks/useCountdown";
import { toPersianDigits } from "../../utils/persianDigits";

interface CountdownTimerProps {
  seconds: number;
}

export const CountdownTimer = ({ seconds }: CountdownTimerProps) => {
  const remaining = useCountdown(seconds);

  if (remaining <= 0) {
    return <p className="text-red-600 font-bold">مهلت پرداخت به پایان رسید</p>;
  }

  // convert seconds → mm:ss
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <p className="text-yellow-600 font-medium">
      زمان باقی‌مانده: {toPersianDigits(`${minutes}:${secs.toString().padStart(2, "0")}`)}
    </p>
  );
};
