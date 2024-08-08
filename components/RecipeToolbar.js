import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MoreOptions from "./MoreOptions";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useNavigation } from "@react-navigation/native";
import DuplicateModal from './DuplicateModal';
import { supabase } from '../lib/supabase';

const RecipeToolbar = ({ route }) => {
  const { recipe } = route.params;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowMoreOptions] = useState(false); // State to control the visibility of the dropdown
  const options = [
    { id: 1, label: "Edit" },
    { id: 2, label: "Duplicate" },
    { id: 3, label: "Delete" },
    // Add more options as needed
  ];
  
  const [favourite, setFavourite] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [name,setName] = useState("");
  
  const navigation = useNavigation();

  const fetchFavourite = async () =>{
    const userValue = await supabase.auth.getUser();

    const {data,error} = await supabase.from("user_favourites").select().eq('user_id', userValue.data.user.id).eq('recipe_id',recipe.id);
    if(data.length !==0){
      setFavourite(true);
    }
  }
  useEffect(() => {
    fetchFavourite();
  }, [recipe]);

  const toggleFavourite = async () => {
    const userValue = await supabase.auth.getUser();

      if (favourite) {
        setFavourite(!favourite);
        const {data,error} = await supabase.from("user_favourites").delete().eq('user_id', userValue.data.user.id).eq('recipe_id',recipe.id);   
      } else {
        setFavourite(!favourite);
        const {data,error} = await supabase.from("user_favourites").insert({user_id:userValue.data.user.id,recipe_id: recipe.id});
      }

    
  };

  const toggleOptions = () => {
    setShowMoreOptions(!showOptions);
  };

  const handleSelectOption = (option) => {
    setShowMoreOptions(false);
    switch (option.label) {
      case 'Edit':
        navigation.navigate("EditRecipePage",recipe);
        break;
      case 'Duplicate':
        setShowCopyModal(true);
        break;
      case 'Delete':
        // Show delete confirmation prompt
        setShowDeleteModal(true);
    }
  };

  const handleDelete = async () => {
    // TODO backend stuff to delete recipe record
    setShowDeleteModal(false);
    console.log("BitcH",recipe.cookbookId);

    if(recipe.cookbookId!==undefined){
    const { error } = await supabase
    .from('cookbook_recipes')
    .delete()
    .eq('recipe_id', recipe.id)
    .eq('cookbook_id',recipe.cookbookId)
    navigation.navigate("CookbookHome");  // Return to previous page
    }else{
      await supabase
      .from('cookbook_recipes')
      .delete()
      .eq('recipe_id', recipe.id)
      await supabase
      .from('user_favourites')
      .delete()
      .eq('recipe_id', recipe.id)
      await supabase
      .from('recipes')
      .delete()
      .eq('id', recipe.id)
      navigation.navigate("RecipeHome");  // Return to previous page
    // const { error } = await supabase
    // .from('recipes')
    // .delete()
    // .eq('id', recipe.id)
    // if(error){
    //   Alert.alert("Unable to Delete Recipe");
    // }else{

    // }
    }

    console.log(recipe);
  }

  const handleCancel = () => {
    setShowDeleteModal(false);
    setShowCopyModal(false);
  }

  const handleCopy = async (name) =>{
    const {id,created_at,... newData} = recipe;

    const value = await supabase.auth.getUser();
    newData.owner_id = value.data.user.id;
    newData.name = name==="" ? newData.name+" Copy" : name;

    const { error } = await supabase
    .from('recipes')
    .insert(newData)
    if(error){
      Alert.alert("Unable to Copy Recipe");
    }else{
      setShowCopyModal(false);
    navigation.navigate("RecipeHome");  // Return to previous page
    }
  }

  const handleAddToCookbooks = () => {
    navigation.navigate("RecipeSelectCookbooks", { recipe : recipe })
  }

  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity style={styles.navIcon} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <View style={styles.iconPadding}>
          <FAIcon name="chevron-left" size={28} color="black" />
        </View>
      </TouchableOpacity>

      <View style={styles.iconGroup}>
        {/* <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.iconPadding}>
            <MaterialIcon name="cart" size={28} color="black" />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => handleAddToCookbooks()} activeOpacity={0.7}>
          <View style={styles.iconPadding}>
            <MaterialIcon name="book-plus" size={30} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavourite} activeOpacity={0.7}>
          <View style={styles.iconPadding}>
            <MaterialIcon name={favourite ? "heart" : "heart-outline"} size={32} color="#D75B3F" />
          </View>
        </TouchableOpacity>
        {showOptions && (
          <MoreOptions
            options={options}
            onSelectOption={handleSelectOption}
          />
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={toggleOptions}>
          <View style={styles.iconPadding}>
            <SimpleIcon name="options-vertical" size={26} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <ConfirmDeleteModal 
        isVisible={showDeleteModal} 
        onCancel={() => handleCancel()}
        onDelete={() => handleDelete()}
        msg={`Are you sure you want to delete the recipe "${recipe.name}" ?\n\nThis action cannot be undone.`}
      />
      <DuplicateModal type = "Recipe" isVisible={showCopyModal} onCancel={()=>handleCancel()} onConfirm={()=>handleCopy(name)} name = {name}setName={setName}/>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
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
    left: 20,
    zIndex: 1,
  },
  iconGroup: {
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    flex: 1,
    right: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5
  },
  iconPadding: {
    padding: 8,
    // backgroundColor: 'purple'
  }
});

export default RecipeToolbar;
