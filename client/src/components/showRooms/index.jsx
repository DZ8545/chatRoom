import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RoomItem from "./cpn/RoomItem";

const ShowRoomsWrapper = styled.div`
  height: 150px;
  overflow-y: scroll;
  position: relative;
`;
const ShowRooms = memo(() => {
  const { rooms, roomId } = useSelector((state) => {
    return {
      rooms: state.room.rooms,
      roomId: state.room.roomId,
    };
  });
  return (
    <ShowRoomsWrapper className="scrollY">
      {rooms.map((room) => {
        return (
          <RoomItem
            room={room}
            key={room.roomId}
            isCurrentRoom={roomId === room.roomId}
          />
        );
      })}
    </ShowRoomsWrapper>
  );
});

export default ShowRooms;
