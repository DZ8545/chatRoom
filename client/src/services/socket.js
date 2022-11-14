import { io } from "socket.io-client";
import {
  messagesCountAddAction,
  messagesIndexChangeAction,
  saveBroadcastAction,
  saveHistoryMessagesCount,
  saveMessageAction,
  toBottomAction,
} from "../store/modules/message";
import {
  savePeoplesAction,
  saveRoomInfoAction,
  saveRoomsAction,
} from "../store/modules/room";
import { saveUserAction } from "../store/modules/user";
let socket;

export function socketEmit(type, info) {
  socket.emit(type, info);
}

export function socketConnection(dispatch) {
  if (!socket) {
    socket =
      process.env.REACT_APP_ENV === "production"
        ? io()
        : io("ws://localhost:8001");
  }
  socket.on("connect", () => {
    socket.on("initUser", (info) => {
      dispatch(saveUserAction(info));
    });
    socket.on("broadcast", (res) => {
      dispatch(saveBroadcastAction(res));
    });
    socket.on("initHistoryMessages", (messages) => {
      dispatch(saveMessageAction(messages));
      dispatch(saveHistoryMessagesCount(messages.length));
      dispatch(toBottomAction());
    });
    socket.on("peoples", (peoples) => {
      dispatch(savePeoplesAction(peoples));
    });
    socket.on("getRooms", (arr) => {
      dispatch(saveRoomsAction(arr));
    });
    socket.on("getMessage", (messages) => {
      dispatch(saveMessageAction(messages));
      dispatch(messagesCountAddAction(1));
      dispatch(toBottomAction());
    });
    socket.on("getMoreMessage", (res) => {
      dispatch(saveMessageAction(res.messages));
      dispatch(messagesIndexChangeAction(res.count));
      dispatch(saveHistoryMessagesCount(res.count));
    });
    socket.on("roomChange", (info) => {
      dispatch(saveRoomInfoAction(info));
    });
  });
}
