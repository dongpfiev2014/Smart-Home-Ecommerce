import React, { useRef, useState } from "react";
import smartHome from "../../assets/smartHome.mp4";
import { Space, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const VideoLandingPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [checkingPauseVideo, setCheckingPauseVideo] = useState(false);
  const handleClick = () => {
    if (videoRef.current) {
      if (!checkingPauseVideo) {
        videoRef.current.pause();
        setCheckingPauseVideo(true);
      } else {
        videoRef.current.play();
        setCheckingPauseVideo(false);
      }
    }
  };
  return (
    <>
      <div className="position-relative" style={{ height: "90vh" }}>
        <div className="overlay"></div>
        <video
          ref={videoRef}
          className="w-100 h-100"
          src={smartHome}
          autoPlay
          loop
          muted
          onClick={() => navigate("/products/all")}
          style={{ cursor: "pointer" }}
        />
        <Button
          className="position-absolute bottom-0 start-0 mb-4"
          icon={
            checkingPauseVideo === true ? (
              <PlayCircleOutlined
                style={{
                  color: "gray",
                  fontSize: "40px",
                  marginLeft: "20px",
                }}
              />
            ) : (
              <PauseCircleOutlined
                style={{ color: "gray", fontSize: "40px", marginLeft: "20px" }}
              />
            )
          }
          shape="circle"
          size="large"
          onClick={handleClick}
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}
        />
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 d-flex flex-column justify-content-center align-items-center text-white">
          <Space direction="vertical" align="center" size="middle">
            <h1
              style={{
                fontSize: "60px",
                fontFamily: '"Roboto Flex", sans-serif',
              }}
            >
              Eikon Exé
            </h1>
            <p
              style={{
                fontSize: "28px",
                fontFamily: '"Roboto Flex", sans-serif',
              }}
            >
              You're never seen everything like this before
            </p>
            <Flex gap="middle" align="center" justify="center">
              <Button
                shape="round"
                size="large"
                style={{ fontFamily: '"Roboto Flex", sans-serif' }}
              >
                Learn More
              </Button>
              <Button
                shape="round"
                size="large"
                className="custom-button"
                style={{ fontFamily: '"Roboto Flex", sans-serif' }}
              >
                Shop now
              </Button>
            </Flex>
          </Space>
        </div>
      </div>
    </>
  );
};

export default VideoLandingPage;
