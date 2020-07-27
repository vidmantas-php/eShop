import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import productsApi from "../../api/productsApi";
import "./ProductByCategory.css";
import { Button } from "@material-ui/core";
import { AppContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Title from "../Title/Title";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { cart, setCart } = useContext(AppContext);

  const { t } = useTranslation("title");

  useEffect(() => {
    productsApi.fetchProductsByCategoryId(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  function FormRow() {
    return (
      <React.Fragment>
        {product.map((product) => (
          <Grid item xs={3}>
            <NavLink to={`/products/${product.id}`}>
              <Paper className={classes.paper} className="item">
                <div className="container-img">
                  {product.fileName && (
                    <img
                      src={`http://localhost:8080/files/${product.fileName}`}
                      alt="Very beautiful product"
                      className="img-width-height"
                    />
                  )}
                  <div class="bottom-right-text">
                    <h6>{t("price")} {product.price}</h6>
                  </div>
                </div>
                <h4 className="margin-top-title">{product.title}</h4>
              </Paper>
            </NavLink>
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      flex: "1 0 21%",
      margin: "5px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>
        <Title name="" title={t("ourProducts")}></Title>
      </div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3} className="container">
            <FormRow />
          </Grid>
          {/* <TableContainer component={Paper}>
            <Table>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                rowsPerPage={rowsPerPage}
                count={productsPage.totalElements}
                page={page}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
              />
            </Table>
          </TableContainer> */}
        </Grid>
      </div>
    </div>
  );
};
