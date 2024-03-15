import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
const ActionButton = ({ onPress,share }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
     {share ? <MaterialIcon name = 'people' color='white' size= {40}/>:<MaterialCommunityIcon name= 'plus' color="white" size= {40}/>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#D75B3F', 
      padding: 15,
      borderRadius: 50,
      alignItems: 'center',
      position: 'absolute',
      bottom: 40,
      right: 40,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default ActionButton;
