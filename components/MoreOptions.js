import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const MoreOptions = ({ options, onSelectOption }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.option}
          onPress={() => onSelectOption(option)}
        >
          <Text style={[styles.option, option.label === 'Delete' ? styles.deleteOption : '']}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E2E2",
    position: "absolute",
    top: 50,
    right: 10,
    // TODO need an iOS pal to check how the shadow looks
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  option: {
    margin: 10,
    marginBottom: 0,
    fontSize: 18
  },
  deleteOption: {
    fontWeight: 'bold',
    marginBottom: 15,
    color: "#CE3535"
  },
});

export default MoreOptions;
