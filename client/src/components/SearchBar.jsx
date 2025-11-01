import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../features/weather/weatherThunks";
const SearchBar = () => {
  const [city, setcity] = useState("London");
  const dispatch = useDispatch();
  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(fetchWeather(city)); //Trigger Redux async thunk
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setcity(e.target.value);
          }}
          className="border rounded p-2 text-black w-64"
          placeholder="Enter city name..."
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
