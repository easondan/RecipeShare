import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

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

// Calculate size of each recipe card, subtracting padding
const recipeWidth = (Dimensions.get('window').width - 60) / 3;
const styles = StyleSheet.create({
  image: {
    width: recipeWidth,
    height: recipeWidth,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
  },
});
