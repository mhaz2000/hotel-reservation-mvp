import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getHotelSummary } from "../../api/hotel";
import type { HotelSummary } from "../../types/hotelSummary";

export default function HotelSummaryHeader() {
    const [searchParams] = useSearchParams();
    const cityName = searchParams.get("cityName");
    const hotelName = searchParams.get("hotelName");

    const [summary, setSummary] = useState<HotelSummary | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cityName || !hotelName) return;

        const fetchSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getHotelSummary(cityName, hotelName);
                setSummary(data);
            } catch (err) {
                console.error(err);
                setError("خطا در دریافت اطلاعات هتل");
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [cityName, hotelName]);

    if (!cityName || !hotelName) {
        return <p className="text-red-500 text-center mt-4">نام شهر یا هتل معتبر نیست</p>;
    }
    if (loading) return <p className="text-center mt-4">در حال بارگذاری...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
    if (!summary) return null;

    const pictures = summary.ModalHotelGallery.Pictures || [];
    const mainPic = pictures[0];
    const sidePics = pictures.slice(1, 5);

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Right side - big picture */}
            <div className="col-span-1">
                {mainPic && (
                    <img
                        src={mainPic.Jpg}
                        alt={mainPic.Alt || summary.ModalHotelGallery.HotelName}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                )}
            </div>

            {/* Left side - small pictures */}
            <div className="grid grid-cols-2 gap-2 col-span-2">
                {sidePics.map((pic, idx) => (
                    <img
                        key={idx}
                        src={pic.Jpg}
                        alt={pic.Alt || summary.ModalHotelGallery.HotelName}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                ))}
            </div>


        </div>
    );
}
