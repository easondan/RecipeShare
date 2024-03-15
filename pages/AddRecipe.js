import RecipeForm from "../components/RecipeForm";
import { useNavigation } from '@react-navigation/native';
const AddRecipe = () => {
  // Placeholder for a function to create a recipe
  const navigation = useNavigation();
  const createRecipe = () => {
    console.log("Creating recipe with form data:", formData);
    navigation.navigate("RecipeHome");
  };

  return (
    <RecipeForm onPress = {createRecipe} label="Create"/>
  );
};


export default AddRecipe;
