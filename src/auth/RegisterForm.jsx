import React, { useState } from "react";
import { Button, Form, Input, Image, Alert, ConfigProvider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../styles/GlobalStyles.css";
import { useDispatch } from "react-redux";
import { register } from "../Redux-reducer/auth";
import Logo from "../photos/vecteezy_smart-home-logo-icon-template_20040705.svg";
import { PasswordPatternRules } from "../lib/constant";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = () => {
    setShowError(false);
    if (password === confirmPassword) {
      dispatch(register({ username, password, email })).then((action) => {
        if (action.payload !== undefined && action.payload.type !== "error") {
          localStorage.setItem("accessToken", action.payload.token);
          navigate("/");
          setShowError(false);
        } else {
          setShowError(true);
        }
      });
    } else {
      setShowError(true);
    }
  };

  // Định nghĩa URL của API endpoint
  // const API_URL = "https://6623cafa3e17a3ac8470401a.mockapi.io/api/users";

  // const getAPI = async () => {
  //   axios
  //     .get(API_URL)
  //     .then((response) => {
  //       console.log("Dữ liệu từ API:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi gửi yêu cầu:", error);
  //     });
  // };

  // const postAPI = async () => {
  //   const userData = {
  //     username: "example",
  //     email: "example@example.com",
  //     password: "password",
  //   };
  //   axios
  //     .post(API_URL, userData)
  //     .then((response) => {
  //       console.log("Dữ liệu từ API:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi gửi yêu cầu:", error);
  //     });
  // };

  // useEffect(() => {
  //   submit();
  // }, []);

  // const submit = async () => {
  //   try {
  //     const reqBody = {
  //       username: "kminchelle",
  //       password: "0lelplR",
  //     };
  //     const response = await axios.post(
  //       "https://dummyjson.com/auth/login",
  //       reqBody
  //     );
  //     if (response) {
  //       console.log(response.data);
  //     }
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //   }
  // };

  // const deleteUser = async (userId) => {
  //   try {
  //     const response = await axios.delete(`${API_URL}/${userId}`);
  //     console.log(response);
  //     if (response.status === 200) {
  //       console.log("Đã xóa người dùng thành công.");
  //     } else {
  //       console.error("Lỗi khi gửi yêu cầu:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu:", error);
  //   }
  // };

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
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={PasswordPatternRules}
              validateFirst
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                size="middle"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={PasswordPatternRules}
              validateFirst
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                size="middle"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="E-mail Address"
                allowClear
                size="middle"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Sign Up
              </Button>
            </Form.Item>

            <Form.Item className="d-flex justify-content-center align-items-center text-secondary">
              <span>Have an acount? </span>
              <Link to={"/accounts/login"}>Sign In</Link>
            </Form.Item>
          </Form>
        </ConfigProvider>
        {showError && (
          <Alert
            message="Error"
            description="Passwords do not match or Username/Email already exists ."
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

export default RegisterForm;
