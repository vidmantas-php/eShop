import HTTP from ".";

export default {
  fetchProducts(pageNumber, pageSize) {
    return HTTP.get(
      `/products/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  },
  fetchProductById(id) {
    return HTTP.get(`/products/${id}`);
  },
  createProduct(product, file) {
    let data = new FormData();
    data.append("file", file);
    data.append("title", product.title);
    data.append("description", product.description);
    data.append("price", product.price);
    return HTTP.post("/products/private/product", data);
  },

  updateProduct(product, file, id) {
    let data = new FormData();
    data.append("file", file);
    data.append("id", id);
    data.append("title", product.title);
    data.append("description", product.description);
    data.append("price", product.price);
    return HTTP.put(`/products/private/${id}/update/product`, data);
  },

  deleteProduct(id) {
    return HTTP.delete(`/products/private/${id}/delete`);
  },

  fetchCategories() {
    return HTTP.get("/products/list/category");
  },

  fetchProductsByCategoryId(id) {
    return HTTP.get(`/products/list/category/${id}`);
  },


};
