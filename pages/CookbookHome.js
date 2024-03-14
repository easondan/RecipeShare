import React, { useState } from "react";
import { View, Modal, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ActionButton from "../components/ActionButton";
import CookbookModal from "../components/CookbookModal";
import Dropdown from "../components/Dropdown";
import { recipes } from "../recipes.json";

const CookbookHome = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle = {{alignItems:'center'}}>
      <Dropdown label="My Cookbooks" listOfCookBooks={recipes} />
      <Dropdown label="Shared Cookbooks" listOfCookBooks={recipes} />
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
});

export default CookbookHome;
