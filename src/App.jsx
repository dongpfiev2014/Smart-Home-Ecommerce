import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeScreen from "../src/screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import AboutScreen from "./screens/AboutScreen";
import FloatButtonComponent from "./components/FloatButtonComponent";
import NewsletterSignupForm from "./components/SignupForm/NewsletterSignupForm";
import "../src/styles/GlobalStyles.css";
import ProfileScreen from "./screens/ProfileScreen";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { Suspense, useEffect } from "react";
import { Spin } from "antd";
import ProductsScreen from "./screens/ProductsScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import NewsScreen from "./screens/NewsScreen";
import ContactScreen from "./screens/ContactScreen";
import ServiceScreen from "./screens/ServiceScreen";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./Redux-reducer/auth";
import VillaComponent from "./components/SmartHomeComponents/VillaComponent";
import HotelComponent from "./components/SmartHomeComponents/HotelComponent";
import ProductsDetail from "./screens/ProductsDetail";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ProjectsDetail from "./screens/ProjectsDetail";
import NewDetail from "./screens/NewDetail";
import SearchScreen from "./screens/SearchScreen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Suspense
        fallback={
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          </>
        }
      >
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about/:id" element={<AboutScreen />} />
            <Route path="/villa/:id" element={<VillaComponent />} />
            <Route path="/hotel/:id" element={<HotelComponent />} />
            <Route path="/products/:id" element={<ProductsScreen />} />
            <Route path="/product-detail" element={<ProductsDetail />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/projects/:id" element={<ProjectsScreen />} />
            <Route path="/project-detail" element={<ProjectsDetail />} />
            <Route path="/news/:id" element={<NewsScreen />} />
            <Route path="/new-detail" element={<NewDetail />} />
            <Route path="/contact/:id" element={<ContactScreen />} />
            <Route path="/service" element={<ServiceScreen />} />
            <Route path="/accounts/*" element={<ProfileScreen />} />
            <Route path="/accounts/login" element={<LoginForm />} />
            <Route path="/accounts/signup" element={<RegisterForm />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
          <NewsletterSignupForm />
          <FloatButtonComponent />
          <FooterComponent />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
