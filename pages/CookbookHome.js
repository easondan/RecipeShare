import React, { useCallback, useState, useEffect } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Alert } from 'react-native';
import ActionButton from '../components/ActionButton';
import CookbookModal from '../components/CookbookModal';
import Dropdown from '../components/Dropdown';
import { supabase } from '../lib/supabase'
import { useFocusEffect } from '@react-navigation/core';

const CookbookHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [sharedCookbooks, setSharedCookbooks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
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
          // const updatedCookbooks = data;
          setCookbooks(data);
        }
      }
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
          const updatedCookbooks = data.map(item => item.cookbooks); // Extract only cookbooks
          setSharedCookbooks(updatedCookbooks);
          // console.log(sharedCookbooks)
        }
      };
      // Wait for both fetches to complete on page load
      fetchCookbooks();
      fetchSharedCookbooks();
    }, [])
  );

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
        // const updatedCookbooks = data;
        // console.log(updatedCookbooks)
        setCookbooks(data);
        // console.log(cookbooks)
      }
    }
    if (!modalVisible) {
      // Refresh cookbooks after closing modal
      fetchCookbooks();
    }
  }, [modalVisible]);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Dropdown label="My Cookbooks" cookbookList={cookbooks} />
          <Dropdown label="Shared Cookbooks" cookbookList={sharedCookbooks} />
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
    justifyContent:'center',
    backgroundColor: "white",
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});

export default CookbookHome;