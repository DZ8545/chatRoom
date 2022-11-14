import classNames from "classnames";
import React, { memo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { socketEmit } from "../../services/socket";
import store from "../../store";
import { saveQuoteAction } from "../../store/modules/message";

const MessageInputWrapper = styled.div`
  position: relative;
  height: 180px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 10px;
  .input {
    border: none;
    width: 100%;
    height: 60px;
    resize: none;
    font-size: 16px;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }
  .submit {
    display: flex;
    flex-direction: row-reverse;
  }
  .quote {
    background-color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    position: relative;
    .icon-quxiao {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
  .emojiBox {
    position: absolute;
    height: 120px;
    width: 100%;
    bottom: 180px;
    left: 0;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 5px;
    .emojiBoxTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .emojiType {
        .emojiTypeActive {
          border-bottom: 1px solid rgba(0, 0, 0, 0.7);
        }
        .typeItem {
          margin-right: 10px;
          padding-bottom: 3px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .icon-quxiao {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .emojiItem {
      font-size: 25px;
      cursor: pointer;
    }
  }
  .messageInputTop {
    height: 30px;
    display: flex;
    align-items: center;
    .icon-emoji {
      font-size: 30px;
      color: rgba(0, 0, 0, 0.5);
      &:hover {
        color: red;
      }
    }
  }
`;
const MessageInput = memo(() => {
  const [emojiBoxIsOpen, setEmojiBoxIsOpen] = useState(false);
  const [emojiType, setEmojiType] = useState(0);
  const dispatch = useDispatch();
  const textRef = React.createRef();
  const { roomId, quote } = useSelector((state) => {
    return {
      roomId: state.room.roomId,
      quote: state.message.quote,
    };
  });
  function send(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      textRef.current.value = textRef.current.value + "\n";
      return;
    }
    if (e.keyCode === 13 && textRef.current.value.replaceAll("\n", "") !== "") {
      socketEmit("send", {
        userName: store.getState().user.name,
        time: new Date().getTime(),
        message: textRef.current.value,
        roomId: roomId,
        quote,
      });
      dispatch(saveQuoteAction(""));
      textRef.current.value = "";
    }
  }
  const emoji = [
    [
      { emoji: "😀", emojiName: "嘿嘿" },
      { emoji: "😃", emojiName: "哈哈" },
      { emoji: "😄", emojiName: "大笑" },
      { emoji: "😁", emojiName: "嘻嘻" },
      { emoji: "😆", emojiName: "斜眼笑" },
      { emoji: "😅", emojiName: "苦笑" },
      { emoji: "🤣", emojiName: "笑得满地打滚" },
      { emoji: "😂", emojiName: "笑哭了" },
      { emoji: "🙂", emojiName: "呵呵" },
      { emoji: "🙃", emojiName: "倒脸" },
      { emoji: "🫠", emojiName: "融化" },
      { emoji: "😉", emojiName: "眨眼" },
      { emoji: "😊", emojiName: "羞涩微笑" },
      { emoji: "😇", emojiName: "微笑天使" },
      { emoji: "🥰", emojiName: "喜笑颜开" },
      { emoji: "😍", emojiName: "花痴" },
      { emoji: "🤩", emojiName: "好崇拜哦" },
      { emoji: "😘", emojiName: "飞吻" },
      { emoji: "😗", emojiName: "亲亲" },
      { emoji: "😚", emojiName: "羞涩亲亲" },
      { emoji: "😙", emojiName: "微笑亲亲" },
      { emoji: "🥲", emojiName: "含泪的笑脸" },
      { emoji: "😋", emojiName: "好吃" },
      { emoji: "😛", emojiName: "吐舌" },
      { emoji: "😜", emojiName: "单眼吐舌" },
      { emoji: "🤪", emojiName: "滑稽" },
      { emoji: "😝", emojiName: "眯眼吐舌" },
      { emoji: "🤑", emojiName: "发财" },
      { emoji: "🤗", emojiName: "抱抱" },
      { emoji: "🤭", emojiName: "不说" },
      { emoji: "🫢", emojiName: "睁眼捂嘴" },
      { emoji: "🫣", emojiName: "偷看" },
      { emoji: "🤫", emojiName: "安静的脸" },
      { emoji: "🤔", emojiName: "想一想" },
      { emoji: "🫡", emojiName: "致敬" },
      { emoji: "🤐", emojiName: "闭嘴" },
      { emoji: "🤨", emojiName: "挑眉" },
      { emoji: "😐", emojiName: "冷漠" },
      { emoji: "😑", emojiName: "无语" },
      { emoji: "😶", emojiName: "沉默" },
      { emoji: "🫥", emojiName: "虚线脸" },
      { emoji: "😏", emojiName: "得意" },
      { emoji: "😒", emojiName: "不高兴" },
      { emoji: "🙄", emojiName: "翻白眼" },
      { emoji: "😬", emojiName: "龇牙咧嘴" },
      { emoji: "🤥", emojiName: "说谎" },
      { emoji: "😌", emojiName: "松了口气" },
      { emoji: "😔", emojiName: "沉思" },
      { emoji: "😪", emojiName: "困" },
      { emoji: "🤤", emojiName: "流口水" },
      { emoji: "😴", emojiName: "睡着了" },
      { emoji: "😷", emojiName: "感冒" },
      { emoji: "🤒", emojiName: "发烧" },
      { emoji: "🤕", emojiName: "受伤" },
      { emoji: "🤢", emojiName: "恶心" },
      { emoji: "🤮", emojiName: "呕吐" },
      { emoji: "🤧", emojiName: "打喷嚏" },
      { emoji: "🥵", emojiName: "脸发烧" },
      { emoji: "🥶", emojiName: "冷脸" },
      { emoji: "🥴", emojiName: "头昏眼花" },
      { emoji: "😵", emojiName: "晕头转向" },
      { emoji: "🤯", emojiName: "爆炸头" },
      { emoji: "🤠", emojiName: "牛仔帽脸" },
      { emoji: "🥳", emojiName: "聚会笑脸" },
      { emoji: "🥸", emojiName: "伪装的脸" },
      { emoji: "😎", emojiName: "墨镜笑脸" },
      { emoji: "🤓", emojiName: "书呆子脸" },
      { emoji: "🧐", emojiName: "带单片眼镜的脸" },
      { emoji: "😕", emojiName: "困扰" },
      { emoji: "🫤", emojiName: "郁闷" },
      { emoji: "😟", emojiName: "担心" },
      { emoji: "🙁", emojiName: "微微不满" },
      { emoji: "☹", emojiName: "不满" },
      { emoji: "😮", emojiName: "吃惊" },
      { emoji: "😯", emojiName: "缄默" },
      { emoji: "😲", emojiName: "震惊" },
      { emoji: "😳", emojiName: "脸红" },
      { emoji: "🥺", emojiName: "恳求的脸" },
      { emoji: "🥹", emojiName: "忍住泪水" },
      { emoji: "😦", emojiName: "啊" },
      { emoji: "😧", emojiName: "极度痛苦" },
      { emoji: "😨", emojiName: "害怕" },
      { emoji: "😰", emojiName: "冷汗" },
      { emoji: "😥", emojiName: "失望但如释重负" },
      { emoji: "😢", emojiName: "哭" },
      { emoji: "😭", emojiName: "放声大哭" },
      { emoji: "😱", emojiName: "吓死了" },
      { emoji: "😖", emojiName: "困惑" },
      { emoji: "😣", emojiName: "痛苦" },
      { emoji: "😞", emojiName: "失望" },
      { emoji: "😓", emojiName: "汗" },
      { emoji: "😩", emojiName: "累死了" },
      { emoji: "😫", emojiName: "累" },
      { emoji: "🥱", emojiName: "打呵欠" },
      { emoji: "😤", emojiName: "傲慢" },
      { emoji: "😡", emojiName: "怒火中烧" },
      { emoji: "😠", emojiName: "生气" },
      { emoji: "🤬", emojiName: "嘴上有符号的脸" },
    ],
    [
      { emoji: "😺", emojiName: "大笑的猫" },
      { emoji: "😸", emojiName: "微笑的猫" },
      { emoji: "😹", emojiName: "笑出眼泪的猫" },
      { emoji: "😻", emojiName: "花痴的猫" },
      { emoji: "😼", emojiName: "奸笑的猫" },
      { emoji: "😽", emojiName: "亲亲猫" },
      { emoji: "🙀", emojiName: "疲倦的猫" },
      { emoji: "😿", emojiName: "哭泣的猫" },
      { emoji: "😾", emojiName: "生气的猫" },
    ],
    [
      { emoji: "🙈", emojiName: "非礼勿视" },
      { emoji: "🙉", emojiName: "非礼勿听" },
      { emoji: "🙊", emojiName: "非礼勿言" },
    ],
    [
      { emoji: "😈", emojiName: "恶魔微笑" },
      { emoji: "👿", emojiName: "生气的恶魔" },
      { emoji: "💀", emojiName: "头骨" },
      { emoji: "☠", emojiName: "骷髅" },
      { emoji: "💩", emojiName: "大便" },
      { emoji: "🤡", emojiName: "小丑脸" },
      { emoji: "👹", emojiName: "食人魔" },
      { emoji: "👺", emojiName: "小妖精" },
      { emoji: "👻", emojiName: "鬼" },
      { emoji: "👽", emojiName: "外星人" },
      { emoji: "👾", emojiName: "外星怪物" },
      { emoji: "🤖", emojiName: "机器人" },
      { emoji: "💌", emojiName: "情书" },
      { emoji: "💘", emojiName: "心中箭了" },
      { emoji: "💝", emojiName: "系有缎带的心" },
      { emoji: "💖", emojiName: "闪亮的心" },
      { emoji: "💗", emojiName: "搏动的心" },
      { emoji: "💓", emojiName: "心跳" },
      { emoji: "💞", emojiName: "舞动的心" },
      { emoji: "💕", emojiName: "两颗心" },
      { emoji: "💟", emojiName: "心型装饰" },
      { emoji: "❣", emojiName: "心叹号" },
      { emoji: "💔", emojiName: "心碎" },
      { emoji: "❤", emojiName: "红心" },
      { emoji: "🧡", emojiName: "橙心" },
      { emoji: "💛", emojiName: "黄心" },
      { emoji: "💚", emojiName: "绿心" },
      { emoji: "💙", emojiName: "蓝心" },
      { emoji: "💜", emojiName: "紫心" },
      { emoji: "🤎", emojiName: "棕心" },
      { emoji: "🖤", emojiName: "黑心" },
      { emoji: "🤍", emojiName: "白心" },
      { emoji: "💋", emojiName: "唇印" },
      { emoji: "💯", emojiName: "一百分" },
      { emoji: "💢", emojiName: "怒" },
      { emoji: "💥", emojiName: "爆炸" },
      { emoji: "💫", emojiName: "头晕" },
      { emoji: "💦", emojiName: "汗滴" },
      { emoji: "💨", emojiName: "尾气" },
      { emoji: "🕳", emojiName: "洞" },
      { emoji: "💬", emojiName: "话语气泡" },
      { emoji: "🗨", emojiName: "朝左的话语气泡" },
      { emoji: "🗯", emojiName: "愤怒话语气泡" },
      { emoji: "💭", emojiName: "内心活动气泡" },
      { emoji: "💤", emojiName: "睡着" },
    ],
  ];
  function changeEmojiType(type) {
    if (type !== emojiType) {
      setEmojiType(type);
    }
  }
  function addEmoji(emoji) {
    textRef.current.value += emoji;
  }
  return (
    <MessageInputWrapper>
      {emojiBoxIsOpen && (
        <div className="emojiBox scrollY">
          <div className="emojiBoxTop">
            <div className="emojiType">
              <span
                className={classNames([
                  "typeItem",
                  emojiType === 0 ? "emojiTypeActive" : "",
                ])}
                onClick={() => changeEmojiType(0)}
              >
                人脸
              </span>
              <span
                className={classNames([
                  "typeItem",
                  emojiType === 1 ? "emojiTypeActive" : "",
                ])}
                onClick={() => changeEmojiType(1)}
              >
                猫咪
              </span>
              <span
                className={classNames([
                  "typeItem",
                  emojiType === 2 ? "emojiTypeActive" : "",
                ])}
                onClick={() => changeEmojiType(2)}
              >
                猴子
              </span>
              <span
                className={classNames([
                  "typeItem",
                  emojiType === 3 ? "emojiTypeActive" : "",
                ])}
                onClick={() => changeEmojiType(3)}
              >
                其他
              </span>
            </div>
            <i
              className="iconfont icon-quxiao"
              onClick={() => setEmojiBoxIsOpen(false)}
            ></i>
          </div>
          {emoji[emojiType].map((item, index) => {
            return (
              <span
                className="emojiItem"
                title={item.emojiName}
                key={index}
                onClick={() => addEmoji(item.emoji)}
              >
                {item.emoji}
              </span>
            );
          })}
        </div>
      )}

      <div className="messageInputTop">
        <i
          className="iconfont icon-emoji"
          onClick={() => setEmojiBoxIsOpen(!emojiBoxIsOpen)}
        ></i>
      </div>
      <textarea
        className="input scrollY"
        placeholder="请输入。。。"
        ref={textRef}
        onKeyUp={(e) => send(e)}
      ></textarea>
      {quote && quote !== "" && (
        <div className="quote">
          {quote}
          <i
            className="iconfont icon-quxiao"
            onClick={() => dispatch(saveQuoteAction(""))}
          ></i>
        </div>
      )}
    </MessageInputWrapper>
  );
});

export default MessageInput;
