import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

const ShareProfile = ({ userData, deleteUser }) => {

  const defaultImage = "https://ixdiitlvaifwubdmmozg.supabase.co/storage/v1/object/public/avatars/public/default_avatar.png";
  
  return (
    <View style= {styles.container}>
      <View style = {styles.profileInfo}>
        <Image source={{ uri: defaultImage }} style={styles.image}/>
        <View style={styles.details}>
          <Text style={[styles.text, {fontSize:16}]}>{userData.full_name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeUserIcon} onPress={() => deleteUser(userData.id)}>
        <Icon name="account-remove" size={36} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const recipeWidth = (Dimensions.get('window').width - 60) / 9;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 12
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 15,
  },
  removeUserIcon: {
    padding: 5,
  }
});

export default ShareProfile;
