import React, { useEffect, useState } from "react";
import productsApi from "../../api/productsApi";
import { Formik, Form, Field, FormikProps } from "formik";
import "./styles.css";
import "../../validation";
import * as Yup from "yup";
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { TextField } from "formik-material-ui";
import { Button, Input } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

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

  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    productsApi.fetchProductById(id).then((resp) => setProduct(resp.data));
  }, [id]);

  return (
    <Formik
      initialValues={initialState}
      // validationSchema={validationSchema}
      onSubmit={(values) => {
        productsApi.updateProduct(values, file, product.id);
      }}
    >
      {(props) => (
        <Form className="form-center-column">
          <div>
            {console.log(product.title)}
            <Field
              label="Title"
              name="title"
              type="text"
              value={product.title}
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
            <NavLink to="/products">
              <Button
                className="button-margin"
                variant="contained"
                color="primary"
                type="submit"
              >
                {" "}
                Update{" "}
              </Button>
            </NavLink>
          </div>
        </Form>
      )}
    </Formik>
  );
};
