import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Paper,
  TablePagination,
  CircularProgress,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";

import "./Orders.css";
import Title from "../Title/Title";
import { AppContext, UserContext } from "../../App";
import { useTranslation } from "react-i18next";
import orderApi from "../../api/orderApi";

export default () => {
  const { cart, setCart } = useContext(AppContext);
  const [orders, setOrders] = useState();
  const { user } = useContext(UserContext);

  const {t} = useTranslation("common");

  useEffect(() => {
    orderApi
      .fetchOrdersByUser(user)
      .then((response) => setOrders(response.data));
  });

  let totalPrice = 0;

  return (
    <div>
      {orders && orders.length > 0 ? (
        <section className="cart-container">
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{t("title")}</TableCell>
                    <TableCell>{t("price")}</TableCell>
                    <TableCell>{t("quantity")}</TableCell>
                    <TableCell>{t("total")}</TableCell>
                    {/* <TableCell>Date</TableCell> */}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(
                    (order, product, customer, quantity, createdOn) => {
                      return (
                        <TableRow key={order.product.title}>
                          <TableCell>
                            {" "}
                            {order.product.fileName && (
                              <img
                                src={`http://localhost:8080/files/${order.product.fileName}`}
                                alt="Very beautiful product"
                                className="cart-img"
                              />
                            )}
                          </TableCell>
                          <TableCell>{order.product.title}</TableCell>
                          <TableCell>{order.product.price}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            {(
                              Math.round(
                                order.product.price * order.quantity * 100
                              ) / 100
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                          {/* <TableCell>{order.createdOn.format("YYYY-MM-DD / HH:mm:ss")}</TableCell> */}
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </React.Fragment>
        </section>
      ) : (
        <div className="empty-cart-center">{t("noOrders")}</div>
      )}
    </div>
  );
};
