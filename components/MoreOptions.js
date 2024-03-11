import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const MoreOptions = ({ options, onSelectOption }) => {
  return (
    <View
      style={[
        // Jank cause the Dropdown wouldn't move below the toolbar
        styles.container,
        {
          width: 150,
          height: 80 + options.length * 20,
          bottom: -80 - options.length * 20,
        },
      ]}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => onSelectOption(option)}
        >
          <Text
            style={
              option.label === "Delete"
                ? styles.optionDelete.label
                : styles.option.label
            }
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    backgroundColor: "#E2E2E2",
    position: "absolute",
    right: 15,
  },
  option: {
    paddingBottom: 10,
    label: {
      fontSize: 18,
    },
  },
  optionDelete: {
    paddingBottom: 10,
    label: {
      fontSize: 18,
      fontFamily: "Amiko",
      color: "#CE3535",
    },
  },
});

export default MoreOptions;
