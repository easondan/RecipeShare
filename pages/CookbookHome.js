import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";
import CookbookModal from "../components/CookbookModal";
import Dropdown from "../components/Dropdown";

const CookbookHome = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>

      <Dropdown label="My Cookbooks" />      
      <View style={{ flex: 0.5 }} />
      <Dropdown label="Shared Cookbooks" />

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
      <ActionButton onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CookbookHome;
