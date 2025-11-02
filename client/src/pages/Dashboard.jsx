import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchForecast,
  fetchWeatherHistory,
} from "../features/weather/weatherThunks";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import DetailedView from "../components/DetailedView";
import { SET_UNIT, TOGGLE_SETTINGS } from "../features/weather/weatherSlice";
import SettingsModal from "../components/SettingsModal";
import { Cloud, Settings } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { cities, status, unit, showSettings } = useSelector(
    (state) => state.weather
  );
  const favorites = useSelector((state) => state.favorites);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchAll = () => {
      if (favorites.length > 0) {
        favorites.forEach((city) => dispatch(fetchWeather(city)));
      } else {
        dispatch(fetchWeather("London"));
      }
    };
    fetchAll();
    const interval = setInterval(fetchAll, 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch, favorites]);

  const handleCityClick = async (city) => {
    const forecastResult = await dispatch(fetchForecast(city));
    const historyResult = await dispatch(fetchWeatherHistory(city));
    const historyData = historyResult?.payload?.history || [];
    setForecastData({
      ...forecastResult.payload,
      history: historyData,
    });
    setSelectedCity(city);
  };

  const handleCloseDetail = () => setSelectedCity(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center">
            <Cloud className="text-blue-500 mr-2 sm:mr-3" size={28} />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Weather Analytics
            </h1>
          </div>
          <div className="w-full sm:flex-1 sm:max-w-md sm:mx-8">
            <SearchBar />
          </div>
          <button
            onClick={() => dispatch(TOGGLE_SETTINGS())}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings size={24} className="text-gray-600" />
          </button>
        </div>
      </header>

      {status === "loading" && (
        <div className="flex flex-col justify-center items-center py-10 text-gray-600 text-center px-4">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>Fetching latest weather data...</p>
        </div>
      )}
      {status === "failed" && (
        <div className="flex flex-col justify-center items-center py-10 text-red-600 text-center px-4">
          <p className="mb-3">Failed to load weather data. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
            Favorite Cities
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Click on a city card to view detailed analytics
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Cloud size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-base sm:text-lg">
              No favorite cities yet. Search and add some!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map(({ name, data }) => (
              <CityCard
                key={name}
                city={data.location.name}
                temp={data.current.temp_c}
                condition={data.current.condition.text}
                icon={data.current.condition.icon}
                humidity={data.current.humidity}
                wind_speed={data.current.wind_kph}
                onClick={() => handleCityClick(name)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedCity && forecastData && (
        <DetailedView
          city={selectedCity}
          forecastdays={forecastData.forecast}
          onClose={handleCloseDetail}
          current={forecastData.current}
        />
      )}

      {showSettings && (
        <SettingsModal
          unit={unit}
          onChangeUnit={(u) => dispatch(SET_UNIT(u))}
          onClose={() => dispatch(TOGGLE_SETTINGS())}
        />
      )}
    </div>
  );
};

export default Dashboard;
