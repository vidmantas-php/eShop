import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import FormikState from "../../components/FormikState/FormikState";
import { setCredentials } from "../../api";
import { UserContext } from "../../App";
import userApi from "../../api/userApi";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import "./Login.css";
import { useTranslation } from "react-i18next";

const initialValues = {
  username: "",
  password: "",
};

export default () => {
  const { login } = useContext(UserContext);
  const history = useHistory();
  const { t } = useTranslation("menu");

  const onSubmit = (values) => {
    setCredentials(values);
    userApi.getUser().then(({ data }) => {
      login(data);
      history.push("/");
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <Form className="login-center">
          <h2 className="margin-right-words">{t("login")}</h2>
          <div>
            <label htmlFor="username">{t("username")}:</label>
            <Field name="username" type="text" component={ TextField }  />
          </div>
          <div>
            <label htmlFor="password">{t("password")}:</label>
            <Field name="password" type="password" component={ TextField } />
          </div>
          <div>
            <Button
              className="button-margin"
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("login")}
            </Button>
          </div>
          {/* <FormikState {...props} /> */}
        </Form>
      )}
    </Formik>
  );
};
