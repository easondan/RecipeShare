import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CookbookModal = ({ modalVisible, setModalVisible }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cookbookTitle, setCookbookTitle] = useState("");
  const COOKBOOKS_KEY = 'cookbooks';


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
    
  };

  const createCookbook = async () => {
    if (cookbookTitle.trim() === '') {
      Alert.alert("Error", "Please enter a title for the cookbook.");
      return;
    }
    
    const newCookbook = {
      title: cookbookTitle,
      image: selectedImage,
      recipes: []
    };
  
    try {
      const existingCookbooksJson = await AsyncStorage.getItem(COOKBOOKS_KEY);
      const existingCookbooks = existingCookbooksJson ? JSON.parse(existingCookbooksJson) : [];
  
      existingCookbooks.push(newCookbook);
  
      await AsyncStorage.setItem(COOKBOOKS_KEY, JSON.stringify(existingCookbooks));
  
      Alert.alert("Success", "Cookbook saved successfully");
      setModalVisible(false); // Close the modal
    } catch (error) {
      Alert.alert("Error", "There was an error saving the cookbook");
      console.error("AsyncStorage error: ", error.message);
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
        <Text style={styles.modalText}>Create Cookbook</Text>
        <View style={styles.cookbookTitleContainer}>
          <Text style={styles.titleModalText}>Cookbook title</Text>
          <TextInput
            style={styles.input}
            placeholder="My Cookbook Title"
            placeholderTextColor="#888"
            inputMode="text"
            keyboardType="default"
            onChangeText={setCookbookTitle}
          />
        </View>
        <TouchableOpacity style={styles.container} onPress={pickImage}>
          <View style={styles.frame}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
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
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "80%",
    maxWidth: 500,
    height: 450,
    alignSelf: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingBottom: 5,
  },
  cookbookTitleContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 20,
    paddingTop: 20,
  },
  frame: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 60,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "transparent",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 15,
    color: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 22,
    fontFamily: "Puritan",
  },
  titleModalText: {
    paddingTop: 10,
    fontSize: 18,
    fontFamily: "Puritan",
    marginTop: 10,
  },
  createButton: {
    backgroundColor: "#D75B3F",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  imageText: {
    textAlign: "center",
    fontSize: 15,
  },
});

export default CookbookModal;
