import React, { memo } from "react";
import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import routes from "./router";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${require("./assets/img/login.webp")}) center/cover;
  overflow: hidden;
`;
const App = memo(() => {
  return <AppWrapper>{useRoutes(routes)}</AppWrapper>;
});

export default App;
