import React from "react";
import {
  Button,
  Divider,
  Flex,
  Layout,
  Space,
  Card,
  Avatar,
  Row,
  Col,
} from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Logo from "../photos/vecteezy_smart-home-logo-icon-template_20040705.svg";

const FooterComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <>
      <Layout
        style={{
          backgroundColor: mode ? "#001529" : "#f5f5f5",
          color: mode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.88)",
          position: "relative",
        }}
      >
        <Flex justify="center" align="center" vertical>
          <Flex justify="center" align="center" gap={200}>
            <Card
              style={{
                border: "none",
                backgroundColor: mode ? "#001529" : "#f5f5f5",
                width: "400px",
              }}
            >
              <Card.Meta
                avatar={<Avatar src={Logo} />}
                title={
                  <span
                    style={{
                      color: mode
                        ? "rgba(255, 255, 255, 0.65)"
                        : "rgba(0, 0, 0, 0.88)",
                    }}
                  >
                    {t("smart home")}
                  </span>
                }
                description={
                  <span
                    style={{
                      color: mode
                        ? "rgba(255, 255, 255, 0.65)"
                        : "rgba(0, 0, 0, 0.88)",
                    }}
                  >
                    {t("description")}
                  </span>
                }
              />
            </Card>
            <Row
              gutter={[14, 14]}
              style={{
                width: "350px",
                color: mode
                  ? "rgba(255, 255, 255, 0.65)"
                  : "rgba(0, 0, 0, 0.88)",
              }}
            >
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/products/all")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("shop")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/about/vtd")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("about")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/livedemo")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("live demo")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/projects/all")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("projects")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/news/all")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("news")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/PrivacyPolicy")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("privacy policy")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/contact/service")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("service")}
                </Button>
              </Col>

              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/Documentation")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("documentation")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  onClick={() => navigate("/Terms&Conditions")}
                  style={{
                    color: mode
                      ? "rgba(255, 255, 255, 0.65)"
                      : "rgba(0, 0, 0, 0.88)",
                  }}
                >
                  {t("terms & conditions")}
                </Button>
              </Col>
            </Row>
          </Flex>
          <Divider
            orientation="center"
            style={{
              backgroundColor: mode ? "rgba(255, 255, 255, 0.65)" : "#e0d2d2",
            }}
          />
          <Flex align="center" gap={350}>
            <span>Copyright © 2024. All right reserved</span>
            <Space size="small">
              <Button
                type="link"
                icon={<InstagramOutlined />}
                size="middle"
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              />
              <Button
                type="link"
                icon={<FacebookOutlined />}
                size="middle"
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              />
              <Button
                type="link"
                icon={<TwitterOutlined />}
                size="middle"
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              />
              <Button
                type="link"
                icon={<YoutubeOutlined />}
                size="middle"
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              />
            </Space>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default FooterComponent;
