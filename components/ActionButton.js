import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
     <MaterialCommunityIcon name='plus' color="white" size= {40}/>
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
