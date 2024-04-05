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
    top: 45,
    right: 15,
    // TODO need an iOS pal to check how the shadow looks
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
    gap: 5,
  },
  option: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    fontSize: 18,
    minWidth: 100,
  },
  deleteOption: {
    fontWeight: 'bold',
    color: "#CE3535"
  },
});

export default MoreOptions;
