import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { StyleSheet, SafeAreaView } from 'react-native';
import ActionButton from '../components/ActionButton';
import RecipeGrid from '../components/RecipeGrid';
import { recipes } from '../recipes.json';
import { supabase } from '../lib/supabase'
import { useState,useCallback } from 'react';

const RecipeHome = () => {
  const [userRecipeData,setRecipeData] = useState([]); 
 
  const fetchData=  async()=>{
    const value = await supabase.auth.getUser();
    setRecipeData([]);
    const { data, error } = await supabase
    .from('Recipes')
    .select().eq('user_id',value.data.user.id);
    setRecipeData(data);
    console.log(data)
  }
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  const navigation = useNavigation();
    const addRecipe = async () => {
    navigation.navigate('AddRecipePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecipeGrid recipes={userRecipeData} />
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
