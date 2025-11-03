import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { info: null },
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    logoutUser: (state) => {
      state.info = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
