import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import productApi from "../../api/productsApi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import Title from "../Title/Title";
import "./Categories.css";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    productApi.fetchCategories().then((response) => setCategory(response.data));
  });

  const classes = useStyles();

  const { t } = useTranslation("common");

  return (
    <div>
      <Title name="Select" title=" Category"></Title>
      <div className="categories-center">
        <List component="nav" className="list-color" aria-label="contacts">
          {category.map((category) => (
            <div>
              <NavLink to={`/products/list/category/${category.id}`}>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={t(`${category.category}`)} />
                </ListItem>
              </NavLink>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
