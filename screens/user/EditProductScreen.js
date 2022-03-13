import React, { useCallback, useEffect, useReducer } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/action/products";
import Input from "../../components/UI/Input";

const FORM_INPUT_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        isFormValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
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
    if (!formState.isFormValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { text: "OK" },
      ]);
      return;
    }
    if (edittedProduct)
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    else
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    navigation.pop();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setParams({ saveProduct: () => submitHandler() });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            keyboardType={"default"}
            autoCapitalize={"sentences"}
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={edittedProduct ? edittedProduct.title : ""}
            initialIsValid={!!edittedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid image url!"
            keyboardType={"default"}
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={edittedProduct ? edittedProduct.imageUrl : ""}
            initialIsValid={!!edittedProduct}
            required
          />
          {edittedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType={"decimal-pad"}
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0}
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            keyboardType={"default"}
            autoCapitalize={"sentences"}
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={edittedProduct ? edittedProduct.description : ""}
            initialIsValid={!!edittedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
