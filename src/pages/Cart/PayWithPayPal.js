import React, { useState, useEffect, useRef, useContext } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { AppContext, UserContext } from "../../App";
import orderApi from "../../api/orderApi";
import { Button } from "@material-ui/core";

function PayWithPayPal(props) {
  const { items, total, quantity } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const { setCart } = useContext(AppContext);
  const paypalRef = useRef();

  const { user } = useContext(UserContext);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Eshop store checkout",
                amount: {
                  currency_code: "EUR",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log("ORDER", order);
          // this.timeoutHandle = setTimeout(() => {
          //   setCart(null);
          // }, 5000);
        },
        onError: (err) => {
          setError(err);
          console.error("ERROR", err);
        },
      })
      .render(paypalRef.current);
  }, [items]);

  if (paidFor) {
    orderApi.createOrders(items, user, quantity);
    return (
      <div>
        <div>Thanks for making the purchase.</div>
      </div>
    );
  }

  if (error) {
    return <div>Error in processing order. Please Retry again</div>;
  }

  return (
    <div>
      {/* <ListGroup> */}
      {/* {items.map((product) => ( */}
      {/* <ListGroupItem key={items.title + items.price}>
            {items.title} - {items.price}
          </ListGroupItem> */}
      {/* ))} */}
      {/* </ListGroup> */}
      <div>Total - EUR. {total}</div>
      <div ref={paypalRef} />
    </div>
  );
}

export default PayWithPayPal;
