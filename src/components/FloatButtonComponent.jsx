import React, { useEffect, useRef, useState } from "react";
import {
  FloatButton,
  Modal,
  Button,
  Input,
  Divider,
  Popover,
  Avatar,
  Card,
  ConfigProvider,
  List,
  Form,
  Space,
  InputNumber,
  Typography,
} from "antd";
import {
  NotificationOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { CiFaceSmile } from "react-icons/ci";
import "../styles/GlobalStyles.css";
import EmojiPicker from "emoji-picker-react";
import { PiHandPalmLight } from "react-icons/pi";
import useLocalStorage from "use-local-storage";
import { useSelector } from "react-redux";

const FloatButtonComponent = () => {
  const [chatBox, setChatBox] = useState(false);
  const auth = useSelector((state) => state.authen.currentUser);
  const [messageList, setMessageList] = useLocalStorage("messageList", [
    {
      id: 0,
      message: `Vui lòng cho chúng tôi biết nếu có bất cứ điều gì bạn cần trước khi bạn rời đi. Bạn có cần chúng tôi hỗ trợ gì về điều bạn cần không?`,
      sender: "admin",
      createdAt: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  // const [cursorPosition, setCursorPosition] = useState(0);
  // const [emoji, setEmoji] = useState("");
  // const [beforeCursor, setBeforeCursor] = useState("");
  // const [afterCursor, setAfterCursor] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      showChatboxModal();
    }, 90000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollToBottom && listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  const handleEmojiClick = (e) => {
    setNewMessage((prevMess) => prevMess + e.emoji);
  };

  const showChatboxModal = () => {
    setChatBox(true);
  };
  const closeChatboxModal = () => {
    setChatBox(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessageList([
        ...messageList,
        {
          id: Date.now(),
          message: newMessage,
          sender: "guest",
          createdAt: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        },
      ]);
      setNewMessage("");
      setScrollToBottom(true);
    }
  };

  return (
    <>
      <div>
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ right: 36 }}
          icon={<CustomerServiceOutlined />}
          className="your-animation-class-wrapper"
          onClick={showChatboxModal}
        >
          <FloatButton
            shape="circle"
            badge={{
              dot: true,
            }}
            type="primary"
            tooltip={<div>Notifications</div>}
            icon={<NotificationOutlined />}
            className="your-animation-class"
          />
          <FloatButton
            shape="circle"
            type="primary"
            tooltip={<div>Messenger</div>}
            icon={<FaFacebookMessenger />}
            className="your-animation-class"
          />
          <FloatButton
            type="primary"
            tooltip={<div>Zalo</div>}
            icon={<SiZalo />}
            className="your-animation-class"
          />
        </FloatButton.Group>
        <FloatButton.BackTop
          visibilityHeight={100}
          style={{ right: 36 + 70 }}
        />
      </div>
      <ConfigProvider
        theme={{
          token: {},
          components: {
            Modal: {
              contentBg: "lightblue",
              headerBg: "lightblue",
              footerBg: "lightblue",
              borderRadiusLG: "20px",
            },
          },
        }}
      >
        <Modal
          title={[
            <>
              <Card
                title={[
                  <div className="d-flex align-items-stretch">
                    <p>Hi, xin chào !</p>
                    <PiHandPalmLight size="2em" />
                  </div>,
                ]}
                style={{ backgroundColor: "lightblue", border: "none" }}
              >
                <Card.Meta
                  description="Chúng tôi ở đây để hỗ trợ bạn."
                  avatar={
                    <Avatar.Group maxCount={1}>
                      <Avatar src="https://image.lag.vn/upload/news/23/03/02/one-piece-oda-tiet-lo-gia-dinh-cua-zoro-2_SLFW.jpg" />
                      <Avatar src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6.jpg" />
                      <Avatar src="https://topnlist.com/wp-content/uploads/2021/09/Sanji.jpg" />
                    </Avatar.Group>
                  }
                />
              </Card>
            </>,
          ]}
          // open={false}
          open={chatBox}
          onOk={closeChatboxModal}
          onCancel={closeChatboxModal}
          maskClosable={true}
          mask={false}
          width={400}
          style={{
            position: "fixed",
            top: "20%",
            right: "5%",
          }}
          footer={[
            <>
              <div className="bg-light rounded-4">
                <Divider key="divider" style={{ marginBottom: "10px" }} />
                <Input.TextArea
                  type="text"
                  placeholder="Enter your message..."
                  variant="borderless"
                  size="medium"
                  allowClear
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  onSelect={(e) => {
                    // setCursorPosition(e.target.selectionStart);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                    setIsTyping(true);
                  }}
                  ref={inputRef}
                />
                <div className="d-flex mt-2 p-1 justify-content-between">
                  <Popover
                    content={() => (
                      <EmojiPicker
                        width={350}
                        height={450}
                        onEmojiClick={handleEmojiClick}
                      />
                    )}
                    placement="leftBottom"
                  >
                    <Button
                      type="link"
                      icon={<CiFaceSmile size="2em" title="icon" />}
                    />
                  </Popover>
                  <Button
                    key="submit"
                    type="primary"
                    shape="round"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>,
          ]}
        >
          <div
            className="bg-white rounded-4 p-1"
            style={{
              overflowY: "auto",
              height: "40vh",
              maxHeight: "40vh",
            }}
            ref={listRef}
          >
            <List
              itemLayout="vertical"
              size="small"
              dataSource={messageList}
              split={false}
              style={{
                backgroundColor: "white",
                padding: "10px",
              }}
              renderItem={(item) => (
                <div key={item.id}>
                  <p
                    style={{
                      textAlign: item.sender === "guest" ? "right" : "left",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor:
                          item.sender === "guest" ? "#0a7cff" : "#f0f2f7",
                        borderRadius: "15px",
                        padding: "5px",
                        fontSize: "14px",
                        color: item.sender === "guest" ? "white" : "black",
                        display: "inline-block",
                        marginBottom: "0px",
                        maxWidth: "100%",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.message}
                    </span>
                  </p>
                  <p
                    className="text-body-secondary"
                    style={{
                      fontSize: "11px",
                      textAlign: item.sender === "guest" ? "right" : "left",
                    }}
                  >
                    {item.createdAt}
                  </p>
                </div>
              )}
            />
          </div>
        </Modal>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {},
          components: {
            Modal: {
              contentBg: "lightblue",
              headerBg: "white",
              footerBg: "white",
              borderRadiusLG: "20px",
            },
          },
        }}
      >
        <Modal
          open={isTyping && !registeredUser ? true : false}
          onCancel={() => setIsTyping(false)}
          maskClosable={true}
          mask={false}
          width={400}
          style={{
            position: "fixed",
            top: "20%",
            right: "5%",
          }}
          footer={null}
        >
          <Space
            direction="vertical"
            size="large"
            align="center"
            style={{
              width: "100%",
              height: "69vh",
              backgroundColor: "white",
              borderRadius: "20px",
            }}
            className="d-flex justify-content-center"
          >
            <Card.Meta
              avatar={
                <Avatar.Group maxCount={1}>
                  <Avatar src="https://image.lag.vn/upload/news/23/03/02/one-piece-oda-tiet-lo-gia-dinh-cua-zoro-2_SLFW.jpg" />
                  <Avatar src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/luffy-gear-6.jpg" />
                  <Avatar src="https://topnlist.com/wp-content/uploads/2021/09/Sanji.jpg" />
                </Avatar.Group>
              }
            />
            <Typography.Title
              style={{
                fontSize: "16px",
                textAlign: "center",
                width: "250px",
              }}
            >
              Bạn có thể để lại thông tin cá nhân, chúng tôi sẽ liên hệ sớm. Xin
              cảm ơn.
            </Typography.Title>
            <Form
              autoComplete="off"
              style={{ maxWidth: 600 }}
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 18,
              }}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên của bạn!",
                  },
                  {
                    type: "name",
                    message: "Tên không hợp lệ!",
                  },
                ]}
              >
                <Input allowClear size="middle" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email của bạn!",
                  },
                  {
                    type: "email",
                    message: "Địa chỉ email không hợp lệ!",
                  },
                ]}
              >
                <Input allowClear size="middle" />
              </Form.Item>
              <Form.Item
                label="Telephone"
                name="telephone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập SĐT của bạn!",
                  },
                ]}
              >
                <InputNumber
                  allowClear
                  size="middle"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 9,
                  span: 16,
                }}
              >
                <Button
                  style={{ marginTop: "10px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default FloatButtonComponent;
