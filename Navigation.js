import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityMaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import RecipeHome from "./pages/RecipeHome";
import RecipePage from "./pages/RecipePage";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import CookbookHome from "./pages/CookbookHome";
import GroceryList from "./pages/GroceryList";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Toolbar from "./components/Toolbar";
import RecipeToolbar from "./components/RecipeToolbar";

export default function Navigation() {
  const [session, setSession] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      error
        ? console.error("Error fetching session:", error.message)
        : setSession(session);
    };

    fetchSession();

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  const handlePress = (itemName, props) => {
    if (itemName !== "Sign Out") {
      setActiveItem(itemName);
      props.navigation.navigate(itemName);
      return;
    }
    signOut();
  };

  const icon = (type, color, size, name) => {
    return type === "Community" ? (
      <CommunityMaterialIcon name={name} size={size} color={color} />
    ) : (
      <MaterialIcon name={name} size={size} color={color} />
    );
  };

  const renderItem = (label, itemName, type, props, iconName) => (
    <DrawerItem
      label={label}
      onPress={() => handlePress(itemName, props)}
      activeBackgroundColor="#D9D9D9"
      inactiveBackgroundColor="white"
      inactiveTintColor="#000000"
      activeTintColor="#C0452A"
      focused={activeItem === itemName}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#AEAEAE",
        paddingBottom: 10,
      }}
      icon={() => icon(type, "black", 20, iconName)}
    />
  );

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View
          style={{
            height: 150,
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#D75B3F",
            paddingTop: 0,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: "#FFFFFF",
              paddingBottom: "5%",
            }}
          >
            RecipeShare
          </Text>
        </View>
        {renderItem(
          "My Recipes",
          "RecipeHome",
          "Community",
          props,
          "silverware"
        )}
        {renderItem(
          "Favourited Recipes",
          "FavouriteRecipes",
          "Community",
          props,
          "cards-heart"
        )}
        {renderItem(
          "Cookbooks",
          "CookbookHome",
          "Community",
          props,
          "book-open-page-variant-outline"
        )}
        {renderItem(
          "Grocery List",
          "Grocery List",
          "Community",
          props,
          "cart-outline"
        )}
        {renderItem("Account", "Account", "", props, "account-circle")}
        {renderItem("Settings", "Settings", "", props, "settings")}
        {renderItem("Sign Out", "Sign Out", "Community", props, "logout")}
      </DrawerContentScrollView>
    );
  }

  const Stack = createNativeStackNavigator();

  const RecipeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="RecipeHome"
          component={RecipeHome}
          options={{ header: () => <Toolbar title={"My Recipes"}/> }} 
        />
        <Stack.Screen 
          name="RecipePage" 
          component={RecipePage}
          options={{ header: () => <RecipeToolbar /> }}
        />
      </Stack.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="RecipeStack"
              component={RecipeStack}
              options={{ headerShown: false }}  // Disable duplicate header, already in Stack
            />
            <Drawer.Screen
              name="FavouriteRecipes"
              component={FavouriteRecipes}
              options={{ header: () => <Toolbar title={"Favourites"} moreOptions={true}/> }}
            />
            <Drawer.Screen
              name="CookbookHome"
              component={CookbookHome}
              options={{ header: () => <Toolbar title={"Cookbooks"} /> }}
            />
            <Drawer.Screen
              name="Grocery List"
              component={GroceryList}
              options={{ header: () => <Toolbar title={"Grocery List"} /> }}
            />
            <Drawer.Screen
              name="Account"
              component={Profile}
              options={{ header: () => <Toolbar title={"Account"} showSearch={false} /> }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{ header: () => <Toolbar title={"Settings"} showSearch={false} /> }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    unmountOnBlur: true,
    drawerActiveBackgroundColor: "#D9D9D9",
    drawerInactiveBackgroundColor: "white",
    drawerActiveTintColor: "#C0452A",
    drawerInactiveTintColor: "#000000",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#A7CCA2", // Set the background color of the header for this screen
    },
  },
});
