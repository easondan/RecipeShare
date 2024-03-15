import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Card from './Card';
import { Icon } from 'react-native-elements';


const Dropdown = ({ label, listOfCookBooks }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);

  };

  const hideDropdown = () => {
    setVisible(false);
  };



  // Function to chunk the array into groups of three
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const renderRows = () => {
    const rows = chunkArray(listOfCookBooks, 3); // Group items into rows of three
    return (  <View style={styles.row}>
      {listOfCookBooks.map((recipe, colIndex) => (
        <View key={colIndex} style={styles.gridItem}>
<Card data={{ imageUrl: recipe.image, name: recipe.title, recipes: recipe.recipes }} Cookbook={true}/>
        </View>
      ))}
    </View>)
  };

  return (
    <TouchableWithoutFeedback onPress={hideDropdown}>
      <View style = {styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleDropdown}
        >
          <Text style={styles.buttonText}>{label}</Text>
          <Icon type='font-awesome' name={visible ? 'chevron-up' : 'chevron-down'} />
        </TouchableOpacity>

          
          {visible ? renderRows():''}

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    marginTop: 30,
    width:"100%"
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '90%',
    flexDirection: 'column', // Change to column to display rows
    justifyContent: 'flex-start', // Align rows to the top
    maxHeight: 1000,
  },
  row: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 55
  },
  gridItem: {
    flex: 1, // Each item occupies equal space
        alignItems:'center',
    paddingBottom: 50,
  },
});

export default Dropdown;
