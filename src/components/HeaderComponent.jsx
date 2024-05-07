import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  Image,
  Input,
  Layout,
  Space,
  Flex,
  Switch,
  Dropdown,
  Button,
  Badge,
  Card,
  ConfigProvider,
  Avatar,
  List,
  Popconfirm,
  InputNumber,
  Modal,
} from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { PiShoppingCartLight } from "react-icons/pi";
import { toggleDarkMode } from "../Redux-reducer/darkModeSlice";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";
import { addToCart, logout } from "../Redux-reducer/auth";
import Logo from "../photos/vecteezy_smart-home-logo-icon-template_20040705.svg";
import Typography from "antd/es/typography/Typography";
import { BsTrash } from "react-icons/bs";
import { setSearchValue } from "../Redux-reducer/search";

const HeaderComponent = () => {
  const [current, setCurrent] = useState("about");
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const auth = useSelector((state) => state.authen);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { product, ...rest } = (auth && auth.currentUser) || {};
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pathToRerender, setPathToRerender] = useState("");

  const onClick = (val) => {
    setCurrent(val.key);
  };

  function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  useEffect(() => {
    if (auth && auth.currentUser && Array.isArray(auth.currentUser.product)) {
      const totalAmount = auth.currentUser.product.reduce(
        (total, product) => total + product.amount,
        0
      );
      setTotalProducts(totalAmount);
      const totalCost = auth.currentUser.product.reduce(
        (total, product) => total + product.price * product.amount,
        0
      );
      setTotalCost(totalCost);
    } else {
      setTotalProducts(0);
      setTotalCost(0);
    }
  }, [auth]);

  const handleRemoveItem = (index) => {
    const updatedCart = [...auth.currentUser.product];
    updatedCart.splice(index, 1);
    const updatedUser = { ...rest, product: updatedCart };
    dispatch(addToCart(updatedUser))
  };

  const handleIncreaseAmount = (index) => {
    const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
    updatedCart[index].amount += 1;
    const updatedUser = { ...rest, product: updatedCart };
    dispatch(addToCart(updatedUser))
  };
  const handleDecreaseAmount = (index) => {
    const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
    updatedCart[index].amount -= 1;
    if (updatedCart[index].amount === 0) {
      showDeleteConfirm(index);
    } else {
      const updatedUser = { ...rest, product: updatedCart };
      dispatch(addToCart(updatedUser))
    }
  };

  const handleOnChangeAmount = (index, value) => {
    if (value !== null && value > 0) {
      const updatedCart = JSON.parse(JSON.stringify(auth.currentUser.product));
      updatedCart[index].amount = value;
      const updatedUser = { ...rest, product: updatedCart };
      dispatch(addToCart(updatedUser))
    } else if (value === 0) {
      showDeleteConfirm(index);
    }
  };

  const showDeleteConfirm = (index) => {
    Modal.confirm({
      title: "Delete Item",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to delete this item?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        setDropdownVisible(true);
        handleRemoveItem(index);
      },
      onCancel() {
        setDropdownVisible(true);
      },
    });
  };

  const items = [
    {
      label: t("about"),
      key: "about",
      // onTitleClick: (val) => setCurrent(val.key),
      children: [
        {
          label: (
            <NavLink
              to={"/about/vtd"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              VTD
            </NavLink>
          ),
          key: "vtd",
        },
        {
          label: (
            <NavLink
              to={"/about/vimar"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              VIMAR
            </NavLink>
          ),
          key: "vimar",
        },
        {
          label: (
            <NavLink
              to={"/about/vda"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              VDA
            </NavLink>
          ),
          key: "vda",
        },
      ],
    },
    {
      label: t("smart home"),
      key: "features",
      children: [
        {
          label: t("villa"),
          key: "villa",
          children: [
            {
              label: (
                <NavLink
                  to={"/villa/lighting"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Lighting solutions")}
                </NavLink>
              ),
              key: "lighting",
            },
            {
              label: (
                <NavLink
                  to={"/villa/security"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Security and alarm solutions")}
                </NavLink>
              ),
              key: "security",
            },
            {
              label: (
                <NavLink
                  to={"/villa/camera"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Surveillance camera solutions")}
                </NavLink>
              ),
              key: "camera",
            },
            {
              label: (
                <NavLink
                  to={"/villa/intercom"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Intercom solutions")}
                </NavLink>
              ),
              key: "intercom",
            },
            {
              label: (
                <NavLink
                  to={"/villa/aircon"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Air conditioning control solutions")}
                </NavLink>
              ),
              key: "aircon",
            },
            {
              label: (
                <NavLink
                  to={"/villa/curtain"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("Curtain control solutions")}
                </NavLink>
              ),
              key: "curtain",
            },
          ],
        },
        {
          label: t("hotel"),
          key: "hotel",
          children: [
            {
              label: (
                <NavLink
                  to={"/hotel/rcu"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("RCU")}
                </NavLink>
              ),
              key: "rcu",
            },
            {
              label: (
                <NavLink
                  to={"/hotel/grms"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("GRMS Software")}
                </NavLink>
              ),
              key: "grms",
            },
            {
              label: (
                <NavLink
                  to={"/hotel/iptv"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {t("IPTV")}
                </NavLink>
              ),
              key: "iptv",
            },
          ],
        },
      ],
    },
    {
      label: (
        <NavLink
          to={"/products/all"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("products")}
        </NavLink>
      ),
      key: "product",
      onTitleClick: (val) => setCurrent(val.key),
      children: [
        {
          label: (
            <NavLink
              to={"/products/switch"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Switch")}
            </NavLink>
          ),
          key: "switch",
        },
        {
          label: (
            <NavLink
              to={"/products/doorEntry"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Door Entry Intercom")}
            </NavLink>
          ),
          key: "doorEntry",
        },
        {
          label: (
            <NavLink
              to={"/products/camera"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Camera")}
            </NavLink>
          ),
          key: "camera",
        },
        {
          label: (
            <NavLink
              to={"/products/alarm"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Alarm")}
            </NavLink>
          ),
          key: "alarm",
        },
        {
          label: (
            <NavLink
              to={"/products/lock"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Door Lock")}
            </NavLink>
          ),
          key: "lock",
        },
        {
          label: (
            <NavLink
              to={"/products/motor"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Curtain Motor")}
            </NavLink>
          ),
          key: "motor",
        },
      ],
    },
    {
      label: (
        <NavLink
          to={"/projects/all"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("projects")}
        </NavLink>
      ),
      key: "projects",
      onTitleClick: (val) => setCurrent(val.key),
      children: [
        {
          label: (
            <NavLink
              to={"/projects/commercial"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Commercial Projects")}
            </NavLink>
          ),
          key: "commercial",
        },
        {
          label: (
            <NavLink
              to={"/projects/civil"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Civil Projects")}
            </NavLink>
          ),
          key: "civil",
        },
        {
          label: (
            <NavLink
              to={"/projects/hotelprojects"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Smart Hotel Projects")}
            </NavLink>
          ),
          key: "hotelprojects",
        },
      ],
    },
    {
      label: (
        <NavLink
          to={"/news/all"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("news")}
        </NavLink>
      ),
      key: "news",
      onTitleClick: (val) => setCurrent(val.key),
      children: [
        {
          label: (
            <NavLink
              to={"/news/market"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Market News")}
            </NavLink>
          ),
          key: "market",
        },
        {
          label: (
            <NavLink
              to={"/news/site"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Site News")}
            </NavLink>
          ),
          key: "site",
        },
        {
          label: (
            <NavLink
              to={"/news/company"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("Company News")}
            </NavLink>
          ),
          key: "company",
        },
      ],
    },
    {
      label: (
        <NavLink
          to={"/contact/contact2"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("contact")}
        </NavLink>
      ),
      key: "contact",
      onTitleClick: (val) => setCurrent(val.key),
      children: [
        {
          label: (
            <NavLink to={"/contact/service"} style={{ textDecoration: "none" }}>
              {t("service")}
            </NavLink>
          ),
          key: "service",
        },
      ],
    },
  ];

  const handleSearch = (e) => {
    const currentPath = window.location.href;
    const url = new URL(currentPath);
    const pathAfterDomain = url.pathname + url.search;

    if (!pathAfterDomain.startsWith("/search")) {
      setPathToRerender(pathAfterDomain);
    }
    if (e.target.value.trim()) {
      navigate("/search");
      dispatch(setSearchValue(e.target.value));
    } else {
      navigate(pathToRerender);
    }
  };

  return (
    <>
      <Layout style={{ position: "sticky", zIndex: 1, top: 0 }}>
        <Flex
          justify="center"
          align="center"
          style={{ backgroundColor: mode ? "#001529" : "white" }}
        >
          <Space
            size="large"
            align="center"
            direction="horizontal"
            wrap={false}
          >
            <Image
              src={Logo}
              width={80}
              preview={false}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    horizontalItemBorderRadius: "10px",
                  },
                },
              }}
            >
              <Menu
                theme={mode ? "dark" : "light"}
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                disabledOverflow
              />
            </ConfigProvider>
            <Input.Search
              placeholder="Search"
              allowClear
              size="medium"
              // onSearch={onSearch}
              style={{
                width: 200,
              }}
              onChange={(e) => handleSearch(e)}
            />
            <Switch
              checked={mode}
              onChange={() => dispatch(toggleDarkMode())}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <Dropdown
              dropdownRender={() => (
                <>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{
                      backgroundColor: mode ? "#001529" : "#f5f5f5",
                      borderRadius: "10px",
                    }}
                  >
                    {LANGUAGES.map(({ code, label }) => (
                      <>
                        <Button
                          key={code}
                          type="link"
                          onClick={() => i18n.changeLanguage(code)}
                        >
                          {label}
                        </Button>
                      </>
                    ))}
                  </Space>
                </>
              )}
              placement="bottom"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  EN-VN
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Space size="middle">
              <Dropdown
                dropdownRender={() => (
                  <>
                    {auth && auth.currentUser && auth.currentUser.product && (
                      <Card
                        hoverable
                        style={{
                          minWidth: 500,
                        }}
                        type="inner"
                      >
                        <Flex vertical gap={10}>
                          <div className="fw-medium">Newly added product</div>
                          <List
                            style={{ maxHeight: "50vh", overflowY: "auto" }}
                            dataSource={auth.currentUser.product || []}
                            renderItem={(item, index) => (
                              <>
                                <List.Item
                                  key={item.id}
                                  actions={[
                                    <Typography.Text type="danger">
                                      {`${
                                        item.price &&
                                        formatCurrency(item.price * item.amount)
                                      }đ`}
                                    </Typography.Text>,
                                  ]}
                                >
                                  <List.Item.Meta
                                    title={
                                      <div
                                        onClick={() =>
                                          navigate(
                                            `/product-detail?id=${item.id}&name=${item.title}&code=${item.code}&brand=${item.brand}&series=${item.series}&category=${item.category}`
                                          )
                                        }
                                      >
                                        <Typography.Paragraph ellipsis>
                                          {item.title}
                                        </Typography.Paragraph>
                                      </div>
                                    }
                                    avatar={
                                      <>
                                        <Space size="middle">
                                          <Popconfirm
                                            placement="bottom"
                                            title="Remove the item"
                                            description="Are you sure to remove this item?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() =>
                                              handleRemoveItem(index)
                                            }
                                          >
                                            <BsTrash
                                              style={{
                                                cursor: "pointer",
                                                color: "red",
                                              }}
                                            />
                                          </Popconfirm>
                                          <Avatar
                                            onClick={() =>
                                              navigate(
                                                `/product-detail?id=${item.id}&name=${item.title}&code=${item.code}&brand=${item.brand}&series=${item.series}&category=${item.category}`
                                              )
                                            }
                                            size="large"
                                            src={item.images[0]}
                                            shape="square"
                                            style={{ cursor: "pointer" }}
                                          />
                                        </Space>
                                      </>
                                    }
                                    description={
                                      <>
                                        <Flex justify="flex-start" gap={5}>
                                          <div>Số lượng:</div>
                                          <Space size={0}>
                                            <Button
                                              size="small"
                                              onClick={() =>
                                                handleDecreaseAmount(index)
                                              }
                                            >
                                              -
                                            </Button>
                                            <InputNumber
                                              size="small"
                                              changeOnWheel
                                              value={item.amount}
                                              controls={false}
                                              style={{
                                                width: "35px",
                                              }}
                                              onBlur={(event) =>
                                                handleOnChangeAmount(
                                                  index,
                                                  parseInt(event.target.value)
                                                )
                                              }
                                            />
                                            <Button
                                              size="small"
                                              onClick={() =>
                                                handleIncreaseAmount(index)
                                              }
                                            >
                                              +
                                            </Button>
                                          </Space>
                                        </Flex>
                                      </>
                                    }
                                  />
                                </List.Item>
                              </>
                            )}
                          />
                          <Flex justify="space-around">
                            <Button
                              type="primary"
                              danger
                              onClick={() => navigate("/cart")}
                            >
                              View My Shopping Cart
                            </Button>
                            <Space>
                              <div
                                className="fw-medium"
                                style={{ fontSize: "15px" }}
                              >
                                Total:
                              </div>
                              <div className="fw-medium">
                                <Typography.Text
                                  type="danger"
                                  style={{ fontSize: "15px" }}
                                >
                                  {`${formatCurrency(totalCost)}đ`}
                                </Typography.Text>
                              </div>
                            </Space>
                          </Flex>
                        </Flex>
                      </Card>
                    )}
                  </>
                )}
                placement="bottom"
                visible={dropdownVisible}
                onVisibleChange={(visible) => setDropdownVisible(visible)}
              >
                <Badge count={totalProducts} size="small">
                  <PiShoppingCartLight
                    size="1.5em"
                    color={mode ? "white" : "red"}
                    style={{ cursor: "pointer" }}
                  />
                </Badge>
              </Dropdown>
              {(auth.currentUser === null ||
                auth.currentUser === undefined) && (
                <>
                  <Button
                    type="link"
                    onClick={() => navigate("/accounts/login")}
                  >
                    {t("log in")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => navigate("/accounts/signup")}
                  >
                    {t("sign up")}
                  </Button>
                </>
              )}
              {auth.currentUser && (
                <Dropdown
                  dropdownRender={() => (
                    <>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{
                          backgroundColor: mode ? "#001529" : "#f5f5f5",
                          borderRadius: "10px",
                        }}
                      >
                        <Button
                          type="link"
                          onClick={() => navigate("/accounts/profile")}
                        >
                          {t("my account")}
                        </Button>
                        <Button
                          type="link"
                          onClick={() => navigate("/accounts/purchase")}
                        >
                          {t("my purchase")}
                        </Button>
                        <Button
                          type="link"
                          onClick={() => {
                            dispatch(logout());
                            navigate("/accounts/login");
                          }}
                        >
                          {t("log out")}
                        </Button>
                      </Space>
                    </>
                  )}
                  placement="bottom"
                >
                  <Space size="small" style={{ cursor: "pointer" }}>
                    <Avatar
                      src={`${
                        (auth && auth.currentUser.image) ||
                        (auth && auth.currentUser.avatar)
                      }`}
                    />
                    <span
                      style={{
                        color: mode
                          ? "rgba(255, 255, 255, 0.65)"
                          : "rgba(0, 0, 0, 0.88)",
                      }}
                    >
                      {auth.currentUser.username}
                    </span>
                  </Space>
                </Dropdown>
              )}
            </Space>
          </Space>
        </Flex>
      </Layout>
    </>
  );
};

export default HeaderComponent;
