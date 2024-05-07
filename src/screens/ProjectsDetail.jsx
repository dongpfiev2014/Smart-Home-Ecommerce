import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  message,
} from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
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
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);
  const [product, setProduct] = useState("");
  // const auth = useSelector((state) => state.authen);
  // const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getIdProduct(id)).then((action) => {
        if (action.payload) {
          setProduct(action.payload);
        }
      });
    }
  }, [id]);

  const contentStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    objectFit: "cover",
    overflow: "hidden",
  };

  const contentStyle2 = {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
    overflow: "hidden",
    cursor: "pointer",
  };

  const handleAfterChange = (current) => {
    setCurrentImage(current);
  };
  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
    carouselRef.current.goTo(index, false);
  };

  const items = [
    {
      key: "1",
      label: "Nhận Xét",
      children: (
        <>
          <div className="container">
            <Row>
              <Col span={18}>
                <h6>Hãy là người đầu tiên chia sẻ trải nghiệm của mình!</h6>
              </Col>
              <Col span={6}>
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
                width: "1200px",
                height: "100%",
                backgroundColor: mode ? "#001529" : "white",
                padding: "10px",
              }}
            >
              <Row gutter={25} style={{ padding: "5px" }}>
                <Col span={12}>
                  <Flex vertical gap="small">
                    <Carousel afterChange={handleAfterChange} ref={carouselRef}>
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
                <Col
                  span={12}
                  className="d-flex flex-column justify-content-between"
                >
                  <Flex vertical gap={100}>
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
                    <Button type="primary" size="large" block>
                      Gọi ngay 1900 0299
                    </Button>
                    <Button type="primary" size="large" block>
                      Yêu cầu tư vấn Miễn Phí
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row gutter={5}>
                <Col span={4}>
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
                <Col span={4}>
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
                <Col span={4}>
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
                <Col span={4}>
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
                <Col span={4}>
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
                <Col span={4}>
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
              <Row>
                <Col span={24}>
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
