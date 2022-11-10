import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    historyMessagesCount: 0,
    broadcasts: [],
    toBottom: 0,
    messagesIndex: 0,
  },

  reducers: {
    saveMessageAction(state, action) {
      state.messages = action.payload;
    },
    saveBroadcastAction(state, action) {
      state.broadcasts = [...state.broadcasts, action.payload];
    },
    messagesCountAddAction(state, action) {
      state.messagesCount = state.messagesCount + action.payload;
    },
    toBottomAction(state, action) {
      state.toBottom = state.toBottom + 1;
    },
    messagesIndexChangeAction(state, action) {
      state.messagesIndex = action.payload;
    },
    saveHistoryMessagesCount(state, action) {
      state.historyMessagesCount = state.historyMessagesCount + action.payload;
    },
  },
});

export const {
  saveMessageAction,
  saveBroadcastAction,
  messagesCountAddAction,
  messagesIndexChangeAction,
  toBottomAction,
  saveHistoryMessagesCount,
} = messageSlice.actions;
export default messageSlice.reducer;
