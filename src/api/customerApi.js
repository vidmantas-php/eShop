import HTTP from ".";

export default {
  fetchCustomerByUser(user) {
    let data = new FormData();
    data.append("user", user);
    return HTTP.get("/customer/info", data);
  },
  createCustomer(customer, user) {
    let data = new FormData();
    data.append("email", customer.email);
    data.append("address", customer.address);
    data.append("city", customer.city);
    data.append("user", user);
    return HTTP.post("/customer/create", data);
  },
};
