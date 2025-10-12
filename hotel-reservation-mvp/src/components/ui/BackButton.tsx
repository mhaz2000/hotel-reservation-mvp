import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional icon

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({ label = "بازگشت", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors ${className}`}
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
