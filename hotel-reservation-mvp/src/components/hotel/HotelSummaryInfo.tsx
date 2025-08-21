import { MapPin, Star } from "lucide-react";
import type { HotelSummary } from "../../types/hotelSummary"
import { toPersianDigits } from "../../utils/persianDigits";


interface HotelSummaryInfoProps {
    summary: HotelSummary | null
}


export default function HotelSummaryInfo({ summary }: HotelSummaryInfoProps) {
    if (!summary)
        return null;
    return (
        <div>
            <h1 className="text-3xl text-start font-bold">{summary.fullName}</h1>
            <div className="flex items-center gap-4 mt-2 text-lg">
                <Star className="w-4 h-4 text-gray-400 fill-gray-400" />
                <p>{toPersianDigits(summary.gradeName)} ستاره</p>
            </div>
                        <div className="flex items-center gap-4 mt-2 text-lg">
                <MapPin className="w-4 h-4  fill-gray-400" />
                <p>{toPersianDigits(summary.address)}</p>
            </div>
            
            
            <div className="flex items-center gap-4 mt-8">
                <div className="bg-blue-600 text-white text-2xl p-2 rounded-md">
                    {toPersianDigits(summary.hotelRank)}
                </div>
                <p className="text-lg ">{summary.rankName}</p>
            </div>

            <hr className="my-4" />
        </div>
    )
}
