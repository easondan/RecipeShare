import { StyleSheet, SafeAreaView } from 'react-native';
import { useFavourites } from '../components/FavouritesContext';
import RecipeGrid from "../components/RecipeGrid";

const FavouriteRecipes = () => {
  const { favourites } = useFavourites(); // Use the hook to get the current list of favourites
  
  return (
    <SafeAreaView style={styles.container}>
      <RecipeGrid recipes={favourites} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default FavouriteRecipes;
