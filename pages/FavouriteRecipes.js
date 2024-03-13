import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { RecipeCard } from "../components/RecipeCard";
import { useFavourites } from '../components/FavouritesContext';

const FavouriteRecipes = () => {
  const { favourites } = useFavourites(); // Use the hook to get the current list of favourites

  // Determine the justifyContent value based on the number of favourites
  const justifyContentValue = favourites.length === 1 ? 'flex-start' : 'space-between';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.grid, { justifyContent: justifyContentValue }]}>
        {favourites.map((recipe, i) => (
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
