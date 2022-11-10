import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button, Upload, Form, Input } from "antd";
import { useState } from "react";
import ImgCrop from "antd-img-crop";

const ProfileWrapper = styled.div`
  position: relative;
  .box {
    background-color: white;
    width: 100%;
    height: 230px;
    position: absolute;
    z-index: 99;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .ant-form-item {
    margin-bottom: 5px;
  }
`;
const Profile = memo(() => {
  const [boxType, setBoxType] = useState(0);
  const { name, headImg } = useSelector((state) => {
    return {
      name: state.user.name,
      headImg: state.user.headImg,
    };
  });
  const { Meta } = Card;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: headImg,
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  function changeBoxType(type) {
    if (type === boxType) {
      setBoxType(0);
    } else {
      setBoxType(type);
    }
  }
  return (
    <ProfileWrapper>
      <Card
        style={{
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
        }}
        actions={[
          <SettingOutlined key="setting" onClick={() => changeBoxType(1)} />,
          <EditOutlined key="edit" onClick={() => changeBoxType(2)} />,
          <EllipsisOutlined key="ellipsis" onClick={() => changeBoxType(3)} />,
        ]}
      >
        <Meta
          avatar={<Avatar src={headImg} size={60} />}
          title={name}
          description="暂无"
        />
      </Card>
      {boxType === 2 && (
        <div className="box">
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
          >
            <Form.Item label="头像" valuePropName="fileList">
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item
              label="昵称"
              name="name"
              initialValue={name}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="签名" name="autograph">
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </ProfileWrapper>
  );
});

export default Profile;
