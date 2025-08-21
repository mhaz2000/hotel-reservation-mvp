// src/components/MainNavbar.tsx
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import brandLogo from "../assets/brand-logo.png";

export default function MainNavbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={brandLogo}
            alt="رزرو هتل"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Auth Links */}
        <div className="flex gap-3 items-center text-gray-700">
          <Calendar size={20} className="text-gray-700" />
          <Link to="reservation-history" className="hover:text-indigo-600">
            سوابق رزرو
          </Link>
        </div>
      </div>
    </nav>
  );
}
