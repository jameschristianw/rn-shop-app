import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/action/cart";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";
import { fetchProducts } from "../../store/action/products";

const ProductOverviewScreen = (props) => {
  const { navigation } = props;
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetailScreen", {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    console.log("Load Products");
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener("focus", loadProducts);

    return willFocusSub;
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred</Text>
        <Button
          title="Try again"
          onPress={() => loadProducts()}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
