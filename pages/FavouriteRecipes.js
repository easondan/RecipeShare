import { StyleSheet, SafeAreaView } from 'react-native';
// import { useFavourites } from '../components/FavouritesContext';
import React,{ useCallback,useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import RecipeGrid from '../components/RecipeGrid';

const FavouriteRecipes = () => {
  const [favourites,setFavourites] = useState([]);
  // const { favourites } = useFavourites(); // Use the hook to get the current list of favourites
  const fetchData = async () =>{
    const value = await supabase.auth.getUser();
    const {data:recipeIdData,error: recipeError} = await supabase.from('user_favourites').select('recipe_id').eq('user_id',value.data.user.id);
    
    const extractedIds = recipeIdData.map(item => item.recipe_id);
    const { data, error } = await supabase
  .from('recipes')
  .select()
  .in('id', extractedIds)
    setFavourites(data);
  }
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
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
