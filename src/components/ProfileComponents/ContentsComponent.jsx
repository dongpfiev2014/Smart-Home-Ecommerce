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
  message,
  List,
  Space,
  Avatar,
  Image,
  Modal,
} from "antd";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import {
  deleteContent,
  editContent,
  getAllContents,
  publishContent,
} from "../../Redux-reducer/data";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EditOutlined,
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

const ContentsComponent = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authen);
  const [title, setTitle] = useState("");
  const [contentCkeditor, setContentCkeditor] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentEditingContent, setCurrentEditingContent] = useState([]);
  const [form] = Form.useForm();
  const [contents, setContents] = useState([]);
  const [editID, setEditID] = useState(-1);

  const clearAll = () => {
    setCurrentEditingContent([]);
    setContentCkeditor("");
    setSelectedCategory([]);
    setTitle("");
    setImage("");
  };

  const onFinish = (value) => {
    if (editID !== -1) {
      const updatedContent = { ...currentEditingContent, ...value };
      dispatch(editContent(updatedContent)).then((action) => {
        dispatch(getAllContents()).then((action) => {
          setContents(action.payload);
          success2();
          setEditID(-1);
          clearAll();
        });
      });
    } else {
      dispatch(publishContent(value)).then((action) => {
        dispatch(getAllContents()).then((action) => {
          setContents(action.payload);
        });
        success1();
        clearAll();
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      image: image,
      category: selectedCategory,
      content: contentCkeditor,
    });
  }, [title, image, selectedCategory, contentCkeditor]);

  useEffect(() => {
    dispatch(getAllContents()).then((action) => {
      setContents(action.payload);
    });
  }, []);

  const handleUpdateContent = (id) => {
    const updatingData = contents.find((element) => element.id === id);
    setEditID(id);
    if (updatingData) {
      setCurrentEditingContent(updatingData);
      setContentCkeditor(updatingData.content);
      setSelectedCategory(updatingData.category);
      setTitle(updatingData.title);
      setImage(updatingData.image);
    }
  };

  const handleDeleteContent = (id) => {
    dispatch(deleteContent(id)).then((action) => {
      if (action.payload) {
        dispatch(getAllContents()).then((action) =>
          setContents(action.payload)
        );
      }
    });
  };

  const options = [
    {
      value: "about",
      label: t("about"),
      children: [
        {
          value: "vtd",
          label: "VTD",
        },
        {
          value: "vimar",
          label: "VIMAR",
        },
        {
          value: "vda",
          label: "VDA",
        },
      ],
    },
    {
      value: "smarthome",
      label: t("smart home"),
      children: [
        {
          value: "villa",
          label: t("villa"),
          children: [
            {
              value: "lighting",
              label: t("Lighting solutions"),
            },
            {
              value: "security",
              label: t("Security and alarm solutions"),
            },
            {
              value: "camera",
              label: t("Surveillance camera solutions"),
            },
            {
              value: "intercom",
              label: t("Intercom solutions"),
            },
            {
              value: "aircon",
              label: t("Air conditioning control solutions"),
            },
            {
              value: "curtain",
              label: t("Curtain control solutions"),
            },
          ],
        },
        {
          value: "hotel",
          label: t("hotel"),
          children: [
            {
              value: "rcu",
              label: t("RCU"),
            },
            {
              value: "grms",
              label: t("GRMS Software"),
            },
            {
              value: "iptv",
              label: t("IPTV"),
            },
          ],
        },
      ],
    },
    {
      value: "news",
      label: t("news"),
      children: [
        {
          label: t("Market News"),
          value: "market",
        },
        {
          label: t("Site News"),
          value: "site",
        },
        {
          label: t("Company News"),
          value: "company",
        },
      ],
    },
    {
      value: "contact1",
      label: t("contact"),
      children: [
        {
          label: t("contact"),
          value: "contact2",
        },
        {
          label: t("service"),
          value: "service",
        },
      ],
    },
  ];

  const renderListContents = (data) => (
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
                    src={item.image}
                    style={{
                      height: "100%",
                      borderRadius: "15px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleUpdateContent(item.id)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      confirm({
                        title: "Confirm",
                        content: "Are you sure you want to delete it?",
                        onOk: () => handleDeleteContent(item.id),
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

  const items = [
    {
      key: "1",
      label: t("Add Content"),
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
                      span: 22,
                    }}
                    initialValues={{
                      author: auth.currentUser.username,
                    }}
                  >
                    <Form.Item label={t("Author")} name="author">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label={t("Category")} name="category">
                      <Cascader
                        options={options}
                        onChange={(value) => setSelectedCategory(value)}
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
                      label={t("content")}
                      name="content"
                      wrapperCol={{ span: 22 }}
                    >
                      <CKEditor
                        editor={Editor}
                        data={contentCkeditor}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContentCkeditor(data);
                          form.setFieldsValue({ content: data });
                        }}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "550px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Image" name="image">
                      <Input
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
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
      label: t("Table of Contents"),
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
              <TabPane tab={t("about")} key="1">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="VTD" key="2">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category && element.category.includes("vtd")
                      )
                    )}
                  </TabPane>
                  <TabPane tab="VIMAR" key="3">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category && element.category.includes("vimar")
                      )
                    )}
                  </TabPane>
                  <TabPane tab="VDA" key="4">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category && element.category.includes("vda")
                      )
                    )}
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab={t("smart home")} key="5">
                <Tabs>
                  <TabPane tab={t("villa")} key="6">
                    <Tabs>
                      <TabPane tab={t("Lighting solutions")} key="7">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("lighting")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("Security and alarm solutions")} key="8">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("security")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("Surveillance camera solutions")} key="9">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("camera")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("Intercom solutions")} key="10">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("intercom")
                          )
                        )}
                      </TabPane>
                      <TabPane
                        tab={t("Air conditioning control solutions")}
                        key="11"
                      >
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("aircon")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("Curtain control solutions")} key="12">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("curtain")
                          )
                        )}
                      </TabPane>
                    </Tabs>
                  </TabPane>
                  <TabPane tab={t("hotel")} key="13">
                    <Tabs>
                      <TabPane tab={t("RCU")} key="14">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("rcu")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("GRMS Software")} key="15">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("grms")
                          )
                        )}
                      </TabPane>
                      <TabPane tab={t("IPTV")} key="16">
                        {renderListContents(
                          contents.filter(
                            (element) =>
                              element.category &&
                              element.category.includes("iptv")
                          )
                        )}
                      </TabPane>
                    </Tabs>
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab={t("news")} key="17">
                <Tabs>
                  <TabPane tab={t("Market News")} key="18">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("market")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Site News")} key="19">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category && element.category.includes("site")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("Company News")} key="20">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("company")
                      )
                    )}
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab={t("contact")} key="21">
                <Tabs>
                  <TabPane tab={t("contact")} key="22">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("contact2")
                      )
                    )}
                  </TabPane>
                  <TabPane tab={t("service")} key="23">
                    {renderListContents(
                      contents.filter(
                        (element) =>
                          element.category &&
                          element.category.includes("service")
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

export default ContentsComponent;
