import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Image,
  Alert,
  ConfigProvider,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../styles/GlobalStyles.css";
import { useDispatch } from "react-redux";
import { login } from "../Redux-reducer/auth";
import Logo from "../photos/vecteezy_smart-home-logo-icon-template_20040705.svg";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = () => {
    setShowError(false);
    dispatch(login({ username, password })).then((action) => {
      if (action.payload !== undefined) {
        localStorage.setItem("accessToken", action.payload.token);
        navigate("/");
        setShowError(false);
      } else setShowError(true);
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh", backgroundColor: "#eceff1" }}
    >
      <div
        style={{
          maxWidth: "400px",

          width: "100%",
          padding: "20px",
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                marginLG: 12,
              },
            },
          }}
        >
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item className="d-flex justify-content-center">
              <Image src={Logo} width={100} preview={false} />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                allowClear
                size="middle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                size="middle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link style={{ float: "right" }} to={""}>
                Forgot password
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Log in
              </Button>
              <Link
                to={"/accounts/signup"}
                style={{ float: "right", marginLeft: "5px" }}
              >
                Register now!
              </Link>
              <span style={{ float: "right" }}>or</span>
            </Form.Item>
            <Form.Item className="d-flex justify-content-center align-items-center text-secondary">
              <span>You can sign in with </span>

              <div>
                <div>Username: user1001</div>
                <div>Password: Password123@</div>
              </div>
            </Form.Item>
          </Form>
        </ConfigProvider>
        {showError && (
          <Alert
            message="Error"
            description="Invalid credentials"
            type="error"
            showIcon
            closable
            onClose={() => setShowError(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
