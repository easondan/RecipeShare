import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export const RecipeCard = ({ recipeData }) => {

  const navigation = useNavigation();
  const handleRecipeClick = (recipeData) => {
    navigation.navigate('RecipePage', { recipeData });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleRecipeClick(recipeData)}>
      <Image source={{ uri: recipeData.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{recipeData.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
  },
});
