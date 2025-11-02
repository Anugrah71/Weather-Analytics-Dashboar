import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather, fetchSearchResults } from "./weatherThunks";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    searchResults: [],
    unit: "celsius",
    showSettings: false,
    status: "idle",
    error: null,
  },
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
    },
    removeCityWeather: (state, action) => {
      const cityName = action.payload;
      state.cities = state.cities.filter(
        (c) => c.name.toLowerCase() !== cityName.toLowerCase()
      );
    },

    SET_UNIT: (state, action) => {
      state.unit = action.payload;
    },
    TOGGLE_SETTINGS: (state) => {
      state.showSettings = !state.showSettings;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        const city = action.payload.location.name;
        const existing = state.cities.find(
          (c) => c.name.toLowerCase() === city.toLowerCase()
        );
        if (existing) existing.data = action.payload;
        else state.cities.push({ name: city, data: action.payload });
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload.results || [];
      });
  },
});

export const { toggleUnit, removeCityWeather, SET_UNIT, TOGGLE_SETTINGS } =
  weatherSlice.actions;
export default weatherSlice.reducer;
