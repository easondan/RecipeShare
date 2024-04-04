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
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import DuplicateModal from './DuplicateModal';
import { supabase } from '../lib/supabase'

const CookbookToolbar = ({ route }) => {
  
  const [showOptions, setShowMoreOptions] = useState(false); // State to control the visibility of the dropdown
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const options = [
    { id: 1, label: "Add Recipes" },
    { id: 2, label: "Duplicate" },
    { id: 3, label: "Delete" },
    // Add more options as needed
  ];
  const navigation = useNavigation();
  const { cookbook } = route?.params;

  const toggleOptions = () => {
    setShowMoreOptions(!showOptions);
  };

  const handleSelectOption = async(option) => {
    setShowMoreOptions(false);
    switch (option.label) {
      case 'Add Recipes':
        const value = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('recipes')
          .select()
          .eq('owner_id', value.data.user.id);
        navigation.navigate("CookbookSelectRecipes", { cookbook : cookbook, recipes : data});
        break;
      case 'Duplicate':
        setShowCopyModal(true);
        break;
      case 'Delete':
        // Show delete confirmation prompt
        setShowDeleteModal(true);
        break;
    }
  };
  
  const handleCancel = () => {
    setShowCopyModal(false);
    setShowDeleteModal(false);
  }

  const handleDelete = () => {
    setShowDeleteModal(false);
    navigation.navigate("CookbookHome");
  }

  const handleCopy= () => {
    setShowCopyModal(false);
    navigation.navigate("CookbookHome");
  }

  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate("CookbookHome")} activeOpacity={0.7}>
        <FAIcon name="chevron-left" size={25} color="black" />

      </TouchableOpacity>
      <Text style = {styles.toolbarText}>{cookbook.name}</Text>
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
      <ConfirmDeleteModal 
        isVisible={showDeleteModal} 
        onCancel={() => handleCancel()}
        onDelete={() => handleDelete()}
        msg={`Are you sure you want to delete the Cookbook "${cookbook.name}" ?\n\nThis action cannot be undone.`}
      />
      <DuplicateModal type = "Cookbook" isVisible={showCopyModal} onCancel={()=>handleCancel()} onConfirm={()=>handleCopy()}/>
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
    toolbarText:{
      fontSize: 26,
      justifyContent:'center',
      alignItems:'center',
      paddingTop: Platform.OS === 'ios' ? 30:0,
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

export default CookbookToolbar;
