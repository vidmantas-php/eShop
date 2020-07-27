import React, { useContext, useState, useEffect } from "react";
import { AppContext, UserContext } from "../../App";
import "./Checkout.css";
import { useParams } from "react-router-dom";
import { useTranslation} from "react-i18next";
import { Button } from "@material-ui/core";
import productsApi from "../../api/productsApi";
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
} from "@material-ui/core";
import PayWithPayPal from "../Cart/PayWithPayPal";
import orderApi from "../../api/orderApi";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default () => {
  const initialState = {
    title: "",
    description: "",
    price: "",
  };

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user } = useContext(UserContext);

  const { t } = useTranslation("common");

  useEffect(() => {
    productsApi.fetchProductById(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);
  // const {t} = useTranslation("checkout")

  const { cart, setCart } = useContext(AppContext);

  const [quantity, setQuantity] = useState(1);

  let totalPrice = 0;

  const removeProduct = (id) => {
    let newCart = cart?.filter((products) => products.id !== id);
    setCart(newCart);
    setProduct(null);
  };

  const addToQuantity = () => {
    setQuantity(quantity + 1);
  };

  const removeFromQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const order = () => {
  //   orderApi.createOrder(product, user, quantity);
  // };

  return (
    <div>
      {product != null ? (
        <section className="checkout-container ">
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{t("title")}</TableCell>
                    <TableCell>{t("price")}</TableCell>
                    <TableCell>{t("quantity")}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{t("checkout")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                      {" "}
                      <div>
                        <div className="quantity">
                          <RemoveIcon onClick={removeFromQuantity} />
                          <div className="qnt-paddings">{quantity}</div>
                          <AddIcon onClick={addToQuantity} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => removeProduct(product.id)}
                        variant="contained"
                        color="primary"
                      >
                        {t("delete")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <PayWithPayPal
                        total={(
                          Math.round(
                            (totalPrice + product.price * quantity) * 100
                          ) / 100
                        ).toFixed(2)}
                        items={product}
                        quantity={quantity}
                        // onClick={order}
                      />
                    </TableCell>
                  </TableRow>
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
          </div>
        </section>
      ) : (
        <div className="empty-cart-center">{t("emptyCart")}</div>
      )}
    </div>
  );
};
