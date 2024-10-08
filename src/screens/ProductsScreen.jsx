import React, { useState, useEffect } from "react";
import {
  Col,
  Flex,
  Row,
  Button,
  Tabs,
  List,
  Card,
  Image,
  Space,
  Rate,
  Menu,
  Checkbox,
  Grid,
  Drawer,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux-reducer/data";
import { useTranslation } from "react-i18next";
import { OrderedListOutlined, MenuOutlined } from "@ant-design/icons";
import { SiNintendoswitch } from "react-icons/si";
import { MdOutlineDensitySmall } from "react-icons/md";
import { GiEntryDoor } from "react-icons/gi";
import { MdVideoCameraFront } from "react-icons/md";
import { PiSirenDuotone } from "react-icons/pi";
import { GiGate } from "react-icons/gi";
import { GiTheaterCurtains } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/GlobalStyles.css";

const ProductsScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState("");
  // const [filteringProducts, setFilteringProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [activeKeyTab, setActiveKeyTab] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [lowToHighChecked, setLowToHighChecked] = useState(false);
  const [highToLowChecked, setHighToLowChecked] = useState(false);
  const screens = Grid.useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllProducts()).then((action) => {
      if (action.payload) {
        setProducts(action.payload);
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setActiveKeyTab(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleLowToHighChange = (checked) => {
    setLowToHighChecked(checked);
    if (checked) {
      setHighToLowChecked(false);
    }
  };

  const handleHighToLowChange = (checked) => {
    setHighToLowChecked(checked);
    if (checked) {
      setLowToHighChecked(false);
    }
  };

  const handleBrandCheckboxChange = (selectedValues) => {
    setSelectedBrands(selectedValues);
  };

  const handleMaterialCheckboxChange = (selectedValues) => {
    setSelectedMaterials(selectedValues);
  };

  const handleSeriesCheckboxChange = (selectedValues) => {
    setSelectedSeries(selectedValues);
  };

  const onClickFilter = (val) => {
    setCurrent(val.key);
  };

  // Lọc products nếu có ít nhất một phần tử
  const filteredProducts =
    Array.isArray(products) && products.length > 0
      ? products.filter((element) => {
          const brandMatch =
            selectedBrands.length === 0 ||
            selectedBrands.includes(element.brand);
          const materialMatch =
            selectedMaterials.length === 0 ||
            selectedMaterials.includes(element.material);
          const seriesMatch =
            selectedSeries.length === 0 ||
            selectedSeries.includes(element.series);
          return brandMatch && materialMatch && seriesMatch;
        })
      : [];

  // Sử dụng filteredProducts ở đây

  const sortedFilteredProducts = products.length > 0 && [...filteredProducts];

  if (lowToHighChecked) {
    sortedFilteredProducts.sort((a, b) => {
      if (a.price && b.price) {
        return a.price - b.price;
      } else if (!a.price && !b.price) {
        return 0;
      } else if (!a.price) {
        return 1; // Sản phẩm không có giá sẽ được đưa lên cuối danh sách
      } else {
        return -1; // Sản phẩm không có giá sẽ được đưa lên đầu danh sách
      }
    });
  } else if (highToLowChecked) {
    sortedFilteredProducts.sort((a, b) => {
      if (a.price && b.price) {
        return b.price - a.price;
      } else if (!a.price && !b.price) {
        return 0;
      } else if (!a.price) {
        return 1; // Sản phẩm không có giá sẽ được đưa lên cuối danh sách
      } else {
        return -1; // Sản phẩm không có giá sẽ được đưa lên đầu danh sách
      }
    });
  }

  const items = [
    {
      key: "all",
      label: "All",
      icon: <MdOutlineDensitySmall />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) =>
              element.category && element.category.includes("products")
          )
        ),
    },
    {
      key: "switch",
      label: t("Switch"),
      icon: <SiNintendoswitch />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) => element.category && element.category.includes("switch")
          )
        ),
    },
    {
      key: "doorEntry",
      label: t("Door Entry Intercom"),
      icon: <GiGate />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) =>
              element.category && element.category.includes("doorEntry")
          )
        ),
    },
    {
      key: "camera",
      label: t("Camera"),
      icon: <MdVideoCameraFront />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) => element.category && element.category.includes("camera")
          )
        ),
    },
    {
      key: "alarm",
      label: t("Alarm"),
      icon: <PiSirenDuotone />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) => element.category && element.category.includes("alarm")
          )
        ),
    },
    {
      key: "lock",
      label: t("Door Lock"),
      icon: <GiEntryDoor />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) => element.category && element.category.includes("lock")
          )
        ),
    },
    {
      key: "motor",
      label: t("Curtain Motor"),
      icon: <GiTheaterCurtains />,
      children:
        sortedFilteredProducts &&
        renderListProducts(
          sortedFilteredProducts.filter(
            (element) => element.category && element.category.includes("motor")
          )
        ),
    },
  ];

  const itemsFilter = [
    {
      key: "1",
      label: "Sort By Price",
      children: [
        {
          key: "2",
          label: (
            <Checkbox
              value="lowToHigh"
              checked={lowToHighChecked}
              onChange={(e) => handleLowToHighChange(e.target.checked)}
            >
              Ascending
            </Checkbox>
          ),
        },
        {
          key: "3",
          label: (
            <Checkbox
              value="highToLow"
              checked={highToLowChecked}
              onChange={(e) => handleHighToLowChange(e.target.checked)}
            >
              Descending
            </Checkbox>
          ),
        },
      ],
    },
  ];
  const onChangeTabs = (key) => {
    setActiveKeyTab(key);
  };

  function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function getRandomRatio() {
    return Math.random() + 1; // Tạo một tỷ lệ ngẫu nhiên, ví dụ: từ 1 đến 2
  }

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  function renderListProducts(data) {
    return (
      <>
        <List
          loading={isLoading}
          pagination={{
            pageSize: 20,
            position: "bottom",
            align: "center",
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          grid={{
            gutter: 10,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            xxl: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                hoverable
                cover={
                  <Image
                    alt="example"
                    src={item.images[0]}
                    preview={false}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                }
                actions={[
                  <>
                    <Space
                      size="small"
                      style={{
                        fontSize: "11px",
                        padding: "4px",
                      }}
                    >
                      <Rate
                        disabled
                        defaultValue={
                          Math.floor(Math.random() * (5 - 3 + 1)) + 3
                        }
                        style={{
                          fontSize: "10px",
                        }}
                      />
                      <div>{Math.floor(Math.random() * 50) + 1} sold</div>
                      <div>Còn hàng</div>
                    </Space>
                  </>,
                ]}
                onClick={() => {
                  navigate(
                    `/product-detail?id=${item.id}&name=${item.title}&code=${item.code}&brand=${item.brand}&series=${item.series}&category=${item.category}`
                  );
                }}
              >
                <Card.Meta
                  title={
                    <>
                      <div
                        style={{
                          fontWeight: "500",
                          fontSize: "13px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {item.code} - {item.title}
                      </div>
                    </>
                  }
                  description={
                    <>
                      <div className="d-flex">
                        <Space
                          size="small"
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          <div className="d-flex">
                            <div style={{ color: "red" }}>
                              {`${item.price && formatCurrency(item.price)}đ`}
                            </div>
                          </div>
                          <div style={{ textDecoration: "line-through" }}>
                            {`${
                              item.price &&
                              formatCurrency(
                                (item.price * getRandomRatio()).toFixed()
                              )
                            }đ`}
                          </div>
                        </Space>
                      </div>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  }

  return (
    <>
      <Flex
        style={{
          backgroundColor: mode ? "#001529" : "white",
          padding: "10px",
        }}
        justify="center"
        align="center"
      >
        <Row
          className="d-flex justify-content-center align-items-start"
          style={{
            width: "1200px",
            minHeight: "80vh",
            backgroundColor: mode ? "#001529" : "white",
          }}
        >
          {screens.lg ? (
            <Col span={4}>
              <Flex
                justify="center"
                align="flex-start"
                vertical
                gap="middle"
                style={{ padding: "5px" }}
              >
                <Button type="text" icon={<OrderedListOutlined />}>
                  {t("All Categories")}
                </Button>
                <Flex justify="center" align="center">
                  <Menu
                    theme={mode ? "dark" : "light"}
                    mode="inline"
                    selectedKeys={[current]}
                    items={itemsFilter}
                    onClick={onClickFilter}
                    style={{
                      height: "100%",
                      borderRight: 0,
                    }}
                    defaultOpenKeys={["1"]}
                  />
                </Flex>
                <Checkbox.Group onChange={handleBrandCheckboxChange}>
                  <Space direction="vertical">
                    <div class="fw-medium">{t("brand")}</div>
                    <Checkbox value="vimar">Vimar</Checkbox>
                    <Checkbox value="vda">VDA</Checkbox>
                    <Checkbox value="epic">Epic</Checkbox>
                    <Checkbox value="yale">Yale</Checkbox>
                    <Checkbox value="somfy">Somfy</Checkbox>
                  </Space>
                </Checkbox.Group>
                <Checkbox.Group onChange={handleMaterialCheckboxChange}>
                  <Space direction="vertical">
                    <div class="fw-medium">{t("material")}</div>
                    <Checkbox value="techno">Techno</Checkbox>
                    <Checkbox value="metal">Metal</Checkbox>
                    <Checkbox value="glass">Glass</Checkbox>
                    <Checkbox value="stone">Stone</Checkbox>
                    <Checkbox value="wood">Wood</Checkbox>
                    <Checkbox value="leather">Leather</Checkbox>
                  </Space>
                </Checkbox.Group>
                <Checkbox.Group onChange={handleSeriesCheckboxChange}>
                  <Space direction="vertical">
                    <div class="fw-medium">{t("series")}</div>
                    <Checkbox value="eikon">Eikon (Luxury)</Checkbox>
                    <Checkbox value="arke">Arke (Mid-range)</Checkbox>
                    <Checkbox value="plana">Plana (Entry-level)</Checkbox>
                  </Space>
                </Checkbox.Group>
                <Space direction="vertical">
                  <div class="fw-medium">Rating</div>
                  <Rate
                    disabled
                    defaultValue={5}
                    style={{ fontSize: "14px" }}
                  />
                  <Rate
                    disabled
                    defaultValue={4}
                    style={{ fontSize: "14px" }}
                  />
                  <Rate
                    disabled
                    defaultValue={3}
                    style={{ fontSize: "14px" }}
                  />
                  <Rate
                    disabled
                    defaultValue={2}
                    style={{ fontSize: "14px" }}
                  />
                  <Rate
                    disabled
                    defaultValue={1}
                    style={{ fontSize: "14px" }}
                  />
                </Space>
              </Flex>
            </Col>
          ) : (
            <>
              <Button
                type="primary"
                icon={<MenuOutlined />}
                onClick={toggleDrawer}
                style={{
                  position: "fixed",
                  zIndex: 1000,
                  top: "120px",
                  left: "5px",
                }}
              />
              <Drawer
                title="Navigation"
                placement="left"
                onClose={toggleDrawer}
                visible={drawerVisible}
                style={{ width: "300px", maxWidth: "300px" }}
              >
                <Flex
                  justify="center"
                  align="flex-start"
                  vertical
                  gap="middle"
                  style={{ padding: "5px" }}
                >
                  <Button type="text" icon={<OrderedListOutlined />}>
                    {t("All Categories")}
                  </Button>
                  <Flex justify="center" align="center">
                    <Menu
                      theme={mode ? "dark" : "light"}
                      mode="inline"
                      selectedKeys={[current]}
                      items={itemsFilter}
                      onClick={onClickFilter}
                      style={{
                        height: "100%",
                        borderRight: 0,
                      }}
                      defaultOpenKeys={["1"]}
                    />
                  </Flex>
                  <Checkbox.Group onChange={handleBrandCheckboxChange}>
                    <Space direction="vertical">
                      <div class="fw-medium">{t("brand")}</div>
                      <Checkbox value="vimar">Vimar</Checkbox>
                      <Checkbox value="vda">VDA</Checkbox>
                      <Checkbox value="epic">Epic</Checkbox>
                      <Checkbox value="yale">Yale</Checkbox>
                      <Checkbox value="somfy">Somfy</Checkbox>
                    </Space>
                  </Checkbox.Group>
                  <Checkbox.Group onChange={handleMaterialCheckboxChange}>
                    <Space direction="vertical">
                      <div class="fw-medium">{t("material")}</div>
                      <Checkbox value="techno">Techno</Checkbox>
                      <Checkbox value="metal">Metal</Checkbox>
                      <Checkbox value="glass">Glass</Checkbox>
                      <Checkbox value="stone">Stone</Checkbox>
                      <Checkbox value="wood">Wood</Checkbox>
                      <Checkbox value="leather">Leather</Checkbox>
                    </Space>
                  </Checkbox.Group>
                  <Checkbox.Group onChange={handleSeriesCheckboxChange}>
                    <Space direction="vertical">
                      <div class="fw-medium">{t("series")}</div>
                      <Checkbox value="eikon">Eikon (Luxury)</Checkbox>
                      <Checkbox value="arke">Arke (Mid-range)</Checkbox>
                      <Checkbox value="plana">Plana (Entry-level)</Checkbox>
                    </Space>
                  </Checkbox.Group>
                  <Space direction="vertical">
                    <div class="fw-medium">Rating</div>
                    <Rate
                      disabled
                      defaultValue={5}
                      style={{ fontSize: "14px" }}
                    />
                    <Rate
                      disabled
                      defaultValue={4}
                      style={{ fontSize: "14px" }}
                    />
                    <Rate
                      disabled
                      defaultValue={3}
                      style={{ fontSize: "14px" }}
                    />
                    <Rate
                      disabled
                      defaultValue={2}
                      style={{ fontSize: "14px" }}
                    />
                    <Rate
                      disabled
                      defaultValue={1}
                      style={{ fontSize: "14px" }}
                    />
                  </Space>
                </Flex>
              </Drawer>
            </>
          )}
          <Col span={screens.lg ? 20 : 24}>
            <Tabs
              items={items}
              onChange={onChangeTabs}
              type="card"
              size="small"
              tabBarGutter={5}
              centered={screens.lg ? true : false}
              activeKey={activeKeyTab}
            />
          </Col>
        </Row>
      </Flex>
    </>
  );
};

export default ProductsScreen;
