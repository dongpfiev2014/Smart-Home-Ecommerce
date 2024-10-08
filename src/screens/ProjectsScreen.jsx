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
  Checkbox,
  Grid,
  Drawer,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux-reducer/data";
import { useTranslation } from "react-i18next";
import { OrderedListOutlined, MenuOutlined } from "@ant-design/icons";
import { MdOutlineDensitySmall } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/GlobalStyles.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdAddHomeWork } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";

const ProjectsScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [activeKeyTab, setActiveKeyTab] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const screens = Grid.useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setActiveKeyTab(id);
  }, [id]);

  const handlePlaceCheckboxChange = (selectedValues) => {
    setSelectedPlaces(selectedValues);
  };

  const handleYearCheckboxChange = (selectedValues) => {
    setSelectedYears(selectedValues);
  };

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // Kiểm tra nếu products là một mảng hợp lệ trước khi sử dụng phương thức filter
  const filteredProducts =
    Array.isArray(products) && products.length > 0
      ? products.filter((element) => {
          const PlaceMatch =
            selectedPlaces.length === 0 ||
            selectedPlaces.includes(element.place);
          const YearMatch =
            selectedYears.length === 0 || selectedYears.includes(element.year);
          return PlaceMatch && YearMatch;
        })
      : [];

  const items = [
    {
      key: "all",
      label: "All",
      icon: <MdOutlineDensitySmall />,
      children:
        filteredProducts &&
        renderListProducts(
          filteredProducts.filter(
            (element) =>
              element.category && element.category.includes("projects")
          )
        ),
    },
    {
      key: "commercial",
      label: t("Commercial Projects"),
      icon: <GiCommercialAirplane />,

      children:
        filteredProducts &&
        renderListProducts(
          filteredProducts.filter(
            (element) =>
              element.category && element.category.includes("commercial")
          )
        ),
    },
    {
      key: "civil",
      label: t("Civil Projects"),
      icon: <MdAddHomeWork />,
      children:
        filteredProducts &&
        renderListProducts(
          filteredProducts.filter(
            (element) => element.category && element.category.includes("civil")
          )
        ),
    },
    {
      key: "hotelprojects",
      label: t("Smart Hotel Projects"),
      icon: <FaHotel />,
      children:
        filteredProducts &&
        renderListProducts(
          filteredProducts.filter(
            (element) =>
              element.category && element.category.includes("hotelprojects")
          )
        ),
    },
  ];

  const onChangeTabs = (key) => {
    setActiveKeyTab(key);
  };

  function renderListProducts(data) {
    return (
      <>
        <List
          loading={isLoading}
          pagination={{
            pageSize: 12,
            position: "bottom",
            align: "center",
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          grid={{ gutter: 10, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
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
                onClick={() => {
                  navigate(
                    `/project-detail?id=${item.id}&name=${item.title}&place=${item.place}&year=${item.year}&category=${item.category}`
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
                        {item.title}
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
                          {item.place}
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

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

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
            width: "1400px",
            minHeight: "80vh",
            backgroundColor: mode ? "#001529" : "white",
          }}
        >
          {screens.lg ? (
            <Col span={4}>
              <Flex justify="center" align="flex-start" vertical gap="middle">
                <Button type="text" icon={<OrderedListOutlined />}>
                  {t("All Categories")}
                </Button>
                <Checkbox.Group onChange={handlePlaceCheckboxChange}>
                  <Space direction="vertical">
                    <div class="fw-medium">{t("place")}</div>
                    <Checkbox value="Hà Nội">Hà Nội</Checkbox>
                    <Checkbox value="Đà Nẵng">Đà Nẵng</Checkbox>
                    <Checkbox value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Checkbox>
                  </Space>
                </Checkbox.Group>
                <Checkbox.Group onChange={handleYearCheckboxChange}>
                  <Space direction="vertical">
                    <div class="fw-medium">{t("year")}</div>
                    <Checkbox value="2020">2020</Checkbox>
                    <Checkbox value="2021">2021</Checkbox>
                    <Checkbox value="2022">2022</Checkbox>
                    <Checkbox value="2023">2023</Checkbox>
                  </Space>
                </Checkbox.Group>
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
                <Flex justify="center" align="flex-start" vertical gap="middle">
                  <Button type="text" icon={<OrderedListOutlined />}>
                    {t("All Categories")}
                  </Button>
                  <Checkbox.Group onChange={handlePlaceCheckboxChange}>
                    <Space direction="vertical">
                      <div class="fw-medium">{t("place")}</div>
                      <Checkbox value="Hà Nội">Hà Nội</Checkbox>
                      <Checkbox value="Đà Nẵng">Đà Nẵng</Checkbox>
                      <Checkbox value="TP. Hồ Chí Minh">
                        TP. Hồ Chí Minh
                      </Checkbox>
                    </Space>
                  </Checkbox.Group>
                  <Checkbox.Group onChange={handleYearCheckboxChange}>
                    <Space direction="vertical">
                      <div class="fw-medium">{t("year")}</div>
                      <Checkbox value="2020">2020</Checkbox>
                      <Checkbox value="2021">2021</Checkbox>
                      <Checkbox value="2022">2022</Checkbox>
                      <Checkbox value="2023">2023</Checkbox>
                    </Space>
                  </Checkbox.Group>
                </Flex>
              </Drawer>
            </>
          )}
          <Col span={20}>
            <Tabs
              items={items}
              onChange={onChangeTabs}
              type="card"
              size="middle"
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

export default ProjectsScreen;
