import type { Card } from "../../types/hotel";
import { Star, MapPin } from "lucide-react";
import { toPersianDigits } from "../../utils/persianDigits";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
    hotels: Card[];
    startDate: string;
    endDate: string;
}

export default function HotelSearchResults({ hotels, startDate, endDate }: SearchResultsProps) {

    const navigate = useNavigate();


    const handleSelectHotel = (id: number, hotelName: string, cityName: string) => {
        navigate(`/hotel?startDate=${startDate}&endDate=${endDate}&hotelId=${id}&hotelName=${hotelName.replace(' ', '-')}&cityName=${cityName}`)
    }

    if (!hotels.length) {
        return <p className="mt-6 text-center text-gray-500">نتیجه‌ای یافت نشد</p>;
    }

    return (
        <div className="mt-8 space-y-6">
            {hotels.map((hotel) => {
                const { CardData } = hotel;
                return (
                    <div
                        key={CardData.Id}
                        className="flex border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
                    >

                        {/* Right Image Section */}
                        <div className="w-64 h-48 flex-shrink-0">
                            <img
                                src={CardData.Pictures?.[0]?.Jpg}
                                alt={CardData.Pictures?.[0]?.Alt || CardData.FullName}
                                className="w-full h-full object-cover"
                            />
                        </div>


                        {/* Middle Info Section */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-right">{CardData.FullName}</h3>
                                <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span>{toPersianDigits(CardData.Star?.GradeId.toString() ?? "0")} ستاره</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{toPersianDigits(CardData.Address.Address)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                                    {toPersianDigits(CardData.Score.ScoreNumber.toFixed(1))}
                                </span>
                                <span className="text-sm text-gray-500">{CardData.Score.Text}</span>
                                <span className="text-sm text-gray-400">· {toPersianDigits(CardData.Score.Description)}</span>
                            </div>
                        </div>

                        {/* Left Price + Discount Section */}
                        <div className="flex flex-col justify-end p-4 w-64 border-l bg-gray-50">
                            {CardData.DiscountBalloon?.Discount > 0 && (
                                <div className="flex flex-row-reverse items-center gap-2">
                                    <div className="bg-green-100 text-green-600 text-sm font-bold px-2 py-1 rounded w-fit">
                                        {toPersianDigits(CardData.DiscountBalloon.Discount)}%
                                    </div>
                                    <p className="text-sm text-gray-400 line-through">
                                        {CardData.Price.BoardPrice.toLocaleString("fa-IR")}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-row justify-end items-center gap-1">
                                <p className="text-sm text-gray-500">{toPersianDigits(CardData.Price.StartingText)}</p>

                                <p className="text-lg font-bold text-gray-900">
                                    {CardData.Price.IhoPrice.toLocaleString("fa-IR")}
                                </p>
                                <p className="text-sm text-gray-500">تومان</p>

                            </div>

                            <button
                                onClick={() => handleSelectHotel(CardData.Id, CardData.HotelName, CardData.CityEnName)}
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
