import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MoreOptions from "./MoreOptions";
import { useNavigation } from "@react-navigation/native";
import { useFavourites } from './FavouritesContext';
import SelectCookbookModal from '../components/SelectCookBookModel'; // This is a new component you will create


const CookBookToolBar = () => {
  
  const [showOptions, setShowMoreOptions] = useState(false); // State to control the visibility of the dropdown
  const options = [
    { id: 1, label: "Edit" },
    { id: 2, label: "Duplicate" },
    { id: 3, label: "Delete" },
    // Add more options as needed
  ];

  const navigation = useNavigation();

  const toggleOptions = () => {
    setShowMoreOptions(!showOptions);
  };

  const handleSelectOption = (option) => {
    // console.log("Selected option:", option);
    // // Will need to pass in data in order to know what recipe we're working with
    // console.log(route.params);
  };
  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity style={styles.navIcon} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <FAIcon name="chevron-left" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.iconGroup}>
        {showOptions && (
          <MoreOptions
            options={options}
            onSelectOption={handleSelectOption}
          />
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={toggleOptions} style={styles.dropIcon}>
          <SimpleIcon name="options-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    toolbar: {
      backgroundColor: "#A7CCA2",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between", // Adjusted for spacing out items
      height: Platform.OS === "ios" ? Dimensions.get("screen").height / 8 : 75,
      paddingHorizontal: 25, // Add horizontal padding
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
      paddingTop: Platform.OS === "ios" ? 30 : 0,
    },
    iconGroup: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    dropIcon: {
        paddingTop: 30
    }
  });

export default CookBookToolBar;
