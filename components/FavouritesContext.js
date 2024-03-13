import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from storage
  useEffect(() => {
    const loadFavourites = async () => {
      const favs = await AsyncStorage.getItem('favourites');
      if (favs) setFavourites(JSON.parse(favs));
    };
    loadFavourites();
  }, []);

  // Save favourites to storage
  useEffect(() => {
    AsyncStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (recipe) => {
    setFavourites((current) => {
      const exists = current.some(r => r.name === recipe.name); // Check using name
      return exists ? current : [...current, recipe];
    });
  };
  
  const removeFavourite = (recipeName) => {
    setFavourites((current) => current.filter((r) => r.name !== recipeName)); // Use name for comparison
  };
  
  const isFavourited = (recipeName) => {
    return favourites.some((r) => r.name === recipeName); // Check using name
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourited }}>
      {children}
    </FavouritesContext.Provider>
  );
};
