import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../../../client/src/features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
