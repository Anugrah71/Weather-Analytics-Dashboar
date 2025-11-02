import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchForecast } from "../features/weather/weatherThunks";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import DetailedView from "../components/DetailedView";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { cities, status } = useSelector((state) => state.weather);
  const favorites = useSelector((state) => state.favorites);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState(null); // <-- ADD THIS LINE

  // Fetch initial data
  useEffect(() => {
    if (favorites.length > 0) {
      favorites.forEach((city) => dispatch(fetchWeather(city)));
    } else {
      dispatch(fetchWeather("London"));
    }
  }, [dispatch, favorites]);

  const handleCityClick = async (city) => {
    console.log("Card clicked:", city);
    const result = await dispatch(fetchForecast(city));
    console.log("Forecast data received:", result.payload);
    setForecastData(result.payload);
    setSelectedCity(city);
  };

  const handleCloseDetail = () => setSelectedCity(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>

      {status === "loading" && <p>Loading...</p>}
      <SearchBar />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {selectedCity && forecastData && (
        <DetailedView
          city={selectedCity}
          forecastdays={forecastData.forecast}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Dashboard;
