export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6oCwY68x-zYQ0UwR2wpNoa_H2TMQ9C_8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Sign Up Not OK ==> Something went wrong!");
    }

    const resData = await response.json();
    console.log("signUp resData:", JSON.stringify(resData, null, 2));

    dispatch({ type: SIGN_UP });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6oCwY68x-zYQ0UwR2wpNoa_H2TMQ9C_8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login Not OK ==> Something went wrong!");
    }

    const resData = await response.json();
    console.log("login resData:", JSON.stringify(resData, null, 2));

    dispatch({ type: LOGIN });
  };
};
