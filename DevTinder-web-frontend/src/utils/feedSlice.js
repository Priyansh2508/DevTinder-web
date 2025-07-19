// feedSlice.js
import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed=state.filter((user) => user._id != action.payload);
      return newFeed;
    }
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;  // ✅ THIS LINE IS REQUIRED

export default feedSlice.reducer;
