import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useFavorites } from '../components/FavoritesContext';

const RecipeToolbar = ({ recipeData }) => {
  const navigation = useNavigation();
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (recipeData) {
      setFavorite(isFavorited(recipeData.name));
    }
  }, [recipeData, isFavorited]);

  const toggleFavorite = () => {
    if (recipeData) {
      if (favorite) {
        removeFavorite(recipeData.name); // Use name
      } else {
        addFavorite(recipeData);
      }
      setFavorite(!favorite);
    }
  };

  return (
    <View id="toolbar" style={styles.toolbar}>
      <TouchableOpacity style={styles.navIcon} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <FAIcon name="chevron-left" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.iconGroup}>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcon name="cart" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcon name="book-plus" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite} activeOpacity={0.7}>
          {/* Dynamically change the icon */}
          <MaterialIcon name={favorite ? "heart" : "heart-outline"} size={30} color={favorite ? "#D75B3F" : "grey"} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <SimpleIcon name="options-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    marginTop: 25,
    backgroundColor: "#A7CCA2",
    flexDirection: "row",
    alignItems: 'center',
    height: 75,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  navIcon: {
    position: "absolute",
    left: 25,
    zIndex: 1,
  },
  iconGroup: {
    flex: 1,
    right: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
  }
});

export default RecipeToolbar;