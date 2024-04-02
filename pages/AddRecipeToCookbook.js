import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/ActionButton';

const AddRecipeScreen = ({route}) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigation = useNavigation();
  const data = route?.params

  // Function to toggle the selection of a recipe
  const toggleRecipeSelection = (recipeId) => {
    const isSelected = selectedRecipes.includes(recipeId);
    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  // Function to handle action button press
  const handleActionPress = () => {
    // Perform action here with selected recipes
    setSelectedRecipes([]);
    navigation.navigate("CookbookPage",data);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map(recipe => (
          <TouchableOpacity
            key={recipe.name}
            style={styles.recipeItem}
            onPress={() => toggleRecipeSelection(recipe.name)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: recipe.imageUrl,cache:'reload' }} style={styles.image} />
              {selectedRecipes.includes(recipe.name) && <View style={styles.overlay} />}
              {selectedRecipes.includes(recipe.name) && (
                <View style={styles.checkMark}>
                  <MaterialIcons name="check" size={24} color="#C0452A" />
                </View>
              )}
            </View>
            <Text style={styles.text}>{recipe.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

        <ActionButton disabled={selectedRecipes.length === 0} onPress={handleActionPress}/>
    </View>
  );
};
const recipeWidth = (Dimensions.get('window').width - 60) / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    margin: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  },
  recipeItem: {
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: recipeWidth,
    height: recipeWidth,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  checkMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap', // Allow names to line wrap
  },
});

export default AddRecipeScreen;
