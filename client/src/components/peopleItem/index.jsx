import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PeopleItemWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 5px;
  position: relative;
  .itemName {
    margin: 0 5px;
    font-size: 16px;
  }
`;
const PeopleItem = memo((props) => {
  const { roomMasterId } = useSelector((state) => {
    return {
      roomMasterId: state.room.roomMasterId,
    };
  });
  const { info, isMy = false } = props;
  return (
    <PeopleItemWrapper>
      <img
        src={info.headImg}
        alt=""
        width={30}
        height={30}
        style={{ borderRadius: "50%" }}
      />
      <div className="itemName">{info.name}</div>
      {roomMasterId === info.userId && <div>(房主)</div>}
      {isMy && <div style={{ position: "absolute", right: "10px" }}>我</div>}
    </PeopleItemWrapper>
  );
});

export default PeopleItem;
