import RecipeForm from "../components/RecipeForm";
import { useNavigation } from "@react-navigation/native";
const AddRecipe = () => {
  // Placeholder for a function to create a recipe
  const navigation = useNavigation();

  return <RecipeForm checkAdd={true} label="Create" />;
};

export default AddRecipe;
