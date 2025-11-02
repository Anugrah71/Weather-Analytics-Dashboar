import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentWeather,
  getForecast,
  searchCities,
} from "../../api/weather";

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

export const fetchSearchResults = createAsyncThunk(
  "weather/fetchSearchResults",
  async (query) => {
    const res = await searchCities(query);
    return res;
  }
);
