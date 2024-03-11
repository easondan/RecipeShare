import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const FormField = ({ label, value, onChangeText, multiline }) => {
  const inputContainerHeight =
    label === "Ingredients" || label === "Directions" ? 200 : 50;

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={[styles.inputContainer, { height: inputContainerHeight }]}>
        <TextInput
          style={styles.input}
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    width: "95%",
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: 50,
    marginLeft: 5,
  },
});

export default FormField;
