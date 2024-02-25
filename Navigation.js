import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import CommunityMaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import Cookbook from "./pages/Cookbook";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import GroceryList from "./pages/GroceryList";
import SearchRecipe from "./pages/SearchRecipe";
import SearchCookBooks from "./pages/SearchCookbooks";
import SearchComponent from "./components/SearchComponent";

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
              fontFamily: "Purtian",
            }}
          >
            RecipeShare
          </Text>
        </View>
        {renderItem(
          "My Recipes",
          "My Recipe",
          "Community",
          props,
          "silverware"
        )}
        {renderItem(
          "Favourited Recipes",
          "Favourited Recipies",
          "Community",
          props,
          "cards-heart"
        )}
        {renderItem(
          "Cookbooks",
          "Cookbooks",
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

  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="My Recipe"
              component={Home}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() =>
                      navigation.navigate("SearchRecipe", {
                        searchData: "myRecipe",
                      })
                    }
                  >
                    <MaterialIcon name="search" size={30} color="black" />
                  </TouchableOpacity>
                ),
                ...styles.options,
              })}
            />
            <Drawer.Screen
              name="SearchRecipe"
              component={SearchRecipe}
              options={({ navigation }) => ({
                title: "Search Recipe",
                header: () => (
                  <SearchComponent onPress={() =>  navigation.navigate("My Recipe")} navigation = {navigation} searchValue = "recipe"/>
                ),
                ...styles.options,
              })}
            />
            <Drawer.Screen
              name="SearchCookbook"
              component={SearchCookBooks}
              options={({ navigation }) => ({
                title: "Search Cookbooks",
                header: () => (
                  <SearchComponent onPress={() => navigation.navigate("Cookbooks")} navigation = {navigation} searchValue = "cookbook"/>
                ),
                ...styles.options,
              })}
            />
            <Drawer.Screen
              name="Cookbooks"
              component={Cookbook}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() =>
                      navigation.navigate("SearchCookbook", {
                        searchData: "Cookbook",
                      })
                    }
                  >
                    <MaterialIcon name="search" size={30} color="black" />
                  </TouchableOpacity>
                ),
                ...styles.options,
              })}
            />
            <Drawer.Screen
              name="Grocery List"
              component={GroceryList}
              options={styles.options}
            />
            <Drawer.Screen
              name="Account"
              component={Profile}
              options={styles.options}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={styles.options}
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
