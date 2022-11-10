import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomId: "",
    peoples: [],
  },
  reducers: {
    savePeoplesAction(state, action) {
      state.peoples = action.payload;
    },
  },
});

export const { savePeoplesAction } = roomSlice.actions;
export default roomSlice.reducer;
