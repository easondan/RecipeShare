import React, { useState, useEffect,useCallback } from "react";
import { supabase } from '../lib/supabase'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  Modal,
  Alert
} from "react-native";
import ActionButton from "../components/ActionButton";
import ShareModal from "../components/ShareModal";
import RecipeGrid from "../components/RecipeGrid";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const CookbookPage = ({ route }) => {

  const { cookbook } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchRecipes = async() => {
    const { data, error } = await supabase.rpc('get_cookbook_recipes', { cid : cookbook.id })
    if (error) {
      Alert.alert("ERROR", "Failed to load cookbook recipes!");
      console.error('Error fetching cookbook recipes:', error);
    } else {
      setRecipes(data);
    }
  };
  useFocusEffect(
    useCallback(() => {

      // Fetch updated recipes on page load 
      fetchRecipes(); 
    }, [cookbook])
  );

  return (
    <SafeAreaView style={styles.container}>
      { !recipes || recipes.length == 0 ? (
        <View style={styles.noRecipeContainer}>
          <Text style={styles.noRecipeContainer.noRecipeText}>
            This cookbook has no recipes yet, get cooking !
          </Text>
          <MaterialCommunityIcon name="book-open-variant" color="#868686" size={100}/>
        </View>
      ) : (
        <ScrollView>
          <RecipeGrid recipes={recipes} />
        </ScrollView>
      )}
      <ActionButton type="share" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(false)}}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ShareModal cookbook={cookbook} setModalVisible={setModalVisible}/>
        </TouchableWithoutFeedback>
      </Modal>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  noRecipeContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    noRecipeText:{
      width: "70%",
      fontSize:24,
      textAlign: 'center'
    },
  }
  
});

export default CookbookPage;