import React, { useEffect, useState } from "react";
import { Form, Grid, Input, Modal, Space, Typography } from "antd";
import useLocalStorage from "use-local-storage";
import ConfirmedSignupForm from "./ConfirmedSignupForm";

const NewsletterSignupForm = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useLocalStorage(
    "hasVisitedBefore",
    false
  );
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    if (!hasVisitedBefore) {
      const timer = setTimeout(() => {
        setShowSignupForm(true);
        setHasVisitedBefore(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasVisitedBefore, setHasVisitedBefore]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHasVisitedBefore(false);
    }, 120000);

    return () => clearInterval(interval);
  }, [setHasVisitedBefore]);

  return (
    <Modal
      centered
      open={showSignupForm}
      onOk={() => setShowSignupForm(false)}
      onCancel={() => setShowSignupForm(false)}
      footer={null}
      width={screens.md ? 800 : 400}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%", overflow: "hidden" }}
      >
        <img
          src="https://www.vimar.com/cache/images/content-card-full/w1440h0q75/vimar-newsletter-66yklb9.webp"
          alt=""
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <Space direction="vertical" className="p-2" size="small" align="center">
          <Typography.Title
            style={{
              fontSize: "16px",
              textAlign: "center",
              width: "300px",
            }}
          >
            JOIN US
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: "16px",
              textAlign: "center",
              width: "300px",
            }}
          >
            SUBSCRIBE TO RECEIVE OUR OFFERS IN PREVIEW AND ENJ0IN 10% DISCOUNT
            ON YOUR FIRST ORDER
          </Typography.Paragraph>
          <Form>
            <Form.Item
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
              <Input
                allowClear
                size="middle"
                placeholder="YOUR EMAIL ADDRESS"
                style={{ width: "300px" }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <ConfirmedSignupForm />
            </Form.Item>
          </Form>
        </Space>
      </div>
    </Modal>
  );
};

export default NewsletterSignupForm;
