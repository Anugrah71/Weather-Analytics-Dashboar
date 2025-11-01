import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchSearchResults,
} from "../features/weather/weatherThunks";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { searchResults } = useSelector((state) => state.weather);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        dispatch(fetchSearchResults(query));
      }
    }, 500); // debounce delay

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
   <div className="relative mb-6 w-fit">
  <div className="flex items-center">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border rounded p-2 text-black w-64"
      placeholder="Search for a city..."
    />
    <button
      onClick={handleSearch}
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Search
    </button>
  </div>

  {query.length > 2 && searchResults.length > 0 && (
    <ul
      className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg w-full z-10 max-h-60 overflow-y-auto"
    >
      {searchResults.map((city) => (
        <li
          key={city.id}
          onClick={() => handleSelect(city.name)}
          className="p-2 hover:bg-gray-200 cursor-pointer"
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
