import { useState, useEffect } from "react";
import { getStatesAndCities } from "../../api/hotel"; // should accept a `search` param now
import { MapPin } from "lucide-react";
import type { FlatLocation } from "../../types/states";
import type { HotelSelectLocaion } from "../../types/hotel";

interface CitySearchInputProps {
  onSelect?: (location: HotelSelectLocaion) => void;
}

export default function CitySearchInput({ onSelect }: CitySearchInputProps) {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<FlatLocation[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Debounce state
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // 🔹 Update debounced query after 400ms pause
  useEffect(() => {
      setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // 🔹 Call API when debounced query changes OR input is focused
  useEffect(() => {
    // Always fetch if input is focused
    if (!debouncedQuery && !showDropdown) return;

    let isCancelled = false;
    const fetchLocations = async () => {
      try {
        const data = await getStatesAndCities(debouncedQuery); // search can be empty
        if (!isCancelled) {
          setLocations(data);
        }
      } catch (err) {
        if (!isCancelled) console.error("Failed to get locations:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchLocations();

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, showDropdown]);



  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="شهر مورد نظر"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setShowDropdown(true); // show dropdown
          if (!locations.length) setDebouncedQuery(""); // trigger fetch with empty search
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        className="w-full outline-none text-gray-700 placeholder-gray-400"
      />

      {showDropdown && (
        <ul className="absolute z-10 top-full right-0 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="animate-pulse px-3 py-3 flex justify-between items-center cursor-default"
              >
                <div className="bg-gray-300 rounded w-3/4 h-5"></div>
                <div className="bg-gray-300 rounded w-16 h-5"></div>
              </li>
            ))
            : locations.map((item) => (
              <li
                key={`${item.stateId}-${item.cityId}-${item.city}`}
                className="cursor-pointer px-3 py-3 hover:bg-gray-100 flex justify-between items-center"
                onMouseDown={() => {
                  setQuery(item.city);
                  setShowDropdown(false);
                  onSelect?.({ cityId: item.cityId, stateId: item.stateId });
                }}
              >
                <div className="text-right flex flex-row flex-grow items-center gap-1 mr-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.city}</span>
                    <span className="text-xs text-gray-400">{item.state}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
