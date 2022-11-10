import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import messageReducer from "./modules/message";
import roomReducer from "./modules/room";

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    room: roomReducer,
  },
});

export default store;
