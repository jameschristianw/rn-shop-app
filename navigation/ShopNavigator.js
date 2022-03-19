import { Platform } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const ProductStack = createStackNavigator();
const OrderStack = createStackNavigator();
const UserStack = createStackNavigator();
const AuthStack = createStackNavigator();

const ShopDrawer = createDrawerNavigator();

const headerOptions = (navigation) => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },

    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerBackTitleStyle: { fontFamily: "open-sans" },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const ProductNavigator = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        component={ProductOverviewScreen}
        name="ProductOverviewScreen"
        options={({ route, navigation }) => ({
          ...headerOptions(navigation),
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
      <ProductStack.Screen
        component={ProductDetailScreen}
        name="ProductDetailScreen"
        options={({ route, navigation }) => ({
          ...headerOptions(navigation),
          title: "Product Detail",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={
                  Platform.OS === "android"
                    ? "md-arrow-back"
                    : "ios-chevron-back"
                }
                onPress={() => {
                  navigation.pop();
                }}
              />
            </HeaderButtons>
          ),
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
      <ProductStack.Screen
        component={CartScreen}
        name="CartScreen"
        options={({ route, navigation }) => ({
          ...headerOptions,
          title: "My Cart",
        })}
      />
    </ProductStack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        component={OrdersScreen}
        name="OrderScreen"
        options={({ route, navigation }) => ({
          ...headerOptions(navigation),
          title: "My Orders",
        })}
      />
    </OrderStack.Navigator>
  );
};

const UserNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        component={UserProductScreen}
        name="UserProductScreen"
        options={({ route, navigation }) => ({
          ...headerOptions(navigation),
          title: "My Products",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Create"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("EditProductScreen");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <UserStack.Screen
        component={EditProductScreen}
        name="EditProductScreen"
        options={({ route, navigation }) => ({
          ...headerOptions(navigation),
          title: "Edit Product",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={
                  Platform.OS === "android"
                    ? "md-arrow-back"
                    : "ios-chevron-back"
                }
                onPress={() => {
                  navigation.pop();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                }
                onPress={() => route.params.saveProduct()}
              />
            </HeaderButtons>
          ),
        })}
      />
    </UserStack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="login"
        component={AuthScreen}
        options={{ title: "Authenticate" }}
      />
    </AuthStack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <ShopDrawer.Navigator
        screenOptions={{
          drawerActiveTintColor: Colors.primary,
          headerShown: false,
        }}
      >
        <ShopDrawer.Screen
          name="Home"
          component={ProductNavigator}
          options={() => ({
            drawerIcon: (config) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-home" : "ios-home"}
                size={23}
                color={config.color}
              />
            ),
          })}
        />
        <ShopDrawer.Screen
          name="Orders"
          component={OrderNavigator}
          options={() => ({
            drawerIcon: (config) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={config.color}
              />
            ),
          })}
        />
        <ShopDrawer.Screen
          name="Admin"
          component={UserNavigator}
          options={() => ({
            drawerIcon: (config) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={config.color}
              />
            ),
          })}
        />
      </ShopDrawer.Navigator> */}
    </NavigationContainer>
  );
};

export default ShopNavigator;
