import React, { memo } from "react";
import styled from "styled-components";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { saveUserAction } from "../../../store/modules/user";
import { useNavigate } from "react-router-dom";
import request from "../../../services";

const LoginTabWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 100px;
  .login-form {
    width: 100%;
  }
  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
  }
`;
const LoginTab = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const key = "updatable";
    message.loading({
      content: "登录中...",
      key,
    });
    request
      .post("/users/login", {
        name: values.username,
        password: values.password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          message.success({
            content: "登录成功!",
            key,
            duration: 2,
          });
          const userInfo = {
            name: values.username,
            token: res.data.token,
            userId: res.data.userId,
            headImg: res.data.headImg,
          };
          dispatch(saveUserAction(userInfo));
          localStorage.setItem("user", JSON.stringify(userInfo));
          navigate("/home");
        } else if (res.data.status === 401) {
          message.error({
            content: "用户已在线!",
            key,
            duration: 2,
          });
        } else {
          message.error({
            content: "用户名密码输入错误!",
            key,
            duration: 2,
          });
        }
      });
  };
  return (
    <LoginTabWrapper>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="昵称"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="http://localhost:3000/#/login">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginTabWrapper>
  );
});

export default LoginTab;
