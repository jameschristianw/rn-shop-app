import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        "https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!result.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await result.json();
      // console.log("responseData:", JSON.stringify(responseData, null, 2));

      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const result = await fetch(
      `https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!result.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const result = await fetch(
      "https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const responseData = await result.json();

    console.log(("responseData:", JSON.stringify(responseData, null, 2)));

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const result = await fetch(
      `https://rn-guide-da904-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      updatedProductData: { title, description, imageUrl },
    });
  };
};
