import { io } from "socket.io-client";
import store from "../store";
import {
  messagesCountAddAction,
  messagesIndexChangeAction,
  saveBroadcastAction,
  saveHistoryMessagesCount,
  saveMessageAction,
  toBottomAction,
} from "../store/modules/message";
import { savePeoplesAction } from "../store/modules/room";
import { saveSocketIdAction } from "../store/modules/user";
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
    dispatch(saveSocketIdAction(socket.id));
    const info = store.getState().user;
    socket.emit("addPeople", { name: info.name, headImg: info.headImg });

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
  });
}
