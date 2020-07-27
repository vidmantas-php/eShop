import React, { useEffect, useState } from "react";
import productApi from "../../api/productsApi";
import { NavLink } from "react-router-dom";
import { Paper, CircularProgress } from "@material-ui/core";
import "./styles.css";
import Title from "../Title/Title";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export default () => {
  const [productsPage, setProductsPage] = useState({ content: [] });
  const [page] = useState(0);
  const [rowsPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("title");

  useEffect(() => {
    productApi
      .fetchProducts(page, rowsPerPage)
      .then((response) => setProductsPage(response.data))
      .finally(() => setIsLoading(false));
  }, [page, rowsPerPage]);

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

  function FormRow() {

    return (
      <React.Fragment>
        {isLoading ? (
          <CircularProgress class="loader" />
        ) : (
          productsPage.content.map((product) => (
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
          ))
        )}
      </React.Fragment>
    );
  }

  return (
    <div>
      <div>
        <Title title={t("ourProducts")}></Title>
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