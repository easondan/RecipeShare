import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import ActionButton from '../components/ActionButton';

const RecipeSelectCookbooks = ({ route }) => {
  
  const [cookbooks, setCookbooks] = useState([]);
  const [selectedCookbooks, setSelectedCookbooks] = useState([]);

  const { recipe } = route?.params
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchCookbooks = async () => {
        const value = await supabase.auth.getUser();
        // Fetch both cookbooks and shared cookbooks concurrently
        const [cookbooksData, sharedCookbooksData] = await Promise.all([
          supabase.from('cookbooks').select().eq('author_id', value.data.user.id),
          supabase.from('shared_cookbooks').select(`cookbook_id, cookbooks(*)`).eq('shared_user_id', value.data.user.id)
        ]);
        if (cookbooksData.error || sharedCookbooksData.error) {
          Alert.alert("ERROR", "Failed to load cookbooks!");
          console.error('Error fetching cookbooks:', cookbooksData.error);
          console.error('Error fetching shared cookbooks:', sharedCookbooksData.error);
          return;
        }
        // Extract only cookbook records, excluding duplicates shared with user self (bad data)
        const sharedCookbooks = sharedCookbooksData.data
          .map(item => item.cookbooks)
          .filter(cookbook => cookbook.author_id !== value.data.user.id);;
        setCookbooks([...cookbooksData.data, ...sharedCookbooks]);
      };
      fetchCookbooks();
    }, [])
  );

  // Function to toggle the selection of a recipe
  const toggleCookbookSelection = (cookbookId) => {
    const isSelected = selectedCookbooks.includes(cookbookId);
    if (isSelected) {
      // Remove cookbook from list 
      setSelectedCookbooks(selectedCookbooks.filter(id => id !== cookbookId));
    } else {
      // Append cookbook id to list
      setSelectedCookbooks([...selectedCookbooks, cookbookId]);
    }
  };

  // Function to handle confirm selection
  const handleActionPress = async () => {
    // Insert relationship between current recipe and each cookbook
    for (const cookbookId of selectedCookbooks) {
      await supabase.from("cookbook_recipes").insert({
        "cookbook_id" : cookbookId,
        "recipe_id" : recipe.id
      });
    }
    setCookbooks([]);
    setSelectedCookbooks([]);
    // Finally, navigate back to original recipe page
    navigation.navigate("RecipePage", { recipe : recipe });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cookbooks.map(cookbook => (
          <View key={cookbook.id} style={styles.card}>
            <TouchableOpacity onPress={() => toggleCookbookSelection(cookbook.id)}>
              <Image source={{ uri: cookbook.imageUrl, cache:'reload' }} style={styles.image} />
              {selectedCookbooks.includes(cookbook.id) && (
                <>
                  <View style={styles.overlay} />
                  <View style={styles.checkMark}>
                    <MaterialIcons name="check" size={24} color="#C0452A" />
                  </View>
                </>)}
            </TouchableOpacity>
            <Text style={styles.text}>{cookbook.name}</Text>
          </View>
        ))}
      </ScrollView>
      {/* TODO some kind of message if no cookbooks to select from ? */}
      <ActionButton type="confirm" disabled={selectedCookbooks.length === 0} onPress={handleActionPress}/>
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

export default RecipeSelectCookbooks;
