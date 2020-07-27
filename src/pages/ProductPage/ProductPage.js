import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import productsApi from "../../api/productsApi";
import "./ProductPage.css";
import { Button } from "@material-ui/core";
import { AppContext, UserContext } from "../../App";
import Title from "../Title/Title";
import { useTranslation } from "react-i18next";
import Security from "../../pages/Security/Security";

export default () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user } = useContext(UserContext);

  const deleteProductById = () => {
    productsApi.deleteProduct(product.id);
  };

  const { cart, setCart } = useContext(AppContext);

  const { t } = useTranslation("common");

  useEffect(() => {
    productsApi.fetchProductById(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const addToCart = () => {
    if (cart != null) {
      let newCart = cart.filter((products) => products.id !== product.id);
      setCart([...newCart, product]);
    } else {
      setCart([product]);
    }
  };

  // Delete Button

  function DeleteButton() {
    return (
      <React.Fragment>
        <NavLink to="/products">
          <Button
            onClick={deleteProductById}
            className="button-margin"
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            {t("delete")}{" "}
          </Button>
        </NavLink>
      </React.Fragment>
    );
  }

  // Update Button

  function UpdateButton() {
    return (
      <React.Fragment>
        <div>
          <NavLink to={`/products/update/${product.id}`}>
            <Button
              className="button-margin"
              variant="contained"
              color="primary"
              type="submit"
            >
              {" "}
              {t("update")}{" "}
            </Button>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }

  // Add to cart button

  function AddToCartButton() {
    return (
      <React.Fragment>
        <div>
          <NavLink to="/cart">
            <Button
              className="button-margin"
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => addToCart(product.id, product.price)}
            >
              {" "}
              {t("addToCart")}{" "}
            </Button>
          </NavLink>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div>
        <Title name="" title={product.title}></Title>
      </div>
      <div className="product-center">
        <div className="paddings-for-img">
          {product.fileName && (
            <img
              src={`http://localhost:8080/files/${product.fileName}`}
              alt="Very beautiful product"
              className="img-height-width"
            />
          )}
        </div>
        <div>
          <p>
            {t("price")}: {product.price}
          </p>
          <p>
            {t("description")}: {product.description}, 
            Was certainty remaining engrossed applauded sir how discovery.
            Settled opinion how enjoyed greater joy adapted too shy. Now
            properly surprise expenses interest nor replying she she. Bore tall
            nay many many time yet less. Doubtful for answered one fat indulged
            margaret sir shutters together. Ladies so in wholly around whence in
            at. Warmth he up giving oppose if. Impossible is dissimilar
            entreaties oh on terminated. Earnest studied article country ten
            respect showing had. But required offering him elegance son improved
            informed.{" "}
          </p>
          <div className="buttons-flex">
            <AddToCartButton />
            <Security roles={["ADMIN"]}>
              <UpdateButton />
              <DeleteButton />
            </Security>
          </div>
        </div>
      </div>
    </div>
  );
};
