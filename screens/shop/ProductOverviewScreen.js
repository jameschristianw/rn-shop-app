import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/action/cart";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverviewScreen = (props) => {
  const { navigation } = props;
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <View>
      <StatusBar style="auto" />
      <FlatList
        data={products}
        // keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {
              navigation.navigate("ProductDetailScreen", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              });
            }}
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductOverviewScreen;
