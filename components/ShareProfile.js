import { View, Text, StyleSheet, Image,Dimensions } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
const ShareProfile = ({ imageUrl, name, email, role }) => {
    const [newPermissions, setNewPermission] = useState(role);
    const data = [
        { key: "1", value: "Viewer" },
        { key: "2", value: "Contributor" },
        { key: "3", value: "Remove" },
      ];
  return (
    <View style= {styles.container}>

      <Image  source={{ uri: imageUrl }} style={styles.image}/>
      <View style = {styles.nameContainer}>
        <Text style = {styles.text}>{name}</Text>
        <Text style = {styles.text}>{email}</Text>
      </View>
      <SelectList
              setSelected={setNewPermission}
              data={data}
              save="value"
              search={false}
              defaultOption={data[1]}
              boxStyles={styles.selectList}
              maxHeight={30}
              dropdownStyles= {styles.inputStyle}
              dropdownTextStyles={styles.dropdownTextStyles}
              inputStyles = {styles.dropdownTextStyles}
            />
    </View>
  );
};
const recipeWidth = (Dimensions.get('window').width - 60) / 9;

const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        width: "100%",
        height: "10%",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    nameContainer:{
        width: 200,
        height: 200,

    },
    selectList: {
        width: '60%',
        marginLeft: -50,
        height: 35,
        borderRadius: 5,
        justifyContent:"space-between",

      },
    inputStyle:{
        width: "60%",
        height: 30,
        marginLeft: -50,
        borderRadius: 5,
      },
      dropdownTextStyles:{
        fontSize: 8,
        
      },
    text:{
        fontSize: 15,
    },
    image: {
        width: recipeWidth,
        height: recipeWidth,
        marginRight: 10,
        borderRadius: 20,
      },

});

export default ShareProfile;
