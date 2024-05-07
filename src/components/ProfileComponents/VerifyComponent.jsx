import { Button, Flex, Layout, Space, Typography } from "antd";
import { t } from "i18next";
import React from "react";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { IoLockClosedSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const VerifyComponent = () => {
  const { mode } = useSelector((state) => state.darkMode);
  return (
    <>
      <Layout
        style={{
          backgroundColor: mode ? "#000c17" : "white",
          padding: "10px",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <Flex
          vertical
          justify="center"
          align="center"
          gap="small"
          style={{ height: "100%" }}
        >
          <RiShieldKeyholeFill
            size="6em"
            style={{ color: mode ? "beige" : "rgba(0, 0, 0, 0.88)" }}
          />
          <Typography.Paragraph
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: mode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.88)",
            }}
          >
            {t("Verify Password")}
          </Typography.Paragraph>
          <Button style={{ backgroundColor: mode ? "beige" : "white" }}>
            <Space>
              <IoLockClosedSharp size="1em" />
              <span>{t("Verify by Password")}</span>
            </Space>
          </Button>
        </Flex>
      </Layout>
    </>
  );
};

export default VerifyComponent;
