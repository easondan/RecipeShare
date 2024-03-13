import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
const SearchListIcon = ({ data,title }) => {
  const navigation = useNavigation();

  const navigate = () =>{
    console.log(title);
    if(title === 'My Recipes' || title === 'Favourites'){
      navigation.navigate("RecipePage",{data});
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchListIcon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    marginTop:20 ,

  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryText: {
    fontSize: 16,
    color: "#666",
  },
});
