import React, { useEffect } from "react";
import { View, Button, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/action/products";

import ProductItem from "../../components/shop/ProductItem";

import Colors from "../../constants/Colors";

const UserProductScreen = (props) => {
  const { route, navigation } = props;
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (productId) => {
    navigation.navigate("EditProductScreen", { productId });
  };

  const deleteHandler = (itemData) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(itemData.item.id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(product) => product.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
              // selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={
              deleteHandler.bind(this, itemData)
              // dispatch(cartActions.addToCart(itemData.item));
            }
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UserProductScreen;
