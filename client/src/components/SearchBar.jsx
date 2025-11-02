import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchSearchResults } from "../features/weather/weatherThunks";
import { Search } from "lucide-react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { searchResults } = useSelector((state) => state.weather);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        dispatch(fetchSearchResults(query));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  const handleSelect = (city) => {
    dispatch(fetchWeather(city));
    setQuery("");
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(fetchWeather(query.trim()));
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for a city..."
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Dropdown results */}
      {query.length > 2 && searchResults.length > 0 && (
        <ul
          className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-full z-50 max-h-60 overflow-y-auto border border-gray-200"
        >
          {searchResults.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
