import React, { useEffect, useContext, useState } from "react";
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
import customerApi from "../../api/customerApi";
import "./Cart.css";
import { AppContext, UserContext } from "../../App";
import { useTranslation } from "react-i18next";
import Security from "../../pages/Security/Security";

export default () => {
  const { cart, setCart } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const [customer, setCustomer] = useState([]);

  const { t } = useTranslation("common");

  let totalPrice = 0;

  const removeProduct = (id) => {
    let newCart = cart.filter((products) => products.id !== id);
    setCart(newCart);
  };

  if (user != null) {
    useEffect(() => {
      customerApi.fetchCustomerByUser(user).then((response) => {
        setCustomer(response.data);
      });
    });
  }

  return (
    <div>
      {cart && cart.length > 0 ? (
        <section className="cart-container">
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell> {t("title")}</TableCell>
                    <TableCell> {t("price")}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart &&
                    Object.values(cart).map((product) => {
                      totalPrice = totalPrice + product.price;
                      return (
                        <TableRow key={product.title}>
                          <TableCell>
                            {" "}
                            {product.fileName && (
                              <img
                                src={`http://localhost:8080/files/${product.fileName}`}
                                alt="Very beautiful product"
                                className="cart-img"
                              />
                            )}
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => removeProduct(product.id)}
                              variant="contained"
                              color="primary"
                            >
                              {t("delete")}
                            </Button>
                          </TableCell>
                          <Security roles={["ADMIN", "CUSTOMER"]}>
                            {customer.id != null ? (
                              <TableCell>
                                <NavLink to={`/checkout/${product.id}`}>
                                  <Button variant="contained" color="primary">
                                    {t("checkout")}
                                  </Button>
                                </NavLink>
                              </TableCell>
                            ) : (
                              <TableCell>
                                <NavLink to="/customer/create">
                                  <Button variant="contained" color="primary">
                                    {t("checkout")}
                                  </Button>
                                </NavLink>
                              </TableCell>
                            )}
                            ;
                          </Security>
                        </TableRow>
                      );
                    })}
                </TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {t("total")}:{" "}
                    {(Math.round(totalPrice * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </React.Fragment>
        </section>
      ) : (
        <div className="empty-cart-center"> {t("emptyCart")}</div>
      )}
    </div>
  );
};
