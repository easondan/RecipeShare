// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
// } from "react-native";
// import ActionButton from "../components/ActionButton";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import UploadIcon from "react-native-vector-icons/Feather"
// import * as ImagePicker from "expo-image-picker";
// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     console.log(result.assets[0].uri);
//     result.assets[0].uri;
//     if (!result.cancelled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <TouchableOpacity
//               style={styles.closeIcon}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//                 setSelectedImage(null);
//               }}
//             >
//               <Icon name="close" size={30} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.modalText}>Create Cookbook</Text>
//             <View style = {styles.cookbookTitleContainer}>
//               <Text style={styles.titleModalText}>Cookbook title</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="My Cookbook Title"
//                 placeholderTextColor="#888"
//                 inputMode="text"
//                 keyboardType="default"
//               />
//             </View>

//             <TouchableOpacity style={styles.container} onPress={pickImage}>
//               <View style={styles.frame}>
//                 {selectedImage ? (
//                   <Image source={{ uri: selectedImage }} style={styles.image} />
//                 ) : (
//                   <View style={styles.placeholder}>
//                   <Text style = {styles.imageText}>Upload a Cover Image {"\n\n"}<UploadIcon name = "upload" size={30} color="black"/></Text>
//                   </View>
//                 )}
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.createButton}>
//               <Text style={{ color: "white", fontSize: 20 }}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <ActionButton
//         onPress={() => {
//           setModalVisible(true);
//           setSelectedImage(null);
//         }}
//       ></ActionButton>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageText:{
//     textAlign: 'center',
//     fontSize: 15,
//   },
//   cookbookTitleContainer: {
//     flex: 1,
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     width: "100%",
//     paddingBottom: 20,
//     paddingTop: 20,
//   },
//   frame: {
//     width: 150,
//     height: 150,
//     borderWidth: 2,
//     borderColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 0,
//     marginBottom: 60,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     width: "80%",
//     maxWidth: 500, // You can adjust the maximum width as per your requirement
//     height: 450,
//     alignSelf: "center",
//   },
//   closeIcon: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     paddingBottom: 5,
//   },
//   input: {
//     marginTop: 10,
//     height: 40,
//     borderColor: "transparent",
//     borderBottomColor: "#888",
//     borderBottomWidth: 1,
//     width: "100%",
//     fontSize: 15,
//     color: "#333",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 6,
//   },
//   placeholder: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#EAEAEA",
//     borderRadius: 6,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent:'center'
//   },
//   modalText: {
//     fontSize: 22,
//     fontFamily: "Puritan",
//   },

//   titleModalText: {
//     paddingTop: 10,
//     fontSize: 18,
//     fontFamily: "Puritan",
//     marginTop: 10,
//   },

//   createButton: {
//     backgroundColor: "#D75B3F",
//     padding: 20,
//     paddingLeft: 40,
//     paddingRight: 40,
//     paddingTop: 10,
//     paddingBottom: 10,
//     borderRadius: 50,
//     alignItems: "center",
//     position: "absolute",
//     bottom: 10,
//   },
// });

// export default App;

// App.js
import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";
import CookbookModal from "../components/CookbookModal";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
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

export default App;
