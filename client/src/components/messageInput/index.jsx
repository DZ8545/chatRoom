import React, { memo } from "react";
import styled from "styled-components";
import { socketEmit } from "../../services/socket";
import store from "../../store";

const MessageInputWrapper = styled.div`
  height: 180px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 10px;
  .input {
    border: none;
    width: 100%;
    height: 120px;
    resize: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
  .submit {
    display: flex;
    flex-direction: row-reverse;
  }
`;
const MessageInput = memo(() => {
  const textRef = React.createRef();
  function send(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      textRef.current.value = textRef.current.value + "\n";
      return;
    }
    if (e.keyCode === 13 && textRef.current.value) {
      socketEmit("send", {
        userName: store.getState().user.name,
        time: new Date().getTime(),
        message: textRef.current.value,
        roomId: "0001",
      });
      textRef.current.value = "";
    }
  }
  return (
    <MessageInputWrapper>
      <textarea
        className="input scrollY"
        placeholder="请输入。。。"
        ref={textRef}
        onKeyUp={(e) => send(e)}
      ></textarea>
    </MessageInputWrapper>
  );
});

export default MessageInput;
