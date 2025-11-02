import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";
import { Star, Droplets, Wind } from "lucide-react";
import { removeCityWeather } from "../features/weather/weatherSlice";

const CityCard = ({
  city,
  temp,
  condition,
  icon,
  humidity,
  wind_speed,
  onClick,
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(city);
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(city));
      dispatch(removeCityWeather(city));
    } else {
      dispatch(addFavorite(city));
    }
  };
  return (
    <>
      <div
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
        onClick={() => {
          onClick(city);
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{city}</h3>

          <button
            onClick={handleToggleFavorite}
            className="text-yellow-500 hover:text-yellow-600 transition"
          >
            <Star size={22} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={icon} alt={condition} className="w-12 h-12" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{temp}°C</div>
              <div className="text-sm text-gray-600">{condition}</div>
            </div>
          </div>
        </div>

        {/* Extra details */}
        <div className="flex gap-3 justify-between mt-3 pt-2 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex items-center">
            <Droplets size={14} className="mr-1 text-blue-500" />
            {humidity}%
          </div>
          <div className="flex items-center">
            <Wind size={14} className="mr-1 text-blue-500" />
            {wind_speed} km/h
          </div>
        </div>
      </div>
    </>
  );
};

export default CityCard;
