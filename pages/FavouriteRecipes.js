import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { RecipeCard } from "../components/RecipeCard";
import { recipes } from "../recipes.json";

const FavouriteRecipes = () => {
  return (
    // Populating with all recipes for nav testing
    // TODO update when implementing favourites
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {
          recipes.map((recipe, i) => (
            <View key={i} style={styles.gridItem}>
              <RecipeCard recipeData={recipe} />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

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
    justifyContent: 'space-between',
  },
  gridItem: {
    marginBottom: 15
  }
});

export default FavouriteRecipes;
