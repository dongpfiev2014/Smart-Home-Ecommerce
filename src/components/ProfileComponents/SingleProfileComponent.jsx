import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Radio,
  Row,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../../Redux-reducer/auth";
import moment from "moment";

const SingleProfileComponent = () => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.authen);
  const dispatch = useDispatch();
  const [editingEmail, setEditingEmail] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { mode } = useSelector((state) => state.darkMode);

  const onFinish = (value) => {
    const updatedUser = {
      ...auth.currentUser,
      ...value,
      dateOfBirth: dateOfBirth,
    };
    dispatch(updateUserProfile(updatedUser));
  };
  const onChangeDatePicker = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  const dateString = auth.currentUser.dateOfBirth;
  const dateFormat = "YYYY-MM-DD";
  const dateValue = moment(dateString, dateFormat);

  return (
    <>
      <Layout
        className="colorImportant"
        style={{
          backgroundColor: mode ? "#000c17" : "white",
          padding: "10px",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <Row>
          <Col>
            <Typography.Title
              level={5}
              style={{
                color: mode
                  ? "rgba(255, 255, 255, 0.65)"
                  : "rgba(0, 0, 0, 0.88)",
              }}
            >
              {t("my profile")}
            </Typography.Title>
            <Typography.Text
              style={{
                color: mode
                  ? "rgba(255, 255, 255, 0.65)"
                  : "rgba(0, 0, 0, 0.88)",
              }}
            >
              {t("Manage and protect your account")}
            </Typography.Text>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Row>
              <Col span={15}>
                <ConfigProvider
                  theme={{
                    components: {
                      Form: {
                        labelColor: mode
                          ? "rgba(255, 255, 255, 0.65)"
                          : "rgba(0, 0, 0, 0.88)",
                      },
                    },
                  }}
                >
                  <Form
                    layout="horizontal"
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    onFinish={onFinish}
                    initialValues={{
                      username: auth.currentUser.username,
                      email: auth.currentUser.email,
                      name: auth.currentUser.name,
                      address: auth.currentUser.address,
                      telephoneNumber: auth.currentUser.telephoneNumber,
                      gender: auth.currentUser.gender,
                      dateOfBirth: auth.currentUser.dateOfBirth,
                    }}
                  >
                    <Form.Item label={t("Username")} name="username">
                      <Input
                        value={auth.currentUser.username}
                        disabled
                        style={{
                          color: mode
                            ? "rgba(255, 255, 255, 0.65)"
                            : "rgba(0, 0, 0, 0.88)",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t("Name")}
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Username!",
                        },
                      ]}
                    >
                      <Input value={auth.currentUser.name} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      {editingEmail ? (
                        <span>
                          <Input defaultValue={auth.currentUser.email} />
                        </span>
                      ) : (
                        <>
                          <span
                            style={{
                              color: mode
                                ? "rgba(255, 255, 255, 0.65)"
                                : "rgba(0, 0, 0, 0.88)",
                            }}
                          >
                            {auth.currentUser.email}
                          </span>
                          <Link onClick={() => setEditingEmail(true)}>
                            {t("change")}
                          </Link>
                        </>
                      )}
                    </Form.Item>
                    <Form.Item
                      label={t("Address")}
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your telephone number!",
                        },
                      ]}
                    >
                      <Input value={auth.currentUser.address} />
                    </Form.Item>
                    <Form.Item
                      label={t("Telephone Number")}
                      name="telephoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your telephone number!",
                        },
                      ]}
                    >
                      <Input value={auth.currentUser.telephoneNumber} />
                    </Form.Item>
                    <Form.Item
                      label={t("Gender")}
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please input!",
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio
                          value="male"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        >
                          {t("Male")}
                        </Radio>
                        <Radio
                          value="female"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        >
                          {t("Female")}
                        </Radio>
                        <Radio
                          value="other"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        >
                          {t("Other")}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label={t("Date of birth")}
                      rules={[
                        {
                          required: true,
                          message: "Please input!",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={onChangeDatePicker}
                        defaultValue={dateValue}
                        format={dateFormat}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        {t("Save")}
                      </Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </Col>
              <Col span={1}>
                <Divider
                  type="vertical"
                  style={{
                    height: "100%",
                    backgroundColor: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(255, 255, 255, 0.65)",
                  }}
                />
              </Col>
              <Col span={8}>
                <Row justify="center" align="middle" style={{ height: "100%" }}>
                  <Flex vertical justify="center" align="center" gap="small">
                    <Image
                      src={auth.currentUser.image || auth.currentUser.avatar}
                      width={100}
                      preview={true}
                      style={{ cursor: "pointer" }}
                    />
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="avatar-uploader"
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    >
                      <span
                        style={{
                          color: mode
                            ? "rgba(255, 255, 255, 0.65)"
                            : "rgba(0, 0, 0, 0.88)",
                        }}
                      >
                        Upload Image
                      </span>
                    </Upload>
                  </Flex>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default SingleProfileComponent;
