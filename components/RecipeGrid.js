import { ScrollView, View, StyleSheet} from 'react-native';
import Card from './Card';

const RecipeGrid = ({ recipes = [] }) => {

  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {
        recipes.map((recipe, i) => (
          <View key={i}>
            <Card data={recipe} />
          </View>
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  }
});

export default RecipeGrid;
