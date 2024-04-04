import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const SelectCookbookModal = ({ isVisible, onClose, onSelectCookbook, recipeData }) => {
    
    const [cookbooks, setCookbooks] = useState([]);

    useEffect(() => {
      const fetchCookbooks = async () => {
        const value = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('cookbooks')
          .select() // Select all 
          .eq('author_id', value.data.user.id); // Matching user id
        if (error) {
          Alert.alert("ERROR", "Failed to load cookbooks!");
          console.error('Error fetching cookbooks:', error);
        } else {
          setCookbooks(data);
        }
      };
      const fetchSharedCookbooks = async() => {
        const value = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('shared_cookbooks')
          .select(`cookbook_id, cookbooks(*)`) // Select on matching cookbook id
          .eq('shared_user_id', value.data.user.id);  // Where user ids equal
        if (error) {
          Alert.alert("ERROR", "Failed to load shared cookbooks!");
          console.error('Error fetching shared cookbooks:', error);
        } else {
          // Append shared cookbooks to list of all cookbooks
          const sharedCookbooks = data.map(item => item.cookbooks); // Extract only cookbooks
          setCookbooks([...cookbooks, ...sharedCookbooks]);
          // console.log(sharedCookbooks)
        }
      };
      fetchCookbooks();
      fetchSharedCookbooks();
    }, []);
  
    const handleSelectCookbook = async (selectedCookbook) => {
      
      const cookbooksJson = await AsyncStorage.getItem('cookbooks');
      const cookbooks = cookbooksJson ? JSON.parse(cookbooksJson) : [];
    
    
        const updatedCookbooks = cookbooks.map(cookbook => {
            if (cookbook.title === selectedCookbook.title) {
                return {
                    ...cookbook,
                    recipes: cookbook.recipes ? [...cookbook.recipes, recipeData] : [recipeToSave],
                };
            }
            return cookbook;
        });
    
        await AsyncStorage.setItem('cookbooks', JSON.stringify(updatedCookbooks));
    };
  
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {cookbooks.length > 0 ? (
            <FlatList
              data={cookbooks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSelectCookbook(item)}>
                  <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noCookbooksText}>No cookbooks</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    item: {
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 5,
      width: '100%',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: 'black',
    },
    noCookbooksText: {
      fontSize: 18,
      color: 'black',
      marginBottom: 20, // Adds some space above the Close button
    },
    closeButton: {
      backgroundColor: '#ddd',
      padding: 10,
      width: '100%',
      marginTop: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
  });

export default SelectCookbookModal;