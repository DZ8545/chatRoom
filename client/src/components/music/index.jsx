import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { createRef } from "react";
import classNames from "classnames";

const MusicWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  .preMusic {
    transform: rotate(180deg);
  }
  .picImg {
    animation: x 2s infinite linear;
  }
  @keyframes x {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .xiayishou {
    font-size: 30px;
  }
  .xiayishou:hover {
    color: red;
    cursor: pointer;
  }
  .playIcon {
    z-index: 9;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 1000;
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  audio {
    width: 100%;
  }
`;
const Music = memo(() => {
  const [isPlay, setIsPlay] = useState(false);
  const [musics, setMusics] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
  const [musicRefresh, setMusicRefresh] = useState(0);
  const [musicIsLoading, setMusicIsLoading] = useState(false);
  const playerRef = createRef();
  function getMusic(isNext = true) {
    if (!isNext && currentMusicIndex !== 0) {
      setCurrentMusicIndex(currentMusicIndex - 1);
      setMusicRefresh(musicRefresh + 1);
    } else if (isNext && currentMusicIndex !== musics.length - 1) {
      setCurrentMusicIndex(currentMusicIndex + 1);
      setMusicRefresh(musicRefresh + 1);
    } else {
      axios
        .get("https://api.uomg.com/api/rand.music?sort=热歌榜&format=json")
        .then((res) => {
          const obj = {
            url: res.data.data.url,
            picurl: res.data.data.picurl,
            name: res.data.data.name,
          };
          if (isNext) {
            setMusics([...musics, obj]);
            setCurrentMusicIndex(currentMusicIndex + 1);
          } else {
            setMusics([obj, ...musics]);
          }
          setMusicRefresh(musicRefresh + 1);
        });
    }
  }
  function musicControl() {
    if (currentMusicIndex === -1) {
      getMusic();
    } else {
      setIsPlay(!isPlay);
    }
  }
  useEffect(() => {
    if (currentMusicIndex !== -1) {
      playerRef.current.src = musics[currentMusicIndex]?.url;
      setIsPlay(true);
      setMusicIsLoading(false);
    }
    // eslint-disable-next-line
  }, [musicRefresh]);
  useEffect(() => {
    if (isPlay) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    // eslint-disable-next-line
  }, [isPlay]);
  function nextMusic(isNext = true) {
    setMusicIsLoading(true);
    setIsPlay(false);
    getMusic(isNext);
  }
  return (
    <MusicWrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        {musics.length !== 0 && (
          <div className="preMusic" onClick={() => nextMusic(false)}>
            <i className="iconfont icon-xiayishou xiayishou"></i>
          </div>
        )}
        <div
          style={{ position: "relative", width: "60px", height: "60px" }}
          onClick={() => musicControl()}
        >
          <img
            className={classNames([isPlay ? "picImg" : ""])}
            src={
              musics[currentMusicIndex]?.picurl ||
              require("../../assets/img/musicImg.png")
            }
            alt=""
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
            }}
          />
          <i
            className={classNames([
              "iconfont",
              "playIcon",
              isPlay ? "icon-24gf-pause2" : "icon-24gl-play",
            ])}
          ></i>
        </div>
        {musics.length !== 0 && (
          <div className="nextMusic" onClick={() => nextMusic()}>
            <i className="iconfont icon-xiayishou xiayishou"></i>
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          {musicIsLoading ? "加载中。。。" : musics[currentMusicIndex]?.name}
        </div>
      </div>
      <audio controls ref={playerRef} onEnded={() => nextMusic()}></audio>
    </MusicWrapper>
  );
});

export default Music;
