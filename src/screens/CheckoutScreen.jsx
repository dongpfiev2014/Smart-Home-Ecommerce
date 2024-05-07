import {
  Button,
  Card,
  Divider,
  Flex,
  Row,
  Space,
  Typography,
  Image,
  Table,
  Col,
  Input,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { addToCart } from "../Redux-reducer/auth";

const currentDate = moment();
const deliveryDate = moment(currentDate).add(2, "days").format("DD-MM-YYYY");
const min = 5000;
const max = 35000;

const columns = [
  {
    title: (
      <>
        <Typography.Title level={4}>Products Ordered</Typography.Title>
      </>
    ),

    dataIndex: "title",
  },
  {
    title: (
      <>
        <Typography.Text type="secondary">Unit Price</Typography.Text>
      </>
    ),
    dataIndex: "price",
  },
  {
    title: (
      <>
        <Typography.Text type="secondary">Amount</Typography.Text>
      </>
    ),

    dataIndex: "amount",
  },
  {
    title: (
      <>
        <Typography.Text type="secondary">Item Subtotal</Typography.Text>
      </>
    ),
    dataIndex: "totalPrice",
  },
];

const tabList = [
  {
    key: "credit",
    tab: "Credit Card/Debit Card",
  },
  {
    key: "cash",
    tab: "Cash on Delivery",
  },
];

const contentList = {
  credit: (
    <>
      <Space>
        <Typography.Title level={5} type="normal">
          Select payment account:
        </Typography.Title>
        <Button>+ Pay With New Card</Button>
      </Space>
    </>
  ),
  cash: (
    <>
      <Space align="baseline">
        <Typography.Title level={5} type="normal">
          Cash on Delivery:
        </Typography.Title>
        <Typography.Paragraph>
          You will be charged extra 0₫ for this payment method.
        </Typography.Paragraph>
      </Space>
    </>
  ),
};

const CheckoutScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const auth = useSelector((state) => state.authen);
  const { product, ...rest } = (auth && auth.currentUser) || {};
  const selectedRowKeys = useSelector((state) => state.selectedRowKeys);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(0);
  const [randomPrices, setRandomPrices] = useState([]);
  const dataSource = product.filter((item) =>
    selectedRowKeys.includes(item.id)
  );

  const generateRandomPrices = () => {
    const prices = [];
    for (let i = 0; i < dataSource.length; i++) {
      const price = Math.floor(Math.random() * (max - min + 1)) + min;
      prices.push(price);
    }
    setRandomPrices(prices);
  };

  // Gọi hàm khi component được render
  useEffect(() => {
    generateRandomPrices();
  }, []);

  const totalShipping = randomPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  useEffect(() => {
    if (auth && auth.currentUser && Array.isArray(auth.currentUser.product)) {
      const updatedCart = auth.currentUser.product.filter((item) =>
        selectedRowKeys.includes(item.id)
      );
      const totalCost = updatedCart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      );
      setTotalCost(totalCost);
    } else setTotalCost(0);
  }, [selectedRowKeys]);

  const data = dataSource.map((item, index) => ({
    key: item.id,
    title: (
      <>
        <Space size="middle">
          <Image
            preview={false}
            width={50}
            alt="logo"
            src={item.images[0]}
            style={{
              height: "100%",
              borderRadius: "5px",
              objectFit: "cover",
              overflow: "hidden",
            }}
          />
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: false }}
            className="fw-medium"
            style={{ maxWidth: "300px" }}
          >
            {item.title}
          </Typography.Paragraph>
        </Space>
      </>
    ),
    price: (
      <>
        <Typography.Text>{`${item.price.toLocaleString()}đ`}</Typography.Text>
      </>
    ),
    amount: <>{item.amount}</>,
    totalPrice: (
      <Typography.Text type="normal">
        {`${(item.price * item.amount).toLocaleString()}đ`}
      </Typography.Text>
    ),
    description: (
      <>
        <Row>
          <Col span={12}>
            <Space>
              <Typography.Text>Message for Sellers:</Typography.Text>
              <Input allowClear style={{ width: "300px" }} />
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Flex gap={50} align="flex-start">
                <Typography.Text>Shipping Option:</Typography.Text>
                <Space direction="vertical">
                  <Select
                    defaultValue="Express delivery"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    options={[
                      {
                        label: "Express delivery",
                        value: "express",
                      },
                      {
                        label: "Same-day delivery",
                        value: "sameday",
                      },
                    ]}
                  />
                  <Typography.Text style={{ color: "#26aa99" }}>
                    Guaranteed to get by {deliveryDate}
                  </Typography.Text>
                </Space>
                <Typography.Text>
                  {randomPrices[index] &&
                    `${randomPrices[index].toLocaleString()}đ`}
                </Typography.Text>
              </Flex>
              <Typography.Text>Order is eligible for co-check.</Typography.Text>
            </Space>
          </Col>
        </Row>
      </>
    ),
  }));

  const [activeTabKey, setActiveTabKey] = useState("tab");
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handlePlaceOrder = () => {
    const updatedCart = [...auth.currentUser.product];
    const updatedUser = {
      ...rest,
      product: updatedCart.filter((item) => !selectedRowKeys.includes(item.id)),
      myPurchase: Array.isArray(rest.myPurchase)
        ? [
            ...rest.myPurchase,
            ...dataSource.map((product) => ({
              ...product,
              orderStatus: "toShip",
            })),
          ]
        : [
            ...dataSource.map((product) => ({
              ...product,
              orderStatus: "toShip",
            })),
          ],
    };
    dispatch(addToCart(updatedUser)).then((action) => {
      if (action.payload) {
        navigate("/accounts/purchase");
      }
    });
  };
  return (
    <>
      {auth && auth.currentUser && (
        <Flex
          style={{
            backgroundColor: mode ? "#001529" : "white",
            padding: "10px",
          }}
          justify="center"
          align="center"
        >
          <Row
            style={{
              width: "1200px",
              minHeight: "80vh",
              backgroundColor: mode ? "#001529" : "white",
            }}
          >
            <Flex vertical style={{ width: "100%" }} gap={10}>
              <Divider
                style={{
                  width: "100%",
                  height: "2px",
                  border: "none",
                  backgroundImage:
                    "linear-gradient(to right, #FB6F92 50%, #0073CF 50%)",
                  backgroundSize: "150px 100%", // Độ rộng và chiều cao của mỗi vết đứt
                }}
              />
              <Card
                bordered={true}
                title={
                  <Typography.Title level={4} type="danger">
                    Delivery Address
                  </Typography.Title>
                }
                style={{ width: "100%" }}
              >
                <Space size="large">
                  <Typography.Text strong>
                    {auth.currentUser.name}
                    {` `}
                    {auth.currentUser.telephoneNumber}
                  </Typography.Text>
                  <Typography.Text>{auth.currentUser.address}</Typography.Text>
                  <Button
                    type="link"
                    onClick={() => navigate("/accounts/profile")}
                  >
                    Change
                  </Button>
                </Space>
              </Card>

              <Table
                rowHoverable
                style={{ width: "100%" }}
                columns={columns}
                dataSource={data}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <div>{record.description}</div>
                  ),
                  rowExpandable: (record) => record.description !== undefined,
                  expandIcon: () => null,
                }}
                defaultExpandAllRows
              />

              <Card
                style={{
                  width: "100%",
                }}
                title={
                  <>
                    <Typography.Title level={4} type="danger">
                      Payment Method
                    </Typography.Title>
                  </>
                }
                tabList={tabList}
                onTabChange={onTabChange}
                tabProps={{
                  size: "middle",
                  type: "card",
                  centered: "true",
                }}
              >
                {contentList[activeTabKey]}
              </Card>
              <Card
                style={{
                  width: "100%",
                }}
              >
                <Space direction="vertical" size={0} style={{ width: "100%" }}>
                  <Flex justify="center" align="flex-end" vertical>
                    <Flex justify="space-between" style={{ width: "300px" }}>
                      <Typography.Text type="secondary">
                        Merchandise Subtotal:
                      </Typography.Text>
                      <Typography.Text>
                        {`${totalCost.toLocaleString()}đ`}
                      </Typography.Text>
                    </Flex>
                    <Flex justify="space-between" style={{ width: "300px" }}>
                      <Typography.Text type="secondary">
                        Shipping Total:
                      </Typography.Text>
                      <Typography.Text>{`${totalShipping.toLocaleString()}đ`}</Typography.Text>
                    </Flex>
                    <Flex justify="space-between" style={{ width: "300px" }}>
                      <Typography.Text type="secondary">
                        Total Payment:
                      </Typography.Text>
                      <Typography.Text
                        type="danger"
                        strong
                        style={{ fontSize: "18px" }}
                      >{`${(
                        totalCost + totalShipping
                      ).toLocaleString()}đ`}</Typography.Text>
                    </Flex>
                  </Flex>
                  <Divider
                    style={{
                      width: "100%",
                      height: "2px",
                      border: "none",
                      backgroundImage:
                        "linear-gradient(to right, pink 50%, lightblue 50%)",
                      backgroundSize: "150px 100%", // Độ rộng và chiều cao của mỗi vết đứt
                    }}
                  />
                  <Flex justify="space-between" align="center">
                    <div>
                      By clicking 'Place Order', you are agreeing to our Terms
                      of Service
                    </div>
                    <Button
                      danger
                      type="primary"
                      style={{ fontSize: "15px", width: "150px" }}
                      onClick={() =>
                        activeTabKey === "cash" && handlePlaceOrder()
                      }
                    >
                      Place Order
                    </Button>
                  </Flex>
                </Space>
              </Card>
            </Flex>
          </Row>
        </Flex>
      )}
    </>
  );
};

export default CheckoutScreen;
