import React, { memo } from "react";
import styled from "styled-components";
import classnames from "classnames";

const MessageItemWrapper = styled.div`
  .item {
    margin-top: 15px;
    display: flex;
    .right {
      margin-left: 13px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name {
        font-size: 16px;
      }
      .time {
        font-size: 10px;
      }
      .content {
        background-color: rgba(238, 238, 238, 1);
        box-sizing: border-box;
        padding: 5px 8px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        max-width: 500px;
        min-width: 30px;
        position: relative;
        margin: 3px 0;
        white-space: pre-wrap;
        &::before {
          content: "";
          position: absolute;
          box-sizing: border-box;
          left: -19px;
          top: 6px;
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-right: 10px solid rgba(238, 238, 238, 1);
        }
      }
      .content-my {
        background-color: rgba(169, 232, 122, 1);
        &::before {
          border: none;
        }
        &::after {
          content: "";
          position: absolute;
          right: -19px;
          top: 6px;
          width: 0;
          height: 0;
          border: 10px solid transparent;
          border-left: 10px solid rgba(169, 232, 122, 1);
        }
      }
    }
    .right-my {
      margin-right: 13px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .item-my {
    flex-direction: row-reverse;
  }
`;
const index = memo((props) => {
  const { isMy, messageItem } = props;
  const date = new Date(messageItem.time);
  const nowDate = new Date();
  let time;
  if (date.getFullYear() === nowDate.getFullYear()) {
    const startTimeMs = new Date().setHours(0, 0, 0, 0);
    const endTimeMs = new Date(date.getTime()).setHours(0, 0, 0, 0);
    if (startTimeMs === endTimeMs) {
      time =
        "今天 " +
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0");
    } else if (startTimeMs === endTimeMs + 24 * 60 * 60 * 1000) {
      time =
        "昨天 " +
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0");
    } else {
      time =
        date.getMonth() +
        1 +
        "/" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
    }
  } else {
    time = date.toLocaleString();
  }
  return (
    <MessageItemWrapper>
      <div className={classnames([!isMy ? "item" : "item item-my"])}>
        <div className="img">
          <img
            src={messageItem.userHeadImg || require("../../assets/img/dz.jpg")}
            alt="用户头像"
            width={50}
            height={50}
          />
        </div>
        <div className={classnames([isMy ? "right right-my" : "right"])}>
          <div className="name">{messageItem.userName}</div>
          <div
            className={classnames([isMy ? "content content-my" : "content"])}
          >
            {messageItem.message}
          </div>
          <div className="time">{time}</div>
        </div>
      </div>
    </MessageItemWrapper>
  );
});

export default index;
