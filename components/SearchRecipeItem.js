import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SearchRecipeItem = ({ data, title }) => {
  
  const navigation = useNavigation();
  const navigate = () =>{
    if(title === 'My Recipes' || title === 'Favourites'){
      navigation.navigate("RecipePage", { data });
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={navigate}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.primaryText}>{data.name}</Text>
          <Text style={styles.secondaryText}>{data.author}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: -5,
    borderRadius: 5,
    backgroundColor: "#E9E9E9",
    
    // TODO need an iOS pal to check how the shadow looks
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  primaryText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 15,
    color: "#666",
  },
});

export default SearchRecipeItem;
