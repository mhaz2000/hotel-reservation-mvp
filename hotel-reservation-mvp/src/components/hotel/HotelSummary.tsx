import type { HotelSummary } from "../../types/hotelSummary";

interface HotelSummaryHeaderProps {
    summary: HotelSummary | null
}

export default function HotelSummaryHeader({ summary }: HotelSummaryHeaderProps) {
    if (!summary) return null;

    const pictures = summary.gallery || [];
    const mainPic = pictures[0];
    const sidePics = pictures.slice(1, 5);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

            {/* Right side - big picture */}
            <div className="col-span-1">
                {mainPic && (
                    <img
                        src={mainPic.pictureUrl}
                        alt={mainPic.title || mainPic.titleEn}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                )}
            </div>

            {/* Left side - small pictures */}
            <div className="grid grid-cols-2 gap-2 col-span-2">
                {sidePics.map((pic, idx) => (
                    <img
                        key={idx}
                        src={pic.pictureUrl}
                        alt={pic.title || pic.titleEn}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
}
