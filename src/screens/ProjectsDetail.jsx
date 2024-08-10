import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getIdProduct } from "../Redux-reducer/data";
import {
  Carousel,
  Col,
  Flex,
  Image,
  Row,
  Space,
  Button,
  Card,
  Typography,
  Rate,
  Divider,
  Input,
  InputNumber,
  Tabs,
  Form,
  Grid,
} from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { MdDesignServices } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";
import { MdOutlinePhonelinkSetup } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { GrHostMaintenance } from "react-icons/gr";

const ProjectsDetail = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const id = searchParams.get("id");
  const carouselRef = useRef(null);
  const [product, setProduct] = useState("");
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    if (id) {
      dispatch(getIdProduct(id)).then((action) => {
        if (action.payload) {
          setProduct(action.payload);
        }
      });
    }
  }, [dispatch, id]);

  const contentStyle = {
    width: "100%",
    height: screens.xs ? "250px" : "400px",
    borderRadius: "15px",
    objectFit: "cover",
    overflow: "hidden",
  };

  const contentStyle2 = {
    width: screens.xs ? "50px" : "100px",
    height: screens.xs ? "50px" : "100px",
    borderRadius: "10px",
    objectFit: "cover",
    overflow: "hidden",
    cursor: "pointer",
  };
  const handleThumbnailClick = (index) => {
    carouselRef.current.goTo(index, false);
  };

  const items = [
    {
      key: "1",
      label: "Nhận Xét",
      children: (
        <>
          <div className="container">
            <Row gutter={(15, 15)}>
              <Col span={screens.xs ? 12 : 18}>
                <h6>Hãy là người đầu tiên chia sẻ trải nghiệm của mình!</h6>
              </Col>
              <Col span={screens.xs ? 12 : 6}>
                <Flex justify="space-between">
                  <div>Đánh giá của bạn:</div>
                  <Rate />
                </Flex>
                <Divider />
                <Form
                  autoComplete="off"
                  style={{ maxWidth: 600 }}
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên của bạn!",
                      },
                      {
                        type: "name",
                        message: "Tên không hợp lệ!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" allowClear size="middle" />
                  </Form.Item>
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
                    <Input placeholder="Email" allowClear size="middle" />
                  </Form.Item>
                  <Form.Item
                    name="telephone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập SĐT của bạn!",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Telephone"
                      allowClear
                      size="middle"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 9,
                      span: 16,
                    }}
                  >
                    <Button
                      style={{ marginTop: "10px" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {product && (
        <>
          <Flex
            style={{
              backgroundColor: mode ? "#001529" : "white",
            }}
            justify="center"
            align="center"
          >
            <div
              className="container"
              style={{
                width: screens.xs ? "400px" : "1200px",
                height: "100%",
                backgroundColor: mode ? "#001529" : "white",
                padding: "10px",
                maxWidth: screens.xs ? "570px" : "100%",
              }}
            >
              <Row
                gutter={15}
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Flex vertical gap="small">
                    <Carousel ref={carouselRef}>
                      {product.images &&
                        product.images.map((imageUrl, index) => (
                          <>
                            <div
                              key={index}
                              className="d-flex justify-content-center"
                            >
                              <Image style={contentStyle} src={imageUrl} />
                            </div>
                          </>
                        ))}
                    </Carousel>
                    <Space
                      direction="horizontal"
                      size="small"
                      align="center"
                      className="justify-content-center"
                    >
                      {product.images &&
                        product.images.map((imageUrl, index) => (
                          <>
                            <div
                              key={index}
                              className="d-flex justify-content-center"
                            >
                              <Image
                                style={contentStyle2}
                                src={imageUrl}
                                preview={false}
                                onMouseEnter={() => handleThumbnailClick(index)}
                              />
                            </div>
                          </>
                        ))}
                    </Space>
                    <Flex justify="space-around">
                      <Space size="small">
                        <div className="fw-medium">Share: </div>
                        <Button
                          type="link"
                          icon={<InstagramOutlined />}
                          size="large"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        />
                        <Button
                          type="link"
                          icon={<FacebookOutlined />}
                          size="large"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        />
                        <Button
                          type="link"
                          icon={<TwitterOutlined />}
                          size="large"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        />
                        <Button
                          type="link"
                          icon={<YoutubeOutlined />}
                          size="large"
                          style={{
                            color: mode
                              ? "rgba(255, 255, 255, 0.65)"
                              : "rgba(0, 0, 0, 0.88)",
                          }}
                        />
                      </Space>
                      <Space>
                        <HeartOutlined />
                        <div className="fw-medium">Favorite: 122 </div>
                      </Space>
                    </Flex>
                  </Flex>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Flex vertical gap={screens.lg ? 100 : 20}>
                    <Space direction="vertical">
                      <Card bordered={false}>
                        <Typography.Title
                          level={4}
                          style={{ color: "#0070af" }}
                        >
                          {product.title}
                        </Typography.Title>
                        <Flex justify="space-between">
                          <Space>
                            <Rate
                              disabled
                              defaultValue={4}
                              style={{ fontSize: "14px" }}
                            />
                          </Space>
                          <div>Report</div>
                        </Flex>
                      </Card>
                      <div
                        className="CKeditor"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></div>
                    </Space>
                  </Flex>
                  <Space style={{ width: "100%" }}>
                    <Button type="primary" size="middle" block>
                      Gọi ngay 1900 0299
                    </Button>
                    <Button type="primary" size="middle" block>
                      Yêu cầu tư vấn Miễn Phí
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row
                gutter={5}
                style={
                  screens.xs && {
                    maxWidth: "570px",
                    width: "370px",
                    margin: "0 auto",
                  }
                }
              >
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<MdDesignServices />}
                  >
                    Miễn phí Thiết Kế
                  </Button>
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<MdInstallMobile />}
                  >
                    Miễn phí Lắp Đặt
                  </Button>
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<MdOutlinePhonelinkSetup />}
                  >
                    Miễn phí Cài Đặt
                  </Button>
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<MdOutlineSupportAgent />}
                  >
                    Hướng dẫn Sử dụng
                  </Button>
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<GrServices />}
                  >
                    Bảo hành 2 năm
                  </Button>
                </Col>
                <Col xs={12} sm={8} md={8} lg={8} xl={4} span={4}>
                  <Button
                    block
                    size="large"
                    type="dashed"
                    style={{ color: "#5a5a5a" }}
                    icon={<GrHostMaintenance />}
                  >
                    Bảo trì 24/7
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row
                style={
                  screens.xs && {
                    maxWidth: "570px",
                    width: "370px",
                    margin: "0 auto",
                  }
                }
              >
                <Col xs={24} sm={24}>
                  <Tabs
                    items={items}
                    type="card"
                    size="large"
                    tabBarGutter={5}
                    centered
                  />
                </Col>
              </Row>
            </div>
          </Flex>
        </>
      )}
    </>
  );
};

export default ProjectsDetail;
