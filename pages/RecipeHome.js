import { useNavigation } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import ActionButton from '../components/ActionButton';
import RecipeGrid from '../components/RecipeGrid';
import { recipes } from '../recipes.json';

const RecipeHome = () => {

  const navigation = useNavigation();
  const addRecipe = () => {
    navigation.navigate('AddRecipePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecipeGrid recipes={recipes} />
      <ActionButton onPress={addRecipe}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default RecipeHome;
