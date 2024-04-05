import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/ActionButton';
import { supabase } from '../lib/supabase';

const CookbookSelectRecipes = ({ route }) => {
  const { cookbook, recipes } = route?.params

  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const navigation = useNavigation();

  // Function to toggle the selection of a recipe
  const toggleRecipeSelection = (recipeId) => {
    const isSelected = selectedRecipes.includes(recipeId);
    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  // Function to handle confirm selection
  const handleActionPress = async () => {
    // Insert relationship between current cookbook and each recipe
    for (const recipeId of selectedRecipes) {
      await supabase.from("cookbook_recipes").insert({
        "cookbook_id" : cookbook.id,
        "recipe_id" : recipeId
      });
    }
    setSelectedRecipes([]);
    // Finally, navigate back to cookbook page
    navigation.navigate("CookbookPage", { cookbook : cookbook });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {recipes.map(recipe => (
          <View key={recipe.id} style={styles.card}>
            <TouchableOpacity onPress={() => toggleRecipeSelection(recipe.id)}>
              <Image source={{ uri: recipe.imageUrl,cache:'reload' }} style={styles.image} />
              {selectedRecipes.includes(recipe.id) && (
                <>
                  <View style={styles.overlay} />
                  <View style={styles.checkMark}>
                    <MaterialIcons name="check" size={24} color="#C0452A" />
                  </View>
                </>)}
            </TouchableOpacity>
            <Text style={styles.text}>{recipe.name}</Text>
          </View>
        ))}
      </ScrollView>
      {/* TODO some kind of message if no recipes to select from ? */}
        <ActionButton type="confirm" disabled={selectedRecipes.length === 0} onPress={handleActionPress}/>
    </View>
  );
};

// Calculate size of each recipe card, subtracting padding
const recipeWidth = (Dimensions.get('window').width - 60) / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  },
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
    fontSize: 14,
    textAlign: 'center',
    flexWrap: 'wrap', // Allow names to line wrap
  },
});

export default CookbookSelectRecipes;
