import React, { useState } from "react";
import productsApi from "../../api/productsApi";
import { Formik, Form, Field } from "formik";
import "./styles.css";
import "../../validation";
import * as Yup from "yup";
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { TextField } from "formik-material-ui";
import { Button, Input } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Title from "../Title/Title";
import { useTranslation } from "react-i18next";

const initialState = {
  title: "",
  description: "",
  price: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().label("common:title").required(),
  description: Yup.string().label("common:description").required(),
  price: Yup.number().label("common:price").typeError().min(0.01).required(),
});

export default () => {
  const [file, setFile] = useState({});
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const { t } = useTranslation("accountForm");

  return (
    <Formik
      initialValues={initialState}
      // validationSchema={validationSchema}
      onSubmit={(values) => {
        productsApi.createProduct(values, file);
      }}
    >
      {(props) => (
        <Form className="form-center-column">
                    <div>
            <Title name="" title={t("productFrom")}></Title>
          </div>
          <div>
            <Field
              label="Title"
              name="title"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="title" />
          </div>
          <div>
            <Field
              label="Description"
              name="description"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="description" />
          </div>
          <div>
            <Field
              label="Price"
              name="price"
              type="text"
              component={TextField}
            />
            <ErrorMessageTranslated className="error" name="price" />
          </div>
          <div>
            <Input type="file" label="Files" onChange={handleFileChange} />
            {/* <Field name="files" type="file" onChange={handleFileChange}/> */}
          </div>
          <div>
              <Button
                className="button-margin"
                variant="contained"
                color="primary"
                type="submit"
              >
                {" "}
                Create{" "}
              </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
