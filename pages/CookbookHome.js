import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionButton from '../components/ActionButton';
import CookbookModal from '../components/CookbookModal';
import Dropdown from '../components/Dropdown';

const COOKBOOKS_KEY = 'cookbooks';

const CookbookHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const listOfCookBooks = cookbooks

  const loadCookbooks = async () => {
    try {
      const cookbooksJson = await AsyncStorage.getItem(COOKBOOKS_KEY);
      const loadedCookbooks = cookbooksJson ? JSON.parse(cookbooksJson) : [];
      setCookbooks(loadedCookbooks);
    } catch (error) {
      Alert.alert("Error", "Failed to load cookbooks");
      console.error("AsyncStorage error: ", error.message);
    }
  };

  useEffect(() => {
    loadCookbooks();
  }, []);

  useEffect(() => {
    // This effect runs when the modal is closed. If modalVisible is false, we refresh the cookbooks.
    if (!modalVisible) {
      loadCookbooks();
    }
  }, [modalVisible]); // Depend on modalVisible

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Dropdown label="My Cookbooks" listOfCookBooks={listOfCookBooks} />
      </ScrollView>
      <ActionButton onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CookbookModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  // Add any other styles you may have here
});

export default CookbookHome;