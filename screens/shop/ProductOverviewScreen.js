import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/action/cart";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";

const ProductOverviewScreen = (props) => {
  const { navigation } = props;
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

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
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="Add To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
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
