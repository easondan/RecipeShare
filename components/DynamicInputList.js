// DynamicInputList.js
import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DynamicInputList = ({ placeholder, items, setItems }) => {
  const handleAddField = () => {
    const newKey = (items.length + 1).toString();
    setItems([...items, { key: newKey, value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  let i = 0;
  const handleChange = (text, index) => {
    const newItems = [...items];
    newItems[index].value = text;
    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      <Text>{placeholder}</Text>
      {items.map((item, index) => {
        return (
        <View key={i=i+1} style={styles.inputContainer}>
          <TextInput
            key={i=i+1}
            value={typeof(item)==='object'?item.value:item}
            onChangeText={(text) => handleChange(text, index)}
            placeholder={placeholder}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveField(index)}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>)
})}
      <View style={styles.addButtonContainer}>
        <Button title={`Add ${placeholder}`} onPress={handleAddField} />
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
    alignItems: "center", // Ensure content is vertically centered
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: 50,
    marginLeft: 5,
  },
  removeButton: {
    marginRight: 10,
    padding: 10,
  },
  addButtonContainer: {
    width: "95%",
    // marginTop: 10,
    // marginLeft: "auto",
    // marginRight: "auto",
  },
});

export default DynamicInputList;
