import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weather/weatherThunks";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { cities, status } = useSelector((state) => state.weather);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    if (favorites.length > 0) {
      favorites.forEach((city) => dispatch(fetchWeather(city)));
    } else {
      dispatch(fetchWeather("London"));
    }
  }, [dispatch, favorites]);
  return (
    <>
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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
