import React from "react";
import { Button, notification } from "antd";
import { BorderTopOutlined } from "@ant-design/icons";

const ConfirmedSignupForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Subscription Successful `,
      description:
        "Thank you for subscribing! Stay tuned for our latest updates and exclusive offers.",
      placement,
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => openNotification("top")}
        icon={<BorderTopOutlined />}
      >
        SUBSCRIBE
      </Button>
    </>
  );
};

export default ConfirmedSignupForm;
