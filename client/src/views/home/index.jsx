import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import store from "../../store";
import { saveUserAction } from "../../store/modules/user";
import classNames from "classnames";
import PeopleItem from "../../components/peopleItem";
import Music from "../../components/music";
import MessageInput from "../../components/messageInput";
import { socketConnection } from "../../services/socket";
import ShowMessages from "../../components/showMessages";
import Profile from "../../components/profile";
import ShowPeoples from "../../components/showPeoples";

const HomeWrapper = styled.div`
  position: fixed;
  left: 10%;
  right: 10%;
  top: 5%;
  bottom: 5%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
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
    }
  }
  > .right {
    overflow: hidden;
    width: 300px;
    margin-left: 2px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    .interval {
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
    }
    .rooms {
      height: 120px;
      overflow-y: scroll;
    }
  }
  /* 滚动条整体 */
  .scrollY::-webkit-scrollbar {
    width: 5px;
  }
  /* 两个滚动条交接处 -- x轴和y轴 */
  .scrollY::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  /* 滚动条滑块 */
  .scrollY::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.3);
  }
  /* 滚动条轨道 */
  .scrollY::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
`;
const Home = memo(() => {
  const dispatch = useDispatch();
  socketConnection(dispatch);
  const token = localStorage.getItem("user");
  const obj = JSON.parse(token);
  const [isOpen, setIsOpen] = useState(true);
  if (!store.getState().user.name) {
    dispatch(saveUserAction(obj));
  }

  return (
    <HomeWrapper>
      <div className="left">
        <div className="roomTop">
          <div className="roomName">聊天广场</div>
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
          <div className="interval">音乐</div>
          <Music />
          <div className="interval">房间</div>
          <div className="rooms scrollY"></div>
          <div className="interval">在线</div>
          <ShowPeoples />
        </div>
      )}
    </HomeWrapper>
  );
});

export default Home;
