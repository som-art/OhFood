import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import NewProduct from "./pages/NewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import OrderList from "./pages/OrderList";
import ProcessOrder from "./pages/ProcessOrder";
import UsersList from "./pages/UsersList";
import UpdateUser from "./pages/UpdateUser";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/contact-us">
              <ContactUs />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/product/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:keyword">
              <Products />
            </Route>
            <ProtectedRoute exact path="/account">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/shipping">
              <Shipping />
            </ProtectedRoute>
            <ProtectedRoute exact path="/order/confirm">
              <ConfirmOrder />
            </ProtectedRoute>
            <ProtectedRoute exact path="/process/payment">
              <Payment />
            </ProtectedRoute>
            <ProtectedRoute exact path="/me/update">
              <UpdateProfile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/password/update">
              <UpdatePassword />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders">
              <MyOrders />
            </ProtectedRoute>
            <ProtectedRoute exact path="/order/:id">
              <OrderDetails />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/products">
              <ProductList />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/product">
              <NewProduct />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/product/:id">
              <UpdateProduct />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/orders">
              <OrderList />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/order/:id">
              <ProcessOrder />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/users">
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute isAdmin={true} exact path="/admin/user/:id">
              <UpdateUser />
            </ProtectedRoute>
            <Redirect to="/account" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/password/forgot">
              <ForgotPassword />
            </Route>
            <Route exact path="/password/reset/:token">
              <ResetPassword />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/about-us">
              <AboutUs />
            </Route>
            <Route exact path="/contact-us">
              <ContactUs />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/product/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:keyword">
              <Products />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
