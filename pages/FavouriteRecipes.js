import { Card } from '../components/Card';
import { useFavourites } from '../components/FavouritesContext';

const FavouriteRecipes = () => {
  const { favourites } = useFavourites(); // Use the hook to get the current list of favourites

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {favourites.map((recipe, i) => (
          <View key={i}>
            <Card data={recipe} navigate={true} type="Recipe" />
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
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  }
});

export default FavouriteRecipes;
