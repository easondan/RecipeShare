import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCookbookModal = ({ isVisible, onClose, onSelectCookbook, recipeData }) => {
    
    const [cookbooks, setCookbooks] = useState([]);

    const clearAsyncStorage = async () => {
        try {
          await AsyncStorage.clear();
          console.log('AsyncStorage has been cleared!');
        } catch (error) {
          console.error('Error clearing AsyncStorage:', error);
        }
    };
    useEffect(() => {
      const loadCookbooks = async () => {
        const result = await AsyncStorage.getItem('cookbooks');
        const cookbooks = result ? JSON.parse(result) : [];
        setCookbooks(cookbooks);
      };
  
      loadCookbooks();
    }, []);
    
    useEffect(() => {
      AsyncStorage.setItem('cookbooks', JSON.stringify(cookbooks));
    }, [cookbooks]);
  
    const handleSelectCookbook = async (selectedCookbook) => {
        const cookbooksJson = await AsyncStorage.getItem('cookbooks');
        const cookbooks = cookbooksJson ? JSON.parse(cookbooksJson) : [];
        await AsyncStorage.setItem('cookbooks', JSON.stringify(cookbooks));
    
    
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
        setCookbooks(updatedCookbooks); // Update the local state to reflect the changes immediately.
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