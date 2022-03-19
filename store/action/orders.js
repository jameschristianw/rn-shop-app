import { Order } from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        "https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json"
      );

      if (!result.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await result.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const result = await fetch(
      "https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await result.json();

    console.log(("responseData:", JSON.stringify(responseData, null, 2)));

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: responseData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
