import RecipeForm from "../components/RecipeForm";
import { useNavigation } from '@react-navigation/native';
const EditRecipe = ({route}) => {
    const data  = route?.params;

  // Placeholder for a function to create a recipe

  const navigation = useNavigation();

  return (
    <RecipeForm checkAdd = {false}label="Edit" recipe = {data}/>
  );
};


export default EditRecipe;
