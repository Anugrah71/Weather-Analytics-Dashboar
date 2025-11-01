import { createSlice } from "@reduxjs/toolkit";



  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: storedFavorites,
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.includes(city)) {
        state.push(city);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFavorite: (state, action) => {
      const city = action.payload;
      const updated = state.filter((c) => c !== city);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
