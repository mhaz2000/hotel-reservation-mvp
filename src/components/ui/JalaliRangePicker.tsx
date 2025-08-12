import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


interface JalaliRangePickerProps {
  onPick?: (dates: DateObject[] | null) => void; // or change type if needed
}

export default function JalaliRangePicker({ onPick }: JalaliRangePickerProps) {
  const [value, setValue] = useState<DateObject[] | null>(null);

  // Create "today" in Jalali calendar
  const today = new DateObject({ calendar: persian });

  const handleChange = (dates: DateObject[] | null) => {
    setValue(dates);
    if (onPick)
      onPick(dates || null)
  };

  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={value || []}
      onChange={handleChange}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      className="border rounded-lg p-2 w-full"
      placeholder="تاریخ ورود - تاریخ خروج"
      inputClass="text-gray-700 placeholder-gray-400 outline-none"
      range
      sort
      minDate={today} // disable past dates
    />
  );
}
