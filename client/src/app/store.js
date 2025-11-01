import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../features/favorites/favoritesSlice";
import weatherReducer from "../features/weather/weatherSlice";

const persistedFavorites = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: persistedFavorites,
  },
});
