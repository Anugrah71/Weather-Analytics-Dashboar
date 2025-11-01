import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "./weatherThunks";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    unit: "celsius",
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
      });
  },
});

export const { toggleUnit, removeCityWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
