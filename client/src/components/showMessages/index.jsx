import React, { memo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { socketEmit } from "../../services/socket";
import BroadcastItem from "../broadcastItem";
import MessageItem from "../../components/messageItem";

const ShowMessagesWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
`;
const ShowMessages = memo(() => {
  const {
    messages,
    toBottom,
    broadcasts,
    historyMessagesCount,
    messagesIndex,
    name,
  } = useSelector((state) => {
    return {
      messages: state.message.messages,
      messagesIndex: state.message.messagesIndex,
      broadcasts: state.message.broadcasts,
      historyMessagesCount: state.message.historyMessagesCount,
      name: state.user.name,
      toBottom: state.message.toBottom,
    };
  });
  useEffect(() => {
    roomMain.current.scrollTop =
      roomMain.current.scrollHeight - roomMain.current.clientHeight;
    // eslint-disable-next-line
  }, [toBottom]);

  useEffect(() => {
    if (roomMain.current.children[messagesIndex]) {
      roomMain.current.scrollBy(
        0,
        roomMain.current.children[messagesIndex].offsetTop - 15
      );
    }
  });

  function handleScroll(e) {
    if (e.target.scrollTop === 0) {
      socketEmit("moreMessages", "0001");
    }
  }
  const roomMain = React.createRef();
  function arrConcat(arr1, arr2, count) {
    const arr = [...arr1];
    const length = arr1.length;
    const arr3 = arr1
      .slice(length - count, length)
      .concat([...new Set(arr2)])
      .sort((a, b) => {
        return a.time - b.time;
      });
    arr.splice(length - count, count, ...arr3);
    return arr;
  }
  return (
    <ShowMessagesWrapper
      className="roomMain scrollY"
      ref={roomMain}
      onScroll={(e) => handleScroll(e)}
    >
      {arrConcat(messages, broadcasts, historyMessagesCount).map(
        (val, index) => {
          if (val.type === "broadcast") {
            return <BroadcastItem key={index} description={val.description} />;
          } else {
            return (
              <MessageItem
                isMy={val.userName === name}
                messageItem={val}
                key={val._id}
              />
            );
          }
        }
      )}
    </ShowMessagesWrapper>
  );
});

export default ShowMessages;
