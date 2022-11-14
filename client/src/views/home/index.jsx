import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import classNames from "classnames";
import Music from "../../components/music";
import MessageInput from "../../components/messageInput";
import { socketConnection, socketEmit } from "../../services/socket";
import ShowMessages from "../../components/showMessages";
import Profile from "../../components/profile";
import ShowPeoples from "../../components/showPeoples";
import ShowRooms from "../../components/showRooms";
import Interval from "../../components/interval";
import { message } from "antd";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  .homeBottom {
    height: 70px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .homeTop {
    flex: 1;
    height: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    display: flex;
    margin: 1% 10%;
    .left {
      display: flex;
      flex-direction: column;
      flex: 1;
      .roomTop {
        height: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 10px;
        .roomTopRight {
          .zhankai:hover {
            cursor: pointer;
          }
          .open {
            transform: rotate(180deg);
          }
          .icon-zhankai {
            font-size: 25px;
          }
        }
        .roomTopLeft {
          display: flex;
          align-items: center;
          line-height: 40px;
          .roomId {
            font-size: 20px;
            margin-right: 5px;
          }
          .roomName {
            line-height: 40px;
            font-size: 16px;
          }
        }
      }
    }
    > .right {
      overflow: hidden;
      width: 350px;
      margin-left: 2px;
      border-left: 1px solid rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
  }
`;
const Home = memo(() => {
  const { roomName, roomId } = useSelector((state) => {
    return {
      roomName: state.room.roomName,
      roomId: state.room.roomId,
    };
  });
  const dispatch = useDispatch();
  socketConnection(dispatch);
  const token = localStorage.getItem("user");
  const obj = JSON.parse(token);
  const [isOpen, setIsOpen] = useState(true);
  if (!token) {
    message.error("请先登录!");
  }else{
    socketEmit("getUser",obj.userId)
  }

  return (
    <HomeWrapper>
      <div className="homeTop">
        <div className="left">
          <div className="roomTop">
            <div className="roomTopLeft">
              <div className="roomId">
                [<span style={{ fontSize: "16px" }}>{roomId || "0001"}</span>]
              </div>
              <div className="roomName">{roomName || "聊天广场"}</div>
            </div>
            <div className="roomTopRight">
              <div
                className={classNames([isOpen ? "open" : "", "zhankai"])}
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className="iconfont icon-zhankai"></i>
              </div>
            </div>
          </div>
          <ShowMessages />
          <MessageInput />
        </div>
        {isOpen && (
          <div className="right">
            <Profile />
            <Interval leftText="房间" />
            <ShowRooms />
            <Interval leftText="在线" />
            <ShowPeoples />
          </div>
        )}
      </div>
      <div className="homeBottom">
        <Music />
      </div>
    </HomeWrapper>
  );
});

export default Home;
