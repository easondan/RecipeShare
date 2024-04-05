import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { Text, View, TouchableOpacity, StyleSheet, Platform, Dimensions} from 'react-native'
import CommunityMaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawer = ({ navigation }) => {

  const [activeScreen, setActiveScreen] = useState('RecipeHome');

  const handleDrawerClick = (screenName) => {
    navigation.navigate(screenName);
    setActiveScreen(screenName);
  }
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  const CustomDrawerItem = ({ label, screenName, isActive, icon }) => {
    return (
      <TouchableOpacity 
        style={[styles.drawerItem, isActive && styles.activeItem]} 
        onPress={() => handleDrawerClick(screenName)}
        activeOpacity={0.8}
      >
        {React.cloneElement(icon, {color: isActive ? '#C0452A' : 'black'})}
        <Text style={[styles.drawerText, isActive && styles.activeText]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View styles={styles.drawer}>
      <View style={styles.topBar}>
        <Text style={styles.title}>RecipeShare</Text>
      </View>
      <CustomDrawerItem 
        label={"My Recipes"} 
        screenName={'RecipeHome'} 
        isActive={activeScreen === 'RecipeHome'}
        icon={<CommunityMaterialIcon color="black" size={24} name="silverware"/>}
      />
      <CustomDrawerItem 
        label={"Favourited Recipes"} 
        screenName={'FavouriteRecipes'} 
        isActive={activeScreen === 'FavouriteRecipes'}
        icon={<FontAwesomeIcon color="black" size={24} name="heart"/>}
      />
      <CustomDrawerItem 
        label={"Cookbooks"} 
        screenName={'CookbookHome'} 
        isActive={activeScreen === 'CookbookHome'}
        icon={<CommunityMaterialIcon color="black" size={24} name="book-open-page-variant-outline"/>}
      />
      {/* <CustomDrawerItem 
        label={"Grocery List"} 
        screenName={'GroceryList'} 
        isActive={activeScreen === 'GroceryList'}
        icon={<CommunityMaterialIcon color="black" size={24} name="cart-outline"/>}
      /> */}
      <CustomDrawerItem 
        label={"Account"} 
        screenName={'Account'} 
        isActive={activeScreen === 'Account'}
        icon={<Icon color="black" size={24} name="person-circle-outline"/>}
      />
      <CustomDrawerItem 
        label={"Settings"} 
        screenName={'Settings'} 
        isActive={activeScreen === 'Settings'}
        icon={<CommunityMaterialIcon color="black" size={24} name="cog"/>}
      />
      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => signOut()}
        activeOpacity={0.8}
      >
        <FontAwesomeIcon color="black" size={24} name="sign-out"/>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  drawer: {
    width: "60%"
  },
  topBar: {
    height: Platform.OS === 'ios'? Dimensions.get("screen").height/7:100,
    backgroundColor: "#D75B3F",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    letterSpacing: 2,
    fontSize: 28,
    paddingTop: Platform.OS === 'ios' ? 25:0
  },
  drawerText: {
    color: "black",
    fontSize: 18
  },
  drawerItem: {
    height: 60,
    marginTop: 5,
    marginBottom: 0,
    paddingLeft: 20,  
    flexDirection: "row",
    alignItems: "center",
    gap: 20 // Gap between icon & label
  },
  activeItem: {
    backgroundColor: "#E7E7E7",
  },
  activeText: {
    color: '#C0452A'
  }
})

export default CustomDrawer;
