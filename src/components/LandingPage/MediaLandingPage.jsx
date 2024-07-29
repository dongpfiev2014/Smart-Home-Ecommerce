import React from "react";
import { Image, Space, Flex, Button, Grid } from "antd";

const MediaLandingPage = (props) => {
  const { src, title, content } = props;
  const screens = Grid.useBreakpoint();
  return (
    <>
      <div
        className="position-relative d-flex justify-content-center"
        style={{
          height: screens.lg ? "60vh" : "auto",
          width: "100%",
          padding: "10px",
          // backgroundColor: "beige",
        }}
      >
        <Image src={src} width="100%" height="100%" preview={false} />
        <div className="position-absolute top-0 start-50 translate-middle-x d-flex flex-column justify-content-center align-items-center text-white">
          <Space direction="vertical" align="center" size="middle">
            <h1 style={{ fontSize: "60px" }}>{title}</h1>
            <p style={{ fontSize: "20px" }}>{content}</p>
            <Flex gap="middle" align="center" justify="center">
              <Button
                shape="round"
                size={screens.lg ? "large" : "small"}
                type="primary"
                style={{ fontFamily: '"Roboto Flex", sans-serif' }}
              >
                Learn More
              </Button>
              <Button
                shape="round"
                size={screens.lg ? "large" : "small"}
                className={screens.lg ? "custom-button" : ""}
                style={{ fontFamily: '"Roboto Flex", sans-serif' }}
              >
                Buy now
              </Button>
            </Flex>
          </Space>
        </div>
      </div>
    </>
  );
};

export default MediaLandingPage;
