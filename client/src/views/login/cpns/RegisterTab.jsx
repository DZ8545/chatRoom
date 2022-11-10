import React, { memo } from "react";
import styled from "styled-components";
import { Button, Form, Input, message } from "antd";
import request from "../../../services";

const RegisterTabWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 100px;
`;
const RegisterTab = memo(() => {
  const onFinish = (values) => {
    const key = "updatable";
    message.loading({
      content: "注册中...",
      key,
    });
    if (values.password1 === values.password2) {
      request
        .post("/users/register", {
          name: values.username,
          password: values.password1,
          email: values.email,
        })
        .then((res) => {
          if (res.data.status === 200) {
            message.success({
              content: "注册成功!",
              key,
              duration: 2,
            });
          } else if (res.data.status === 400) {
            message.error({
              content: "注册失败，昵称已存在!",
              key,
              duration: 2,
            });
          } else {
            message.error({
              content: "注册失败，请重试!",
              key,
              duration: 2,
            });
          }
        });
    } else {
      message.error({
        content: "密码输入不相同!",
        key,
        duration: 2,
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <RegisterTabWrapper>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="昵称"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password1"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="再次输入密码"
          name="password2"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </RegisterTabWrapper>
  );
});

export default RegisterTab;
