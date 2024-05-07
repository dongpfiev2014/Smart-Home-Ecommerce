import React, { useEffect } from "react";
import { Card, Flex, List, Image, Space, Rate, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllContents, getAllProducts } from "../Redux-reducer/data";
import { useNavigate } from "react-router-dom";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

const SearchScreen = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authen);
  const searchValue = useSelector((state) => state.searchValue);
  const keyword = searchValue.trim().toLowerCase();
  const allProducts = useSelector((state) => state.products);
  const allContents = useSelector((state) => state.contents);
  const { products } = useSelector((state) => state.products);
  const { contents } = useSelector((state) => state.contents);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllContents());
    dispatch(getAllProducts());
  }, []);

  function getRandomRatio() {
    return Math.random() + 1; // Tạo một tỷ lệ ngẫu nhiên, ví dụ: từ 1 đến 2
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const renderListProducts = (data) => (
    <>
      <List
        loading={allProducts.isLoading}
        pagination={{
          pageSize: 10,
        }}
        grid={{ gutter: 10, column: 5 }}
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
                      fontSize: "12px",
                    }}
                  >
                    <Rate
                      disabled
                      defaultValue={Math.floor(Math.random() * (5 - 3 + 1)) + 3}
                      style={{
                        fontSize: "11px",
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
                            {`${item.price && item.price.toLocaleString()}đ`}
                          </div>
                        </div>
                        <div style={{ textDecoration: "line-through" }}>
                          {`${
                            item.price &&
                            (item.price * getRandomRatio())
                              .toFixed()
                              .toLocaleString()
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

  const renderListProjects = (data) => (
    <>
      <List
        loading={allProducts.isLoading}
        pagination={{
          pageSize: 6,
        }}
        grid={{ gutter: 10, column: 3 }}
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

  const renderListContents = (data) => (
    <>
      <List
        loading={allContents.isLoading}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <>
                <Space size="large">
                  <Image
                    width={160}
                    height={120}
                    alt="logo"
                    src={item.image}
                    style={{
                      height: "100%",
                      borderRadius: "15px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                </Space>
              </>
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://upload.wikimedia.org/wikipedia/vi/a/a4/Roronoa_Zoro.jpg`}
                />
              }
              title={item.title}
              description={
                <>
                  <div style={{ maxHeight: "100px", overflow: "hidden" }}>
                    <div
                      className="CKeditor"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );

  return (
    <>
      <Flex
        style={{
          backgroundColor: mode ? "#001529" : "white",
        }}
        justify="center"
        align="center"
      >
        <Space
          direction="vertical"
          size="middle"
          className="container"
          style={{
            width: "1200px",
            height: "100%",
            backgroundColor: mode ? "#001529" : "white",
            padding: "10px",
          }}
        >
          <Card title="Products">
            {products &&
              products.length > 0 &&
              renderListProducts(
                products.filter(
                  (element) =>
                    element.category.includes("products") &&
                    (element.title.toLowerCase().includes(keyword) ||
                      element.code.toLowerCase().includes(keyword) ||
                      element.brand.toLowerCase().includes(keyword) ||
                      element.description.toLowerCase().includes(keyword))
                )
              )}
          </Card>
          <Card title="Projects">
            {products &&
              products.length > 0 &&
              renderListProjects(
                products &&
                  products.filter(
                    (element) =>
                      element.category.includes("projects") &&
                      (element.title.toLowerCase().includes(keyword) ||
                        element.description.toLowerCase().includes(keyword))
                  )
              )}
          </Card>
          <Card title="Articles and News">
            {contents &&
              contents.length > 0 &&
              renderListContents(
                contents &&
                  contents.filter(
                    (element) =>
                      element.title.toLowerCase().includes(keyword) ||
                      element.content.toLowerCase().includes(keyword)
                  )
              )}
          </Card>
        </Space>
      </Flex>
    </>
  );
};

export default SearchScreen;
