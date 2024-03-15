import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import ActionButton from "../components/ActionButton";
import ShareModal from "../components/ShareModal";
import RecipeGrid from "../components/RecipeGrid";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const CookbookPage = ({ route }) => {
  const { cookbook } = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  if (!cookbook || !cookbook.recipes || cookbook.recipes.length == 0) {
    return (
      <View style = {styles.noRecipeContainer}>

        <Text style={styles.noRecipeContainer.noRecipeTest}>This cookbook has no recipes yet, get cooking !</Text>
        <MaterialCommunityIcon name = "book-open-variant" color = "#868686" size = {100}/>
        <ActionButton share={true} onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ShareModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
      </View>
    );
  }

  console.log(cookbook);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        <RecipeGrid recipes={cookbook.recipes} />
      </ScrollView>
      <ActionButton share={true} onPress={() => setModalVisible(true)} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ShareModal
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
    justifyContent: "center",
  },
  noRecipeContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    noRecipeTest:{
      width: "70%",
      fontSize:24,
      textAlign: 'center'
    }
  }
  
});

export default CookbookPage;
