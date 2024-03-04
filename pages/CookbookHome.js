import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";
import CookbookModal from "../components/CookbookModal";
import Dropdown from "../components/Dropdown";

const imageArray = [
  {
    imageUrl:
      "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg",
    label: "Tonkotsu Ramen",
  },
  {
    imageUrl:
      "https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
    label: "Spaghetti Bolognese",
  },
  {
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/chicken-quesadilla-index-64515c8e98e28.jpg?crop=1xw:0.9994669509594882xh;center,top&resize=1200:*",
    label: "Chicken Quesadillas",
  },
  {
    imageUrl:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/03/17/0/FPLF111_mary-berg-banana-bread-2_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1647534394499.jpeg",
    label: "Banana Bread",
  },
  {
    imageUrl:
      "https://www.culinaryhill.com/wp-content/uploads/2021/01/Tiramisu-Culinary-Hill-1200x800-1.jpg",
    label: "Tiramisu",
  },
  {
    imageUrl:
      "https://static01.nyt.com/images/2018/07/24/dining/HK-omurice-horizontal/merlin_141075450_0113642e-e841-4dd6-b96f-742a29fdef10-superJumbo.jpg",
    label: "Omurice",
  },
  {
    imageUrl:
      "https://www.eatingwell.com/thmb/hZUgZhU3ae2bg-FwzCG6qU5YnBk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-beef-chili-98142d9919594f2da7ff08926f44e3d3.jpg",
    label: "Classic Beef Chili",
  },
  {
    imageUrl:
      "https://www.eatingwell.com/thmb/hZUgZhU3ae2bg-FwzCG6qU5YnBk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-beef-chili-98142d9919594f2da7ff08926f44e3d3.jpg",
    label: "Classic Beef Chili",
  },
  {
    imageUrl:
      "https://www.eatingwell.com/thmb/hZUgZhU3ae2bg-FwzCG6qU5YnBk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-beef-chili-98142d9919594f2da7ff08926f44e3d3.jpg",
    label: "Classic Beef Chili",
  },
];

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
