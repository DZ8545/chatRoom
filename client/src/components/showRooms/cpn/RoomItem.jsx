import React, { memo } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { message } from "antd";
import request from "../../../services/index";
import { socketEmit } from "../../../services/socket";
import { useDispatch } from "react-redux";
import { clearBroadcastAction } from "../../../store/modules/message";

const RoomItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 5px 3px;
  justify-content: space-between;
  align-items: center;
  .room_item_left {
    display: flex;
    .roomName {
      margin: 0 5px;
    }
    .peopleCount {
      color: green;
    }
    .icon-lock {
      color: red;
      margin-right: 2px;
    }
  }
  .roomPassword {
    display: none;
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    flex: 1;
    min-width: 30px;
    height: 25px;
    &:focus {
      outline: none;
    }
  }
  .room_item_right {
    width: 30px;
    flex-shrink: 0;
    .joinRoom {
      display: none;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    .currentRoom {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: green;
    }
  }
  &:hover .joinRoom {
    display: block;
  }
  &:hover .roomPassword {
    display: block;
  }
`;
const RoomItem = memo((props) => {
  const { room, isCurrentRoom } = props;
  const passwordRef = useRef();
  const dispatch = useDispatch();
  function joinRoom(roomId) {
    request
      .post("/room/joinRoom", {
        roomId: roomId,
        password: room.isSecret ? passwordRef.current.value : "",
      })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(clearBroadcastAction());
          socketEmit("joinRoom", roomId);
          message.success("已加入房间");
          room.isSecret && (passwordRef.current.value = "");
        } else {
          message.error("密码错误!");
        }
      });
  }
  return (
    <RoomItemWrapper>
      <div className="room_item_left">
        <div className="roomId">[{room.roomId}]</div>
        <div className="roomName">{room.roomName || "聊天广场"}</div>
        {room.isSecret && (
          <div className="secret">
            <i className="iconfont icon-lock"></i>
          </div>
        )}
        <div className="peopleCount">({room.peopleCount})</div>
      </div>
      {room.isSecret && (
        <input
          type="password"
          className="roomPassword"
          placeholder="请输入密码"
          ref={passwordRef}
        />
      )}
      <div className="room_item_right">
        {isCurrentRoom && <div className="currentRoom"></div>}
        {isCurrentRoom || (
          <div className="joinRoom" onClick={() => joinRoom(room.roomId)}>
            进入
          </div>
        )}
      </div>
    </RoomItemWrapper>
  );
});

export default RoomItem;
