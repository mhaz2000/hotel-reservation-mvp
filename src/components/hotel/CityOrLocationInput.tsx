import { useState, useEffect, useRef } from "react";
import type { HotelSelectLocaion, LocationOrHotel } from "../../types/hotel";
import { getSuggestion } from "../../api/hotel";
import { Building2, MapPin } from "lucide-react";


interface CitySearchInputProps {
    onSelect?: (data: HotelSelectLocaion) => void; // or change type if needed
}

export default function CitySearchInput({ onSelect }: CitySearchInputProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LocationOrHotel[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setLoading(true);
        timeoutRef.current = window.setTimeout(async () => {
            try {
                const data = await getSuggestion(query);
                setSuggestions(data);

                // open dropdown only if user has typed something
                // setShowDropdown(query.trim().length > 0);
            } catch (error) {
                console.error("Failed to get suggestions:", error);
                setSuggestions([]);
                setShowDropdown(false);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [query]);



    return (
        <div className="w-full">
            <input
                type="text"
                placeholder="شهر یا هتل مورد نظر"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                    if (suggestions.length) setShowDropdown(true);
                }}
                onBlur={() => {
                    setTimeout(() => setShowDropdown(false), 200);
                }}
                className="w-full outline-none text-gray-700 placeholder-gray-400"
            />

            {showDropdown && (
                <ul className="absolute z-10 top-full right-0 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {loading
                        ? // Show 5 skeleton items as placeholder
                        Array.from({ length: 5 }).map((_, i) => (
                            <li
                                key={i}
                                className="animate-pulse px-3 py-3 flex justify-between items-center cursor-default"
                            >
                                <div className="bg-gray-300 rounded w-3/4 h-5"></div>
                                <div className="bg-gray-300 rounded w-16 h-5"></div>
                            </li>
                        ))
                        : suggestions.map((item) => (
                            <li
                                key={item.id}
                                className="cursor-pointer px-3 py-3 hover:bg-gray-100 flex justify-between items-center"
                                onMouseDown={() => {
                                    setQuery(item.name);
                                    setShowDropdown(false);

                                    if (onSelect) onSelect({ cityId: item.id, country: item.country }); // pass link to parent
                                }}
                            >

                                {/* Right side: name and city/state */}
                                <div className="text-right flex flex-row flex-grow items-center gap-1 mr-4">
                                    <div>
                                        {item.category === "property" ?
                                            <Building2 className="w-5 h-5 text-gray-500" />
                                            :
                                            <MapPin className="w-5 h-5 text-gray-500" />
                                        }
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{item.name}</span>
                                        <span className="text-xs text-gray-400">
                                            {item.state}، {item.country}
                                        </span>
                                    </div>
                                </div>

                                {/* Left side: count or stars */}
                                <div className="flex items-center gap-1 min-w-[100px] justify-end text-sm font-medium">
                                    {item.count > 0 ? (
                                        <span>{item.count} واحد اقامتی</span>
                                    ) : (
                                        // Show stars based on grade (0-5 scale)
                                        [...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-yellow-400 ${i < Math.round(item.grade) ? "" : "text-gray-300"
                                                    }`}
                                            >
                                                &#9733;
                                            </span>
                                        ))
                                    )}
                                </div>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
