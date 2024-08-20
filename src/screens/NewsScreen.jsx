import React, { useState, useEffect } from "react";
import { Col, Flex, Row, Button, Tabs, List, Card, Image, Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllContents } from "../Redux-reducer/data";
import { useTranslation } from "react-i18next";
import { OrderedListOutlined } from "@ant-design/icons";
import { MdOutlineDensitySmall } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/GlobalStyles.css";
import { MdAddHomeWork } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const NewsScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const [contents, setContents] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [activeKeyTab, setActiveKeyTab] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const screens = Grid.useBreakpoint();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setActiveKeyTab(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllContents()).then((action) => {
      if (action.payload) {
        setContents(action.payload);
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

  const items = [
    {
      key: "all",
      label: "All",
      icon: <MdOutlineDensitySmall />,
      children:
        contents &&
        Array.isArray(contents) &&
        renderListProducts(
          contents.filter(
            (element) => element.category && element.category.includes("news")
          )
        ),
    },
    {
      key: "market",
      label: t("Market News"),
      icon: <FaShopify />,
      children:
        contents &&
        Array.isArray(contents) &&
        renderListProducts(
          contents.filter(
            (element) => element.category && element.category.includes("market")
          )
        ),
    },
    {
      key: "site",
      label: t("Site News"),
      icon: <MdAddHomeWork />,
      children:
        contents &&
        Array.isArray(contents) &&
        renderListProducts(
          contents.filter(
            (element) => element.category && element.category.includes("site")
          )
        ),
    },
    {
      key: "company",
      label: t("Company News"),
      icon: <MdWork />,
      children:
        contents &&
        Array.isArray(contents) &&
        renderListProducts(
          contents.filter(
            (element) =>
              element.category && element.category.includes("company")
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
            pageSize: 16,
            position: "bottom",
            align: "center",
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          grid={{ gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                hoverable
                cover={
                  <Image
                    alt="example"
                    src={item.image}
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
                    `/new-detail?id=${item.id}&name=${item.title}&category=${item.category}`
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
            width: "1400px",
            minHeight: "80vh",
            backgroundColor: mode ? "#001529" : "white",
          }}
        >
          {screens.md && (
            <Col span={4}>
              <Flex justify="center" align="flex-start" vertical gap="middle">
                <Button type="text" icon={<OrderedListOutlined />}>
                  {t("All Categories")}
                </Button>
              </Flex>
            </Col>
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

export default NewsScreen;
