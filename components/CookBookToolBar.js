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
    { id: 2, label: "Delete" },
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
      case 'Delete':
        // Show delete confirmation prompt
        setShowDeleteModal(true);
        // const {error: deleteError}  = await supabase.
        break;
    }
  };
  
  const handleCancel = () => {
    setShowCopyModal(false);
    setShowDeleteModal(false);
  }

  const handleDelete = async () => {
    setShowDeleteModal(false);
    // console.log(cookbook);
    const { error:deleteErrorRecipe } = await supabase
      .from('cookbook_recipes')
      .delete()
      .eq('cookbook_id', cookbook.id)
      const { error:deleteError } = await supabase
      .from('shared_cookbooks')
      .delete()
      .eq('cookbook_id', cookbook.id)
      const { error:deleteErrorCookbook } = await supabase
      .from('cookbooks')
      .delete()
      .eq('id', cookbook.id)
      // console.log(deleteError)
    navigation.navigate("CookbookHome");
  }

  const handleCopy= () => {
    setShowCopyModal(false);
    navigation.navigate("CookbookHome");
  }

  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate("CookbookHome")} activeOpacity={0.7}>
        <View style={styles.iconPadding}>
          <FAIcon name="chevron-left" size={25} color="black" />
        </View>
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
          <View style={styles.iconPadding}>
            <SimpleIcon name="options-vertical" size={26} color="black" />
          </View>
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
      paddingHorizontal: 20, // Add horizontal padding
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
    iconPadding: {
      padding: 10,
    }
  });

export default CookbookToolbar;
