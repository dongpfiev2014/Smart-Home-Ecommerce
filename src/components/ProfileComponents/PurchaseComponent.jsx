import {
  Badge,
  Col,
  Layout,
  List,
  Row,
  Tabs,
  Image,
  Button,
  Typography,
  Space,
  Divider,
  Flex,
  Modal,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { updateUserProfile } from "../../Redux-reducer/auth";

const PurchaseComponent = () => {
  const auth = useSelector((state) => state.authen);
  const { mode } = useSelector((state) => state.darkMode);
  const { myPurchase, ...rest } = (auth && auth.currentUser) || {};
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState("");

  const onChange = (key) => {
    setTabKey(key);
  };

  const renderOrderItems = (data) => (
    <>
      <List
        // loading={isLoading}
        itemLayout="vertical"
        pagination={{
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            actions={[
              <>
                <Button
                  danger
                  type="primary"
                  size="middle"
                  onClick={() =>
                    Modal.confirm({
                      title: "Cancel Order",
                      icon: <ExclamationCircleOutlined />,
                      content: "Are you sure to cancel this order?",
                      okText: "Yes",
                      cancelText: "No",
                      onOk() {
                        handleCancelOrder(item.id);
                      },
                      onCancel() {},
                    })
                  }
                >
                  Cancel Order
                </Button>
              </>,
            ]}
            extra={[
              <>
                <Space split={<Divider type="vertical" />}>
                  <Typography.Text type="success">
                    {item.orderStatus === "toShip" &&
                      `Seller is preparing the order`}
                  </Typography.Text>
                  <Typography.Text type="danger">
                    {item.orderStatus.toUpperCase().replace("TO", "TO ").trim()}
                  </Typography.Text>
                </Space>
              </>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image
                  preview={false}
                  width={150}
                  alt="logo"
                  src={item.images[0]}
                  style={{
                    height: "100%",
                    borderRadius: "5px",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                />
              }
              title={item.title}
              description={
                <>
                  <Flex justify="flex-start" gap={30}>
                    <div>x{item.amount}</div>
                    <Space>
                      <Typography.Text
                        style={{
                          textDecoration: "line-through",
                          color: "grey",
                        }}
                      >
                        {`${parseInt(
                          item.price * (Math.random() + 1)
                        ).toLocaleString()}đ`}
                      </Typography.Text>
                      <Typography.Text type="danger">
                        {`${item.price.toLocaleString()}đ`}
                      </Typography.Text>
                    </Space>
                  </Flex>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
  const handleCancelOrder = (id) => {
    const newMyPurchase = myPurchase.map((item) => {
      if (item.id === id) {
        return { ...item, orderStatus: "cancelled" };
      }
      return item;
    });
    const updatedUser = { ...rest, myPurchase: newMyPurchase };
    dispatch(updateUserProfile(updatedUser));
  };

  const items = [
    {
      key: "all",
      label: (
        <>
          <Badge count={myPurchase && myPurchase.length} size="small">
            <Typography.Text
              className={tabKey === "all" ? "text-primary" : "none"}
            >
              All
            </Typography.Text>
          </Badge>
        </>
      ),
      children: renderOrderItems(myPurchase),
    },
    {
      key: "toPay",
      label: "To Pay",
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "toPay")
      ),
    },
    {
      key: "toShip",
      label: (
        <>
          <Badge
            count={
              myPurchase &&
              myPurchase.filter((element) => element.orderStatus === "toShip")
                .length
            }
            size="small"
          >
            <Typography.Text
              className={tabKey === "toShip" ? "text-primary" : "none"}
            >
              To Ship
            </Typography.Text>
          </Badge>
        </>
      ),
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "toShip")
      ),
    },
    {
      key: "toReceive",
      label: "To Receive",
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "toReceive")
      ),
    },
    {
      key: "completed",
      label: "Completed",
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "completed")
      ),
    },
    {
      key: "cancelled",
      label: (
        <>
          <Badge
            count={
              myPurchase &&
              myPurchase.filter(
                (element) => element.orderStatus === "cancelled"
              ).length
            }
            size="small"
          >
            <Typography.Text
              className={tabKey === "cancelled" ? "text-primary" : "none"}
            >
              Cancelled
            </Typography.Text>
          </Badge>
        </>
      ),
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "cancelled")
      ),
    },
    {
      key: "returnRefund",
      label: "Return/Refund",
      children: renderOrderItems(
        myPurchase &&
          myPurchase.filter((element) => element.orderStatus === "returnRefund")
      ),
    },
  ];

  return (
    <>
      {auth && auth.currentUser && (
        <Layout
          className="colorImportant"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: mode ? "#000c17" : "white",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <Row style={{ width: "100%", backgroundColor: "white" }}>
            <Col span={24}>
              <Tabs
                items={items}
                onChange={onChange}
                type="card"
                size="middle"
                tabBarGutter={5}
                centered
              />
            </Col>
          </Row>
        </Layout>
      )}
    </>
  );
};

export default PurchaseComponent;
