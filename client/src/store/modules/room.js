import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomId: "0001",
    roomName: "聊天广场",
    roomMasterId: "",
    peoples: [],
    rooms: [],
    isSecret: false,
  },
  reducers: {
    savePeoplesAction(state, action) {
      state.peoples = action.payload;
    },
    saveRoomsAction(state, action) {
      state.rooms = action.payload;
    },
    saveRoomInfoAction(state, action) {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
      state.roomMasterId = action.payload.roomMasterId;
      state.isSecret = action.payload.isSecret;
    },
  },
});

export const { savePeoplesAction, saveRoomsAction, saveRoomInfoAction } =
  roomSlice.actions;
export default roomSlice.reducer;
