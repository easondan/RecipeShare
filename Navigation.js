import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import RecipeHome from "./pages/RecipeHome";
import RecipePage from "./pages/RecipePage";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import CookbookHome from "./pages/CookbookHome";
import GroceryList from "./pages/GroceryList";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Toolbar from "./components/Toolbar";
import RecipeToolbar from "./components/RecipeToolbar";

import CustomDrawer from "./components/CustomDrawer";

export default function Navigation() {
  
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    // TODO want to review this, why are the functions defined with the use effect?
    // Should be dependent on "session" state no?
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

  const Drawer = createDrawerNavigator();
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

  return (
    <View style={styles.root}>
      {session && session.user ? (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="RecipeHome"
            drawerContent={({navigation}) => <CustomDrawer navigation={navigation} />}
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
              name="GroceryList"
              component={GroceryList}
              options={{ header: () => <Toolbar title={"Grocery List"} /> }}
            />
            <Drawer.Screen
              name="Account"
              component={Account}
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
  root: {
    flex: 1,
  }
});
