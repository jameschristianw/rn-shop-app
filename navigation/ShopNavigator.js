import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";

const ProductNavigator = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },

  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerBackTitleStyle: { fontFamily: "open-sans" },
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ProductNavigator.Navigator>
        <ProductNavigator.Screen
          component={ProductOverviewScreen}
          name="ProductOverviewScreen"
          options={({ route, navigation }) => ({
            ...headerOptions,
            title: "All Products",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                    navigation.navigate("CartScreen");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <ProductNavigator.Screen
          component={ProductDetailScreen}
          name="ProductDetailScreen"
          options={({ route, navigation }) => ({
            ...headerOptions,
            title: "Product Detail",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                  onPress={() => {
                    navigation.navigate("CartScreen");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <ProductNavigator.Screen
          component={CartScreen}
          name="CartScreen"
          options={({ route, navigation }) => ({
            ...headerOptions,
            title: "My Cart",
          })}
        />
      </ProductNavigator.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;
