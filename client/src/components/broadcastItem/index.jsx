import React, { memo } from "react";
import styled from "styled-components";

const BroadcastItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  .broadcastItem {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    padding: 0 5px;
  }
`;
const BroadcastItem = memo((props) => {
  const { description } = props;
  return (
    <BroadcastItemWrapper>
      <div className="broadcastItem">{description}</div>
    </BroadcastItemWrapper>
  );
});

export default BroadcastItem;
