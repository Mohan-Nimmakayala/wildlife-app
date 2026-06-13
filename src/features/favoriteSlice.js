import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",

    initialState: JSON.parse(localStorage.getItem("wildlife-favorites")) || [],

    reducers: {
        addFavorite: (state, action) => {
            state.push(action.payload);

            localStorage.setItem("wildlife-favorites", JSON.stringify(state));
        },
        removeFavorite: (state, action) => {
            const updated = state.filter(
                (animal) => animal.id !== action.payload,
            );

            localStorage.setItem("wildlife-favorites", JSON.stringify(updated));

            return updated;
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;

