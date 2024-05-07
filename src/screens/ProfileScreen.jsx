import React, { useState } from "react";
import { Row, Col, Flex, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { LuClipboardList } from "react-icons/lu";
import { FcManager } from "react-icons/fc";
import NotFoundScreen from "../screens/NotFoundScreen";
import SingleProfileComponent from "../components/ProfileComponents/SingleProfileComponent";
import PaymentComponent from "../components/ProfileComponents/PaymentComponent";
import VerifyComponent from "../components/ProfileComponents/VerifyComponent";
import NotificationComponent from "../components/ProfileComponents/NotificationComponent";
import PurchaseComponent from "../components/ProfileComponents/PurchaseComponent";
import ContentsComponent from "../components/ProfileComponents/ContentsComponent";
import ProductsComponent from "../components/ProfileComponents/ProductsComponent";

const ProfileScreen = () => {
  const [current, setCurrent] = useState("");
  const { mode } = useSelector((state) => state.darkMode);
  const { t } = useTranslation();
  const auth = useSelector((state) => state.authen);
  const onClick = (val) => {
    setCurrent(val.key);
  };

  const isAdmin = auth.currentUser && auth.currentUser.role === "admin";

  const items = [
    {
      label: (
        <NavLink
          to={"/accounts/profile"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("my account")}
        </NavLink>
      ),
      key: "1",
      icon: <UserOutlined />,
      onTitleClick: () => setCurrent("2"),
      children: [
        {
          label: (
            <NavLink
              to={"/accounts/profile"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("profile")}
            </NavLink>
          ),
          key: "2",
        },
        {
          label: (
            <NavLink
              to={"/accounts/payment"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("banks and cards")}
            </NavLink>
          ),
          key: "3",
        },
        {
          label: (
            <NavLink
              to={"/accounts/verify"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("change passwords")}
            </NavLink>
          ),
          key: "4",
        },
        {
          label: (
            <NavLink
              to={"/accounts/notification"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("notification settings")}
            </NavLink>
          ),
          key: "5",
        },
      ],
    },
    {
      label: (
        <NavLink
          to={"/accounts/purchase"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("my purchase")}
        </NavLink>
      ),
      key: "6",
      icon: <LuClipboardList />,
      onTitleClick: (val) => setCurrent(val.key),
    },
    isAdmin && {
      label: (
        <NavLink
          to={"/accounts/management/contents"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {t("management")}
        </NavLink>
      ),
      key: "7",
      icon: <FcManager />,
      onTitleClick: () => setCurrent("8"),
      children: [
        {
          label: (
            <NavLink
              to={"/accounts/management/contents"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("contents")}
            </NavLink>
          ),
          key: "8",
        },
        {
          label: (
            <NavLink
              to={"/accounts/management/products"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {t("products")}
            </NavLink>
          ),
          key: "9",
        },
      ],
    },
  ];
  return (
    <>
      {auth.currentUser ? (
        <Flex
          style={{
            backgroundColor: mode ? "#001529" : "white",
          }}
          justify="center"
          align="center"
        >
          <Row
            style={{
              width: "1800px",
              minHeight: "75vh",
              backgroundColor: mode ? "#001529" : "white",
            }}
          >
            <Col
              span={4}
              style={{ position: "fixed", width: "calc(1800px/6)" }}
            >
              <Flex justify="center" align="center">
                <Sider>
                  <Menu
                    theme={mode ? "dark" : "light"}
                    mode="inline"
                    selectedKeys={[current]}
                    items={items}
                    onClick={onClick}
                    style={{
                      height: "100%",
                      borderRight: 0,
                    }}
                  />
                </Sider>
              </Flex>
            </Col>
            <Col span={20} style={{ marginLeft: "calc(1800px/6)" }}>
              <Routes>
                <Route path="/profile" element={<SingleProfileComponent />} />
                <Route path="/payment" element={<PaymentComponent />} />
                <Route path="/verify" element={<VerifyComponent />} />
                <Route
                  path="/notification"
                  element={<NotificationComponent />}
                />
                <Route path="purchase" element={<PurchaseComponent />} />
                <Route
                  path="management/contents"
                  element={<ContentsComponent />}
                />
                <Route
                  path="management/products"
                  element={<ProductsComponent />}
                />
              </Routes>
            </Col>
          </Row>
        </Flex>
      ) : (
        <NotFoundScreen />
      )}
    </>
  );
};

export default ProfileScreen;
