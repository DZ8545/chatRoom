import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PeopleItem from "../peopleItem";

const ShowPeoplesWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 11px;
`;
const ShowPeoples = memo(() => {
  const { peoples, socketId } = useSelector((state) => {
    return {
      peoples: state.room.peoples,
      socketId: state.user.socketId,
    };
  });
  return (
    <ShowPeoplesWrapper className="scrollY">
      {Object.entries(peoples).map((val) => {
        return (
          <PeopleItem info={val[1]} isMy={val[0] === socketId} key={val[0]} />
        );
      })}
    </ShowPeoplesWrapper>
  );
});

export default ShowPeoples;
