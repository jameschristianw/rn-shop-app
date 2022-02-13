import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productReducers from "./store/reducers/products";
import cartReducers from "./store/reducers/cart";
import orderReducers from "./store/reducers/orders";

import ShopNavigator from "./navigation/ShopNavigator";

const rootReducers = combineReducers({
  products: productReducers,
  cart: cartReducers,
  orders: orderReducers,
});

const store = createStore(rootReducers);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [hasFontLoaded, setHasFontLoaded] = useState(false);

  if (!hasFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setHasFontLoaded(true);
        }}
        onError={(error) => {
          console.warn(error);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
