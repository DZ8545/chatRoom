import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    headImg: "",
    token: "",
    userId: "",
    socketId: "",
    description: "",
  },
  reducers: {
    saveUserIdAction(state, action) {
      state.userId = action.payload;
    },
    saveUserAction(state, action) {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.userId = action.payload.userId;
      state.headImg = action.payload.headImg;
      state.socketId = action.payload.socketId;
    },
    saveSocketIdAction(state, action) {
      state.socketId = action.payload;
    },
    saveProfileAction(state, action) {
      state.description = action.payload.description;
      state.headImg = action.payload.headImg;
      state.name = action.payload.name;
    },
  },
});

export const { saveUserAction, saveUserIdAction,saveProfileAction, saveSocketIdAction } =
  userSlice.actions;
export default userSlice.reducer;
