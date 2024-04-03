import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Adjust the path as necessary

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [userId, setUserId] = useState(null);

  // Authentication state listener
  useEffect(() => {
    // Attempt to recover the session from localStorage
    const session = supabase.auth.session();
    setUserId(session?.user?.id);

    // Subscribe to future authentication changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id);
    });

    // Cleanup subscription on component unmount
    return () => {
      listener.unsubscribe();
    };
  }, []);

  // Load favourites from Supabase for the current user
  useEffect(() => {
    if (userId) {
      const loadFavourites = async () => {
        const { data: favs, error } = await supabase
          .from('user_favourites')
          .select('recipe_id')
          .eq('user_id', userId)
          .eq('favorited', true); // Fetch only favorited=true rows
        if (!error && favs) {
          // Map and store just the recipe IDs
          setFavourites(favs.map(fav => fav.recipe_id));
        } else {
          console.error(error);
        }
      };
      loadFavourites();
    }
  }, [userId]);

  const addFavourite = async (recipeId) => {
    if (!userId) return; // Ensure user is authenticated
    const { data, error } = await supabase
      .from('user_favourites')
      .insert([{ recipe_id: recipeId, user_id: userId, favorited: true }]);
    if (!error && data) {
      // Add the new favorite recipe ID to state
      setFavourites(current => [...current, recipeId]);
    } else {
      console.error(error);
    }
  };

  const removeFavourite = async (recipeId) => {
    if (!userId) return; // Ensure user is authenticated
    const { error } = await supabase
      .from('user_favourites')
      .update({ favorited: false }) // Set favorited to false
      .match({ recipe_id: recipeId, user_id: userId });
    if (!error) {
      // Remove the recipe ID from state
      setFavourites(current => current.filter(id => id !== recipeId));
    } else {
      console.error(error);
    }
  };

  const isFavourited = (recipeId) => {
    // Check if the recipe ID is in the favorites array
    return favourites.includes(recipeId);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourited }}>
      {children}
    </FavouritesContext.Provider>
  );
};