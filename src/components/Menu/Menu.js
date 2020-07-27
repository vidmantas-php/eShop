import React, { useContext } from "react";
import { setCredentials } from "../../api";
import { UserContext } from "../../App";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BritishFlag from "../../BritishFlag.jpg";
import LithuaniaFlag from "../../LithuaniaFlag.png";
import "./Menu.css";

export default () => {
  const { t } = useTranslation("menu");
  const { i18n } = useTranslation();
  const { user, logout, loggedIn } = useContext(UserContext);

  const changeLanguage = (lang) => (e) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
  };

  const logoutClick = (e) => {
    e.preventDefault();
    setCredentials(null);
    logout();
  };

  const loggedInBlock = loggedIn() ? (
    <>
      <span>
        {user.name} {user.lastName}
      </span>
      &nbsp;
      <a href="#" onClick={logoutClick}>
        {t("logout")}
      </a>
    </>
  ) : (
    <>
      <NavLink to="/login">{t("login")}</NavLink>

      {/* <NavLink to="/register">Register</NavLink> */}
    </>
  );

  function UserOrNot() {
    if (user != null) {
      return (
        <div>
          <NavLink to="/products/product" activeClassName="selected">
            {t("productForm")}
          </NavLink>
          |
          <NavLink to="/products" activeClassName="selected">
            {t("products")}
          </NavLink>
          |
          <NavLink to="/orders" activeClassName="selected">
            {t("orders")}
          </NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink to="/products" activeClassName="selected">
            {t("products")}
          </NavLink>
          |
          <NavLink to="/orders" activeClassName="selected">
            {t("orders")}
          </NavLink>
        </div>
      );
    }
  }

  return (
    <div className="menu-space-between">
      <div className="menu-container-margin">
        {loggedInBlock}|
        <a href="#" onClick={changeLanguage("lt")}>
          <img
            src={LithuaniaFlag}
            alt="lithuania-flag"
            width="23"
            height="15"
          ></img>
        </a>
        |
        <a href="#" onClick={changeLanguage("en")}>
          <img src={BritishFlag} alt="uk-flag" width="24" height="15"></img>
        </a>
      </div>

      <div className="menu-text-align-right menu-container-margin">
        <UserOrNot />
      </div>
    </div>
  );
};
