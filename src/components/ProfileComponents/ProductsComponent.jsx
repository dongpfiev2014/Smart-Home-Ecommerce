import {
  Layout,
  Tabs,
  Collapse,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Button,
  Row,
  Col,
  Cascader,
  InputNumber,
  Select,
  message,
  Space,
  List,
  Image,
  Avatar,
  Modal,
} from "antd";
import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
  publishProduct,
} from "../../Redux-reducer/data";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { confirm } = Modal;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ProductsComponent = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const auth = useSelector((state) => state.authen);
  const dispatch = useDispatch();
  const [contentCkeditor, setContentCkeditor] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [code, setCode] = useState("");
  const [stock, setStock] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [place, setPlace] = useState("");
  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [material, setMaterial] = useState("");
  const [series, setSeries] = useState("");
  const [isProduct, setIsProduct] = useState(true);
  const [currentEditingProduct, setCurrentEditingProduct] = useState([]);
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [editID, setEditID] = useState(-1);

  const clearAll = () => {
    setCurrentEditingProduct([]);
    setContentCkeditor("");
    setTitle("");
    setImage("");
    setSelectedCategory([]);
    setCode("");
    setStock("");
    setUnitPrice("");
    setPlace("");
    setBrand("");
    setOrigin("");
    setMaterial("");
    setSeries("");
    setYear("");
  };
  const onFinish = (value) => {
    if (editID !== -1) {
      const updatedProduct = { ...currentEditingProduct, ...value };
      dispatch(editProduct(updatedProduct)).then((action) => {
        dispatch(getAllProducts()).then((action) => {
          setProducts(action.payload);
          success2();
          setEditID(-1);
          clearAll();
        });
      });
    } else {
      dispatch(publishProduct(value)).then((action) => {
        dispatch(getAllProducts()).then((action) => {
          setProducts(action.payload);
          success1();
          clearAll();
        });
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      images: image,
      category: selectedCategory,
      description: contentCkeditor,
      code: code,
      stock: stock,
      price: unitPrice,
      place: place,
      brand: brand,
      origin: origin,
      material: material,
      series: series,
      year: year,
    });
  }, [
    title,
    image,
    selectedCategory,
    contentCkeditor,
    code,
    stock,
    unitPrice,
    place,
    brand,
    origin,
    material,
    series,
    year,
  ]);

  useEffect(() => {
    dispatch(getAllProducts()).then((action) => {
      setProducts(action.payload);
    });
  }, []);

  const handleUpdateProduct = (id) => {
    const updatingData = products.find((element) => element.id === id);
    setEditID(id);
    if (updatingData) {
      setCurrentEditingProduct(updatingData);
      setContentCkeditor(updatingData.description);
      setSelectedCategory(updatingData.category);
      setTitle(updatingData.title);
      setImage(updatingData.images);
      setCode(updatingData.code);
      setStock(updatingData.stock);
      setUnitPrice(updatingData.price);
      setPlace(updatingData.place);
      setBrand(updatingData.brand);
      setOrigin(updatingData.origin);
      setMaterial(updatingData.material);
      setSeries(updatingData.series);
      setYear(updatingData.year);
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)).then((action) => {
      if (action.payload) {
        dispatch(getAllProducts()).then((action) =>
          setProducts(action.payload)
        );
      }
    });
  };

  const options = [
    {
      value: "products",
      label: t("products"),
      children: [
        {
          label: t("Switch"),
          value: "switch",
        },
        {
          label: t("Door Entry Intercom"),
          value: "doorEntry",
        },
        {
          label: t("Camera"),
          value: "camera",
        },
        {
          label: t("Alarm"),
          value: "alarm",
        },
        {
          label: t("Door Lock"),
          value: "lock",
        },
        {
          label: t("Curtain Motor"),
          value: "motor",
        },
      ],
    },
    {
      value: "projects",
      label: t("projects"),
      children: [
        {
          label: t("Commercial Projects"),
          value: "commercial",
        },
        {
          label: t("Civil Projects"),
          value: "civil",
        },
        {
          label: t("Smart Hotel Projects"),
          value: "hotelprojects",
        },
      ],
    },
  ];

  const onChangeCascader = (value) => {
    setSelectedCategory(value);
    if (value.includes("products")) {
      setIsProduct(true);
    } else setIsProduct(false);
  };

  const renderListProducts = (data) => (
    <>
      <List
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
                    src={item.images[0]}
                    style={{
                      height: "100%",
                      borderRadius: "15px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleUpdateProduct(item.id)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      confirm({
                        title: "Confirm",
                        content: "Are you sure you want to delete it?",
                        onOk: () => handleDeleteProduct(item.id),
                      })
                    }
                  />
                </Space>
              </>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={auth.currentUser.image} />}
              title={item.title}
              description={
                <>
                  <div style={{ maxHeight: "100px", overflow: "hidden" }}>
                    <div
                      className="CKeditor"
                      dangerouslySetInnerHTML={{ __html: item.description }}
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

  const items = [
    {
      key: "1",
      label: t("Add Product"),
      children: (
        <>
          <Flex justify="center" align="center" style={{ width: "100%" }}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <ConfigProvider>
                  <Form
                    form={form}
                    onFinish={onFinish}
                    layout="horizontal"
                    labelCol={{
                      span: 2,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{ author: auth.currentUser.username }}
                  >
                    <Form.Item label={t("Author")} name="author">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      label={t("Category")}
                      name="category"
                      rules={[
                        {
                          required: true,
                          message: "Please input your category!",
                        },
                      ]}
                    >
                      <Cascader
                        options={options}
                        onChange={onChangeCascader}
                        value={selectedCategory}
                      />
                    </Form.Item>
                    <Form.Item label={t("Title")} name="title">
                      <Input.TextArea
                        rows={2}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t("Description")}
                      name="description"
                      wrapperCol={{ span: 16 }}
                    >
                      <CKEditor
                        editor={Editor}
                        data={contentCkeditor}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContentCkeditor(data);
                          form.setFieldsValue({ description: data });
                        }}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "200px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                      />
                    </Form.Item>
                    {isProduct ? (
                      <>
                        <Form.Item label={t("code")} name="code">
                          <Input style={{ width: "30%" }} value={code} />
                        </Form.Item>
                        <Form.Item label={t("stock")} name="stock">
                          <InputNumber style={{ width: "30%" }} value={stock} />
                        </Form.Item>
                        <Form.Item label={t("unit price")} name="price">
                          <InputNumber
                            style={{ width: "30%" }}
                            addonAfter="VNĐ"
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                            value={unitPrice}
                          />
                        </Form.Item>
                        <Form.Item label={t("brand")} name="brand">
                          <Select
                            defaultValue="Vimar"
                            style={{ width: "30%" }}
                            options={[
                              { value: "vimar", label: "Vimar" },
                              { value: "vda", label: "VDA" },
                              { value: "epic", label: "Epic" },
                              { value: "yale", label: "Yale" },
                              { value: "somfy", label: "Somfy" },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item label={t("origin")} name="origin">
                          <Select
                            defaultValue="Italia"
                            style={{ width: "30%" }}
                            options={[
                              { value: "vn", label: "Vietnam" },
                              { value: "italia", label: "Italia" },
                              { value: "eu", label: "EU" },
                              { value: "us", label: "US" },
                              { value: "china", label: "China" },
                              { value: "korea", label: "Korea" },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item label={t("material")} name="material">
                          <Select
                            defaultValue="techno"
                            style={{ width: "30%" }}
                            options={[
                              { value: "techno", label: "Techno" },
                              { value: "metal", label: "Metal" },
                              { value: "glass", label: "Glass" },
                              { value: "stone", label: "Stone" },
                              { value: "wood", label: "Wood" },
                              { value: "leather", label: "Leather" },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item label={t("series")} name="series">
                          <Select
                            defaultValue="eikon"
                            style={{ width: "30%" }}
                            options={[
                              { value: "eikon", label: "Eikon (Luxury)" },
                              { value: "arke", label: "Arke (Mid-range)" },
                              { value: "plana", label: "Plana (Entry-level)" },
                            ]}
                          />
                        </Form.Item>
                      </>
                    ) : (
                      <>
                        <Form.Item label={t("place")} name="place">
                          <Input
                            onChange={(e) => setPlace(e.target.value)}
                            value={place}
                          />
                        </Form.Item>
                        <Form.Item label={t("year")} name="year">
                          <Input
                            onChange={(e) => setYear(e.target.value)}
                            value={year}
                          />
                        </Form.Item>
                      </>
                    )}
                    <Form.List name="images">
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item
                              {...(index === 0
                                ? {
                                    labelCol: {
                                      xs: {
                                        span: 2,
                                      },
                                      sm: {
                                        span: 2,
                                      },
                                    },
                                    wrapperCol: {
                                      xs: {
                                        span: 24,
                                      },
                                      sm: {
                                        span: 24,
                                      },
                                    },
                                  }
                                : {
                                    wrapperCol: {
                                      xs: {
                                        span: 24,
                                        offset: 2,
                                      },
                                      sm: {
                                        span: 24,
                                        offset: 2,
                                      },
                                    },
                                  })}
                              label={index === 0 ? t("images") : ""}
                              required={false}
                              key={field.key}
                            >
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input image url or delete this field.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Image URL"
                                  style={{
                                    width: "60%",
                                  }}
                                />
                              </Form.Item>
                              {fields.length >= 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item wrapperCol={{ span: 10, offset: 2 }}>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{
                                width: "60%",
                              }}
                              icon={<PlusOutlined />}
                            >
                              Add image
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                      <Button htmlType="submit" type="primary">
                        {t("Add")}
                      </Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </Col>
            </Row>
          </Flex>
        </>
      ),
    },
    {
      key: "2",
      label: t("Table of Products"),
      children: (
        <>
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
              },
              components: {
                Tabs: {
                  /* here is your component tokens */
                },
              },
            }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab={t("products")} key="1">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={t("Switch")} key="2">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("switch")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Door Entry Intercom")} key="3">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("doorEntry")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Camera")} key="5">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("camera")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Alarm")} key="4">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category && element.category.includes("alarm")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Door Lock")} key="6">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category && element.category.includes("lock")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Curtain Motor")} key="7">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category && element.category.includes("motor")
                      )
                    )}
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab={t("projects")} key="8">
                <Tabs>
                  <TabPane tab={t("Commercial Projects")} key="9">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("commercial")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Civil Projects")} key="10">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category && element.category.includes("civil")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Smart Hotel Projects")} key="11">
                    {renderListProducts(
                      products.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("hotelprojects")
                      )
                    )}
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </ConfigProvider>
        </>
      ),
    },
  ];

  const onChange = (key) => {};

  const [messageApi, contextHolder] = message.useMessage();
  const success1 = () => {
    messageApi.open({
      type: "success",
      content: "Your product has been successfully submitted.",
    });
  };
  const success2 = () => {
    messageApi.open({
      type: "success",
      content: "Your product has been successfully edited.",
    });
  };
  return (
    <>
      {contextHolder}
      <Layout
        style={{
          backgroundColor: mode ? "#000c17" : "white",
          padding: "10px",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} />
      </Layout>
    </>
  );
};

export default ProductsComponent;
