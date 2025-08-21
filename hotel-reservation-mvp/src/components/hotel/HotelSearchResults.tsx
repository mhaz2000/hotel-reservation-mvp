import { Star, MapPin } from "lucide-react";
import { toPersianDigits } from "../../utils/persianDigits";
import { useNavigate } from "react-router-dom";
import type { Hotel } from "../../types/hotel";
import defaultImage from '../../assets/defaul-hotel.jpg'
interface SearchResultsProps {
    hotels: Hotel[];
    startDate: string;
    endDate: string;
}

export default function HotelSearchResults({ hotels, startDate, endDate }: SearchResultsProps) {

    const navigate = useNavigate();


    const handleSelectHotel = (id: number) => {
        navigate(`/hotel?startDate=${startDate}&endDate=${endDate}&hotelId=${id}`)
    }

    if (!hotels.length) {
        return <p className="mt-20 lg:mt-6 text-center text-gray-500">نتیجه‌ای یافت نشد</p>;
    }

    return (
        <div className="mt-20 lg:mt-8 space-y-6">
            {hotels.map((hotel) => {
                return (
                    <div
                        key={hotel.id}
                        className="flex flex-col lg:flex-row border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
                    >
                        {/* Image */}
                        <div className="w-full lg:w-64 h-48 lg:h-auto flex-shrink-0">
                            <img
                                src={`https://cdn.iranhotelonline.com/Content/Images/Gallery/${hotel.id}.webp`}
                                alt={hotel.fullName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Cast e.target to HTMLImageElement
                                    (e.target as HTMLImageElement).src = defaultImage; // your default image path
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-right">{hotel.fullName}</h3>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm justify-start">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span>{toPersianDigits(hotel.gradeName.toString() ?? "0")} ستاره</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm justify-start">
                                    <MapPin className="w-4 h-4" />
                                    <span>{toPersianDigits(hotel.address)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 justify-start">
                                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                                    {toPersianDigits(hotel.hotelRank)}
                                </span>
                                <span className="text-sm text-gray-500">{hotel.rankName}</span>
                            </div>
                        </div>

                        {/* Price & Button */}
                        <div className="flex flex-col justify-end p-4 w-full lg:w-64 border-t lg:border-t-0 lg:border-l bg-gray-50">
                            <div className="flex flex-row-reverse items-center gap-2">
                                <p className="text-sm text-gray-400 line-through">
                                    {hotel.boardPrice.toLocaleString("fa-IR")}
                                </p>
                            </div>

                            <div className="flex flex-row justify-end items-center gap-1 mt-1">
                                <p className="text-lg font-bold text-gray-900">
                                    {hotel.ihoPrice.toLocaleString("fa-IR")}
                                </p>
                                <p className="text-sm text-gray-500">ریال</p>
                            </div>

                            <button
                                onClick={() =>
                                    handleSelectHotel(hotel.id)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded mt-2 block"
                            >
                                انتخاب اتاق و رزرو
                            </button>
                        </div>
                    </div>

                );
            })}
        </div>
    );
}
