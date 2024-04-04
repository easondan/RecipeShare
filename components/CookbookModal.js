import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadIcon from "react-native-vector-icons/Feather";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../lib/supabase";

const CookbookModal = ({ setModalVisible }) => {
  const defaultImage = "https://ixdiitlvaifwubdmmozg.supabase.co/storage/v1/object/public/avatars/public/default_cookbook.png";
  const [selectedImage, setSelectedImage] = useState({base64: null, uri: null});
  const [cookbookTitle, setCookbookTitle] = useState("");

  const pickImage = async () => {
    let imgPicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!imgPicker.canceled) {
      let result = await ImageManipulator.manipulateAsync(
        imgPicker.assets[0].uri,
        [{ resize: { width: 500, height: 500 } }],
        { format: "jpeg", base64: true }
      );
      setSelectedImage({
        base64: result.base64,
        uri: result.uri
      });
    }
  };

  const createCookbook = async () => {
    // Cookbook title required field
    if (cookbookTitle.trim() === '') {
      Alert.alert("ERROR", "Please enter a title for the cookbook.");
      return;
    }
    const value = await supabase.auth.getUser();
    const newCookbook = {
      name: cookbookTitle,
      imageUrl: selectedImage.uri ? selectedImage.uri : defaultImage,
      author_id: value.data.user.id,
    };
    const { error } = await supabase.from('cookbooks').insert(newCookbook);
    if (error) {
      Alert.alert("ERROR", "Unable to create cookbook :(");
      console.error("Erroring uploading new cookbook: ", error);
    } else {
      Alert.alert("SUCCESS", "Cookbook created successfully!");
      setModalVisible(false); // Close the modal
    }
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => {
            setModalVisible(false);
            setSelectedImage();
          }}
        >
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Create Cookbook</Text>
        <View style={styles.cookbookTitleContainer}>
          <Text style={styles.inputTitle}>Cookbook Title</Text>
          <TextInput
            style={styles.input}
            placeholder="My Cookbook"
            placeholderTextColor="#888"
            inputMode="text"
            keyboardType="default"
            onChangeText={setCookbookTitle}
          />
        </View>
        <TouchableOpacity style={styles.container} onPress={pickImage}>
          <View style={styles.frame}>
            {selectedImage.uri ? (
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.imageText}>
                  Upload a Cover Image {"\n\n"}
                  <UploadIcon name="upload" size={30} color="black" />
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={createCookbook}>
          <Text style={{ color: "white", fontSize: 20 }}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    maxWidth: 500,
    height: 450,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  cookbookTitleContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    padding: 30,
    paddingTop: 15
  },
  frame: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "grey",
    overflow: "hidden", // lets border show on edges
  },
  input: {
    height: 40,
    width: "100%",
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // borderRadius: 6,
  },
  placeholder: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#EAEAEA",
    // borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 15,
  },
  inputTitle: {
    fontSize: 18,
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "#D75B3F",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 50,
    margin: 30,
  },
  imageText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default CookbookModal;
