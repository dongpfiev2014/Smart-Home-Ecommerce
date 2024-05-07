import { Button, Card, Layout } from "antd";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";

const PaymentComponent = () => {
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
        <Card
          bordered={true}
          type="inner"
          title={
            <>
              <span
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              >
                {t("Credit / Debit Card")}
              </span>
            </>
          }
          extra={
            <Button type="primary" danger>
              {t("Add New Card")}
            </Button>
          }
          style={{
            height: "30vh",
            backgroundColor: mode ? "#000c17" : "white",
            color: mode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.88)",
          }}
        >
          {t("You don't have cards yet")}
        </Card>
        <Card
          bordered={true}
          type="inner"
          title={
            <>
              <span
                style={{
                  color: mode
                    ? "rgba(255, 255, 255, 0.65)"
                    : "rgba(0, 0, 0, 0.88)",
                }}
              >
                {t("My Bank Accounts")}
              </span>
            </>
          }
          extra={
            <Button type="primary" danger>
              {t("Add New Bank Account")}
            </Button>
          }
          style={{
            height: "30vh",
            backgroundColor: mode ? "#000c17" : "white",
            color: mode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.88)",
          }}
        >
          {t("You don't have bank accounts yet")}
        </Card>
      </Layout>
    </>
  );
};

export default PaymentComponent;
