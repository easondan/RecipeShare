import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs) setFavorites(JSON.parse(favs));
    };
    loadFavorites();
  }, []);

  // Save favorites to storage
  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe) => {
    setFavorites((current) => {
      const exists = current.some(r => r.name === recipe.name); // Check using name
      return exists ? current : [...current, recipe];
    });
  };
  
  const removeFavorite = (recipeName) => {
    setFavorites((current) => current.filter((r) => r.name !== recipeName)); // Use name for comparison
  };
  
  const isFavorited = (recipeName) => {
    return favorites.some((r) => r.name === recipeName); // Check using name
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
};