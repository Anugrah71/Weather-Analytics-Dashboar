import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../../../client/src/features/weather/weatherSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
const persistedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
  },
   preloadedState: {
    favorites: persistedFavorites,
  },
});
