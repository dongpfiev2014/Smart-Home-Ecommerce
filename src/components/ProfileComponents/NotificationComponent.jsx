import { Card, Checkbox, Layout, List } from "antd";
import { t } from "i18next";
import React from "react";
import { useSelector } from "react-redux";

const NotificationComponent = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const getColor = (mode) =>
    mode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.88)";

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
          title={
            <>
              <span
                style={{
                  color: getColor(mode),
                }}
              >
                {t("Email Notifications")}
              </span>
            </>
          }
          style={{
            backgroundColor: mode ? "#000c17" : "white",
          }}
        >
          <List>
            <List.Item
              actions={[
                <Checkbox
                  checked
                  style={{
                    color: getColor(mode),
                  }}
                >
                  {t("Enable")}
                </Checkbox>,
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Email Notifications")}
                    </span>
                  </>
                }
                description={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Email Notifications")}
                    </span>
                  </>
                }
              />
            </List.Item>
            <List.Item
              actions={[
                <Checkbox
                  checked
                  style={{
                    color: getColor(mode),
                  }}
                >
                  {t("Enable")}
                </Checkbox>,
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Order Updates")}
                    </span>
                  </>
                }
                description={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Order Updates 2")}
                    </span>
                  </>
                }
              />
            </List.Item>
            <List.Item
              actions={[
                <Checkbox
                  checked
                  style={{
                    color: getColor(mode),
                  }}
                >
                  {t("Enable")}
                </Checkbox>,
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Listing Updates")}
                    </span>
                  </>
                }
                description={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Listing Updates 2")}
                    </span>
                  </>
                }
              />
            </List.Item>
            <List.Item
              actions={[
                <Checkbox
                  checked
                  style={{
                    color: getColor(mode),
                  }}
                >
                  {t("Enable")}
                </Checkbox>,
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Promotions")}
                    </span>
                  </>
                }
                description={
                  <>
                    <span style={{ color: getColor(mode) }}>
                      {t("Promotions 2")}
                    </span>
                  </>
                }
              />
            </List.Item>
          </List>
        </Card>
      </Layout>
    </>
  );
};

export default NotificationComponent;
