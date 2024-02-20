import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import Cookbook from "./pages/Cookbook";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import GroceryList from "./pages/GroceryList";

export default function App() {
  const [session, setSession] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(session);
      }
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
    setActiveItem(itemName);
    props.navigation.navigate(itemName);
  };
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
            justifyContent: "center",
            backgroundColor: "#D75B3F",
            paddingTop: 0,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "#D75B3F",
              paddingTop: "10%",
            }}
          >
            RecipeShare
          </Text>
        </View>
        <DrawerItem
          label="My Recipes"
          onPress={() => handlePress("My Recipe", props)}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "My Recipe"}
          style={{ borderBottomWidth: 1, borderBottomColor: '#AEAEAE', paddingBottom:10}}

        />

        <DrawerItem
          label="Cookbooks"
          onPress={() => handlePress("Cookbooks", props)}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "Cookbooks"}
        />
        <DrawerItem
          label="Grocery List"
          onPress={() => handlePress("Grocery List", props)}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "Grocery List"}
          style={{ borderBottomWidth: 1, borderBottomColor: '#AEAEAE', paddingBottom:10}}
        />
        <DrawerItem
          label="Account"
          onPress={() => handlePress("Account", props)}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "Account"}
        />
        <DrawerItem
          label="Settings"
          onPress={() => handlePress("Settings", props)}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "Settings"}
          style={{ borderBottomWidth: 1, borderBottomColor: '#AEAEAE', paddingBottom:10}}
        />
        <DrawerItem
          label="Sign Out"
          onPress={() => signOut()}
          activeBackgroundColor="#D9D9D9"
          inactiveBackgroundColor="white"
          inactiveTintColor="#000000"
          activeTintColor="#C0452A"
          focused={activeItem === "Sign Out"}
        />
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
              options={styles.options}
            />
            <Drawer.Screen
              name="Cookbooks"
              component={Cookbook}
              options={styles.options}
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
  },
});
