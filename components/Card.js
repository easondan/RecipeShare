import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

export const Card = ({ data,type,navigate }) => {

  const navigation = useNavigation();
  const handleRecipeClick = (data) => {
    navigate ? navigation.navigate('RecipePage', { data }) : ''
  };

  return (
    <View style= {styles.container}>
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleRecipeClick(data)}>
      <Image source={{ uri: data.imageUrl }} style={styles.image} />
      <Text style={styles.text}>{data.name}</Text>
    </TouchableOpacity>
    </View>

  );
};

// Calculate size of each recipe card, subtracting padding
const recipeWidth = (Dimensions.get('window').width - 60) / 4;
const fontSize = (Dimensions.get('window').width / recipeWidth)+3;
const styles = StyleSheet.create({
  container: {
    width: recipeWidth,
    height: recipeWidth,
  },
  image: {
    width: recipeWidth,
    height: recipeWidth,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    
  },
});
