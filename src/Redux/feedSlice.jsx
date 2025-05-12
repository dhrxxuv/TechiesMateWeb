import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { user: [] }, 
  reducers: {
    addToFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return { user: [] };
    },
    removeUserFromFeed: (state, action) => {
      state.user = state.user.filter((r) => r._id !== action.payload);
      return state;
    },
  },
});

export const { addToFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
