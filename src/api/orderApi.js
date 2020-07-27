import HTTP from ".";

export default {
  fetchOrdersByUser(user) {
    let data = new FormData();
    data.append("user", user);
    return HTTP.get("/order/orders", data);
  },
  createOrders(product, user, quantity) {
  let data = new FormData();
  data.append("productId", product.id);
  data.append("user", user);
  data.append("quantity", quantity);

    return HTTP.post("/order/create", data);
  },
};
