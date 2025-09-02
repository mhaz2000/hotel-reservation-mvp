import { Search, Calendar, MapPin, Clock } from "lucide-react";
import CitySearchInput from "../components/hotel/CityOrLocationInput";
import JalaliRangePicker from "../components/ui/JalaliRangePicker";
import { useState, useEffect, useRef, useCallback } from "react";
import type { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import type { Hotel, HotelSelectLocaion } from "../types/hotel";
import { getHotels } from "../api/hotel";
import HotelSearchResults from "../components/hotel/HotelSearchResults";

export default function Home() {
  const [location, setLocation] = useState<HotelSelectLocaion | null>(null);
  const [dates, setDates] = useState<DateObject[] | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [datesError, setDatesError] = useState(false);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchHotels = useCallback(
    async (pageIndex: number, reset = false) => {
      if (!location || !dates) return;

      setLoading(true);
      try {
        const startDate = dates[0]
          .convert(persian, persian_en)
          .format("YYYY/MM/DD");
        const endDate = dates[1]
          .convert(persian, persian_en)
          .format("YYYY/MM/DD");

        const data = await getHotels(
          startDate,
          endDate,
          pageIndex,
          location.cityId,
          location.stateId
        );

        setHotels((prev) =>
          reset ? data.data : [...prev, ...data.data]
        );

        // If less than page size returned, means no more data
        if (data.data.length < 10) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    },
    [location, dates]
  );

  const handleSearch = async () => {
    let hasError = false;

    if (!location) {
      setLocationError(true);
      hasError = true;
    }

    if (!dates || dates?.length < 2) {
      setDatesError(true);
      hasError = true;
    }

    if (hasError) return;

    setPage(1);
    setHasMore(true);
    await fetchHotels(1, true);
  };

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hotels.length > 0) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  // Fetch on page change (for infinite scroll)
  useEffect(() => {
    if (page > 1) {
      fetchHotels(page);
    }
  }, [page, fetchHotels]);

  return (
    <div className="rtl relative">
      {/* <img
        src={headerImage}
        alt="Header"
        className="w-full h-[480px] object-cover"
      /> */}

      {/* Search Panel */}
      <div className="mt-16 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl bg-white rounded-3xl shadow-lg p-6 flex flex-wrap justify-between gap-3 lg:gap-0 lg:mt-4">
        {/* Destination */}
        <div className="flex flex-col w-full lg:w-1/2 xl:w-2/5">
          <div
            className={`relative flex items-center gap-3 border rounded-lg px-4 py-3 flex-grow ${locationError ? "border-red-500" : "border-gray-300"
              }`}
          >
            <MapPin className="text-gray-500 w-6 h-6" />
            <CitySearchInput
              onSelect={(value) => {
                setLocation(value);
                setLocationError(false);
              }}
            />
          </div>
          {locationError && (
            <p className="mt-1 text-sm text-red-500">
              لطفا مقصد خود را وارد نمایید
            </p>
          )}
        </div>

        {/* Check-in */}
        <div className="flex flex-col w-full lg:w-1/2 lg:px-2 xl:w-2/5 xl:px-2">
          <div
            className={`flex items-center gap-3 border rounded-lg px-4 py-3 flex-grow ${datesError ? "border-red-500" : "border-gray-300"
              }`}
          >
            <Calendar className="text-gray-500 w-6 h-6" />
            <div className="flex-grow">
              <JalaliRangePicker
                onPick={(dates) => {
                  setDates(dates);
                  setDatesError(false);
                }}
              />
            </div>
          </div>
          {datesError && (
            <p className="mt-1 text-sm text-red-500">
              لطفا تاریخ ورود و خروج را وارد نمایید
            </p>
          )}
        </div>

        {/* Search Button */}
        <button
          disabled={loading}
          onClick={handleSearch}
          className="justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl px-10 py-3 font-semibold flex items-center gap-3 whitespace-nowrap w-full mt-3 mx-auto lg:w-1/5 xl:mt-0"
        >
          {!loading ?
            <Search className="w-6 h-6" /> :
            <Clock className="w-6 h-6" />}
          جستجو
        </button>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto mt-16 p-4">
        <HotelSearchResults
          loading={loading}
          hotels={hotels}
          startDate={dates && dates?.length > 1 ? dates[0].convert(persian, persian_en).format("YYYY/MM/DD") : ""}
          endDate={dates && dates?.length > 1 ? dates[1].convert(persian, persian_en).format("YYYY/MM/DD") : ""}
        />
        {loading && page > 1 && <p className="text-center mt-4">در حال بارگذاری...</p>}
        {hasMore && <div ref={loaderRef} className="h-10"></div>}
      </div>
    </div>
  );
}
