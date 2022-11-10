import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    headImg: "",
    token: "",
    userId: "",
    socketId: "",
  },
  reducers: {
    saveUserAction(state, action) {
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.headImg = action.payload.headImg;
    },
    saveSocketIdAction(state, action) {
      state.socketId = action.payload;
    },
  },
});

export const { saveUserAction, saveSocketIdAction } = userSlice.actions;
export default userSlice.reducer;
