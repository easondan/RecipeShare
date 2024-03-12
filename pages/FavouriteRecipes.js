import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { RecipeCard } from "../components/RecipeCard";
// Import useFavorites hook from your context
import { useFavorites } from '../components/FavoritesContext';

const FavouriteRecipes = () => {
  const { favorites } = useFavorites(); // Use the hook to get the current list of favorites

  // Determine the justifyContent value based on the number of favorites
  const justifyContentValue = favorites.length === 1 ? 'flex-start' : 'space-between';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.grid, { justifyContent: justifyContentValue }]}>
        {favorites.map((recipe, i) => (
          <View key={i} style={styles.gridItem}>
            <RecipeCard recipeData={recipe} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  gridItem: {
    marginBottom: 15,
  },
});

export default FavouriteRecipes;