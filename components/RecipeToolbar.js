import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome6";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import MoreOptions from "./MoreOptions";
import { useNavigation } from "@react-navigation/native";

const RecipeToolbar = ({ addRecipe, route }) => {
  const [showOptions, setShowMoreOptions] = useState(false); // State to control the visibility of the dropdown
  const navigation = useNavigation();

  const toggleOptions = () => {
    setShowMoreOptions(!showOptions);
  };

  const options = [
    { id: 1, label: "Edit" },
    { id: 2, label: "Duplicate" },
    { id: 3, label: "Delete" },
    // Add more options as needed
  ];
  const handleSelectOption = (option) => {
    console.log("Selected option:", option);
    // Will need to pass in data in order to know what recipe we're working with
    console.log(route.params);
  };
  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity
        style={styles.navIcon}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <FAIcon name="chevron-left" size={25} color="black" />
      </TouchableOpacity>
      {addRecipe ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS === "ios" ? 30 : 0,
          }}
        >
          <Text style={{ fontSize: 28 }}>Create Recipe</Text>
        </View>
      ) : (
        <View style={styles.iconGroup}>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon name="cart" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon name="book-plus" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon name="heart" size={30} color="#D75B3F" />
          </TouchableOpacity>
          {showOptions && (
            <MoreOptions
              options={options}
              onSelectOption={handleSelectOption}
            />
          )}
          <TouchableOpacity activeOpacity={0.7} onPress={toggleOptions}>
            <SimpleIcon name="options-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    marginTop: Platform.OS === "ios" ? 0 : 25,
    backgroundColor: "#A7CCA2",
    flexDirection: "row",
    alignItems: "center",
    height: Platform.OS === "ios" ? Dimensions.get("screen").height / 8 : 75,

    // TODO need an iOS pal to check how the shadow looks
    // TODO once status bar fixed, ensure shadow doesn't show "above" toolbar
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  navIcon: {
    position: "absolute",
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    left: 25,
    zIndex: 1,
  },
  iconGroup: {
    flex: 1,
    right: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    gap: 15,
  },
});

export default RecipeToolbar;
