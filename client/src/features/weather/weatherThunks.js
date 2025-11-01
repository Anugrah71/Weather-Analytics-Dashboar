import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentWeather, getForecast } from "../../api/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const data = await getCurrentWeather(city);
    return data;
  }
);
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const data = await getForecast(city);
    return data;
  }
);
