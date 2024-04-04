import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import RecipeHome from "./pages/RecipeHome";
import RecipePage from "./pages/RecipePage";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import CookbookHome from "./pages/CookbookHome";
import GroceryList from "./pages/GroceryList";
import CookbookPage from "./pages/CookbookPage";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Toolbar from "./components/Toolbar";
import RecipeToolbar from "./components/RecipeToolbar";
import AddRecipe from "./pages/AddRecipe";
import CustomDrawer from "./components/CustomDrawer";
import SearchToolbar from "./components/SearchToolbar";
import SearchResultPage from "./pages/SearchResultPage";
import CookbookToolbar from "./components/CookbookToolBar";
import EditRecipe from "./pages/EditRecipe";
import CookbookSelectRecipes from "./pages/CookbookSelectRecipes";
import RecipeSelectCookbooks from "./pages/RecipeSelectCookbooks";

export default function Navigation() {
  
  const [session, setSession] = useState(null);
  
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

  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: 'black',
      background: '#FAFAFA',
    },
  };
  
  const RecipeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="RecipeHome"
          component={RecipeHome}
          options={{ header: () => <Toolbar title={"My Recipes"} /> }} 
        />
        <Stack.Screen 
          name="FavouriteRecipes"
          component={FavouriteRecipes}
          options={{ header: () => <Toolbar title={"Favourites"} /> }} 
        />
        <Stack.Screen
          name="CookbookHome"
          component={CookbookHome}
          options={{ header: () => <Toolbar title={'Cookbooks'} showSearch={true} /> }}
        />
        <Stack.Screen 
          name="RecipePage" 
          component={RecipePage}
          options={({ route }) => ({ header: () => <RecipeToolbar route={route} /> })}
        />
        <Stack.Screen 
          name="AddRecipePage" 
          component={AddRecipe}
          options={{ header: () => <Toolbar title={'Add Recipe'} showMenuIcon={false} showSearch={false} /> }}
        />
        <Stack.Screen 
          name="EditRecipePage" 
          component={EditRecipe}
          options={{ header: () => <Toolbar title={'Edit Recipe'} showSearch={false} showMenuIcon={false} /> }}
        />
        <Stack.Screen
          name="CookbookSelectRecipes"
          component={CookbookSelectRecipes}
          options={ {header: () => <Toolbar title={'Add Recipes'} showMenuIcon={false} showSearch={false} />}}
        />
        <Stack.Screen
          name="RecipeSelectCookbooks"
          component={RecipeSelectCookbooks}
          options={ {header: () => <Toolbar title={'Add to Cookbooks'} showMenuIcon={false} showSearch={false} />}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <View style={styles.root}>
      {session && session.user ? (
        <NavigationContainer theme={customTheme}>
          <Drawer.Navigator
            initialRouteName="RecipeHome"
            drawerContent={({navigation}) => <CustomDrawer navigation={navigation} />}
          >
            <Drawer.Screen
              name="RecipeStack"
              component={RecipeStack}
              options={{ headerShown: false }}  // Disable duplicate header, already in Stack
            />
             <Stack.Screen
              name="CookbookPage"
              component={CookbookPage}
              options={({ route }) => ({ header: () => <CookbookToolbar route={route} /> })}
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
            <Drawer.Screen
              name="SearchPage"
              component={SearchResultPage}
              options={({ route }) => ({ header: () => <SearchToolbar route={route} /> })}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ):
          <Auth />
     }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#fff',
  }
});
