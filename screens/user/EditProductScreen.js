import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/action/products";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
  }
  return state;
};

const EditProductScreen = (props) => {
  const { route, navigation } = props;
  const { productId } = route.params || "";
  const edittedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: edittedProduct ? edittedProduct.title : "",
      imageUrl: edittedProduct ? edittedProduct.imageUrl : "",
      price: "",
      description: edittedProduct ? edittedProduct.description : "",
    },
    inputValidities: {
      title: edittedProduct ? true : false,
      imageUrl: edittedProduct ? true : false,
      price: edittedProduct ? true : false,
      description: edittedProduct ? true : false,
    },
    isFormValid: edittedProduct ? true : false,
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (!isTitleValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    if (edittedProduct)
      dispatch(
        productActions.updateProduct(productId, title, description, imageUrl)
      );
    else
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      );
    navigation.pop();
  }, [dispatch, productId, title, description, imageUrl, price, isTitleValid]);

  useEffect(() => {
    navigation.setParams({ saveProduct: () => submitHandler() });
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    formDispatch({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={textChangeHandler.bind(this, "title")}
            keyboardType={"default"}
            autoCapitalize={"sentences"}
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("onEndEditting")}
            onSubmitEditing={() => console.log("onSubmitEditting")}
          />
          {!isTitleValid && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        {edittedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={textChangeHandler.bind(this, "price")}
              keyboardType={"decimal-pad"}
              returnKeyType="next"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={textChangeHandler.bind(this, "description")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
