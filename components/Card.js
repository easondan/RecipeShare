import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

export const Card = ({ data, type }) => {

  const navigation = useNavigation();
  const handleRecipeClick = (data) => {
    navigate ? navigation.navigate('RecipePage', { data }) : ''
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => handleRecipeClick(data)}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{data.name}</Text>
    </TouchableOpacity>
  );
};

// Calculate size of each recipe card, subtracting padding
const recipeWidth = (Dimensions.get('window').width - 60) / 3;
const styles = StyleSheet.create({
    card: {
      flex: 1,
      alignItems: 'center',
      maxWidth: recipeWidth // Force names within card width
    },
    image: {
      width: recipeWidth,
      height: recipeWidth,
      borderRadius: 10,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      flexWrap: 'wrap', // Allow names to line wrap
    },
});
