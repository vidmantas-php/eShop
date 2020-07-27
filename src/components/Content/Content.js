import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductList from "../../pages/ProductList/ProductList";
import ProductForm from "../../pages/ProductForm/ProductForm";
import ProductFormUpdate from "../../pages/ProductFormUpdate/ProductFormUpdate";
import ProductPage from "../../pages/ProductPage/ProductPage";
import Login from "../../pages/Login/Login";
import Cart from "../../pages/Cart/Cart";
import Checkout from "../../pages/Checkout/Checkout";
import Categories from "../../pages/Categories/Categories";
import ProductByCategory from "../../pages/ProductByCategory/ProductByCategory";
import CustomerForm from "../../pages/CustomerForm/CustomerForm";
import Orders from "../../pages/Orders/Orders"

export default () => (
  <Switch>
    <Redirect exact from="/" to="/products" />

    <Route path="/login">
      <Login />
    </Route>

    <Route exact path="/products/product">
      <ProductForm />
    </Route>

    <Route exact path="/products/:id">
      <ProductPage />
    </Route>

    <Route exact path="/products/update/:id">
      <ProductFormUpdate />
    </Route>

    <Route exact path="/products">
      <ProductList />
    </Route>

    <Route exact path="/checkout/:id">
      <Checkout />
    </Route>

    <Route exact path="/products/list/category">
      <Categories />
    </Route>

    <Route exact path="/products/list/category/:id">
      <ProductByCategory />
    </Route>

    <Route exact path="/customer/create">
      <CustomerForm />
    </Route>

    <Route exact path="/orders">
      <Orders />
    </Route>

    <Route path="/cart">
      <Cart />
    </Route>

    <Route>
      <h1>Puslapis nerastas!</h1>
    </Route>
  </Switch>
);
