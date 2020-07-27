import React, { useState, useContext, useEffect } from "react";
import productsApi from "../../api/productsApi";
import customerApi from "../../api/customerApi";
import { Formik, Form, Field } from "formik";
import "./CustomerForm.css";
import "../../validation";
import * as Yup from "yup";
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { TextField } from "formik-material-ui";
import { Button, Input } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { UserContext, AppContext } from "../../App";
import Title from "../Title/Title";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  title: Yup.string().label("common:title").required(),
  description: Yup.string().label("common:description").required(),
  price: Yup.number().label("common:price").typeError().min(0.01).required(),
});

export default () => {
  const { user } = useContext(UserContext);
  const { customer, setCustomer } = useContext(AppContext);

  const { t } = useTranslation("accountForm");

  let initialState = {
    email: customer.email,
    address: customer.address,
  };

  if (user == null) {
  } else {
    useEffect(() => {
      customerApi
        .fetchCustomerByUser(user)
        .then((response) => setCustomer(response.data));
    });
  }
  // useEffect(() => {
  //   customerApi
  //     .fetchCustomerByUser(user)
  //     .then((response) => setCustomer(response.data))
  // },);

  return (
    <Formik
      initialValues={initialState}
      // validationSchema={validationSchema}
      onSubmit={(values) => {
        customerApi.createCustomer(values, user);
      }}
    >
      {(props) => (
        <Form className="form-center-column">
          <div>
            <Title name="" title={t("accountSettings")}></Title>
          </div>
          <div>
            <Field
              label="Email"
              name="email"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="title" />
          </div>
          <div>
            <Field
              label="Address"
              name="address"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="description" />
          </div>
          <div>
            <Field
              label="City"
              name="city"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="city" />
          </div>
          <div>
            <Button
              className="button-margin"
              variant="contained"
              color="primary"
              type="submit"
            >
              {" "}
              {t("update")}{" "}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
