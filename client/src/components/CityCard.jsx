import { useDispatch, useSelector } from "react-redux";
import {addFavorite, removeFavorite} from "../features/favorites/favoritesSlice";
import { Star } from "lucide-react";

const CityCard = ({ city, temp, condition, icon, onClick }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(city);
  const handleToggleFavorite = (e) =>{
     e.stopPropagation();
     if(isFavorite) dispatch(removeFavorite(city));
     else dispatch(addFavorite(city));
  }
  return (
    <>
        <div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      {/* Header section: city name + favorite star */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">{city}</h3>

        {/* Star Button */}
        <button
          onClick={handleToggleFavorite}
          className="text-yellow-500 hover:text-yellow-600 transition"
        >
          <Star size={22} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Weather Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium text-gray-700">{temp}°C</p>
          <p className="text-sm text-gray-400">{condition}</p>
        </div>
        <img src={icon} alt={condition} className="w-12 h-12" />
      </div>
    </div>
    </>
  );
};

export default CityCard;
