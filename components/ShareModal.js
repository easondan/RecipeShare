import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SelectList } from "react-native-dropdown-select-list";

const ShareModal = ({ modalVisible, setModalVisible }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [newPermissions, setNewPermission] = useState("Contributor");
  const data = [
    { key: "1", value: "Viewer" },
    { key: "2", value: "Contributor" },
  ];

  const saveShareCoobook = async () => {
    console.log("Hello");
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
        <Text style={styles.modalText}>Manage Sharing</Text>
        <View style={styles.cookbookTitleContainer}>
          <Text style={styles.titleModalText}>Add Members</Text>
          <View style= {styles.addMemberContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email Address"
              placeholderTextColor="#888"
              inputMode="text"
              keyboardType="default"
              multiline={true}
              onChangeText={setEmailAddress}
            />

          </View>
          <SelectList
              setSelected={setNewPermission}
              data={data}
              save="value"
              search={false}
              defaultOption={data[1]}
              maxHeight={80}
              boxStyles={styles.selectList}
              dropdownStyles= {styles.inputStyle}
            />
          </View>

          <Text style={styles.titleModalText}>Manage Member Permissions</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={saveShareCoobook}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Save</Text>
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
  inputContainer: {
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    width: "60%",

  },
  addMemberContainer:{
    flexDirection:'row',
    justifyContent: 'flex-start',
    height:100,
    
  },
  inputStyle:{
    width: "60%",
    marginLeft: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    width: "90%",
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
  selectList: {
    marginTop:10,
    width: '60%',
    marginLeft: 10,
  },
  cookbookTitleContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
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
    fontSize: 15,
    height: 50,
    marginLeft: 5,
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
  },
  titleModalText: {
    paddingTop: 10,
    fontSize: 18,
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

export default ShareModal;
