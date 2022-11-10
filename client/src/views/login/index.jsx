import React, { memo } from "react";
import styled from "styled-components";
import { Tabs } from "antd";
import LoginTab from "./cpns/LoginTab";
import RegisterTab from "./cpns/RegisterTab";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .tabs {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    width: 650px;
    height: 350px;
  }
`;
const Login = memo(() => {
  const tabItems = [
    {
      label: `登录`,
      key: "1",
      children: <LoginTab />,
    },
    {
      label: `注册`,
      key: "2",
      children: <RegisterTab />,
    },
  ];
  return (
    <LoginWrapper>
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        items={tabItems}
        centered="true"
        tabBarGutter={50}
      />
    </LoginWrapper>
  );
});

export default Login;
