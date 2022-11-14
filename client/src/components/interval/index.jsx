import React, { memo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { socketEmit } from "../../services/socket";
import request from "../../services";

const IntervalWrapper = styled.div`
  height: 25px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 6px;
  .icon-jia {
    color: rgba(255, 255, 255);
    &:hover {
      cursor: pointer;
    }
  }
  .create_room_box {
    position: absolute;
    width: 100%;
    height: 190px;
    background-color: white;
    top: 25px;
    z-index: 99;
  }
  .ant-form-item {
    margin: 5px 0;
  }
`;
const Interval = memo((props) => {
  const { userId } = useSelector((state) => {
    return {
      userId: state.user.userId,
    };
  });
  const { leftText } = props;
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    const info = { ...values, roomMasterId: userId };
    request.post("/room/create", info).then((res) => {
      if (res.data.status === 400) {
        message.error("ID已存在!");
      } else if (res.data.status === 200) {
        message.success("房间创建成功");
        setOpen(false);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    message.warning("ID与房间名属于必填!");
  };
  return (
    <IntervalWrapper>
      <div>{leftText}</div>
      {leftText === "房间" && (
        <i
          className="iconfont icon-jia"
          title="创建房间"
          onClick={() => setOpen(!open)}
        ></i>
      )}
      {leftText === "房间" && open && (
        <div className="create_room_box">
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
              label="ID"
              name="roomId"
              rules={[
                {
                  required: true,
                  message: "Please input roomId!",
                },
              ]}
              style={{ marginBottom: "22px" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="房间名"
              name="roomName"
              rules={[
                {
                  required: true,
                  message: "Please input roomName!",
                },
              ]}
              style={{ marginBottom: "22px" }}
            >
              <Input />
            </Form.Item>

            <Form.Item label="密码" name="password">
              <Input.Password placeholder="不填属于公开房间" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                style={{ marginRight: "5px" }}
                onClick={() => setOpen(!open)}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </IntervalWrapper>
  );
});

export default Interval;
