import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from './Card';

const Dropdown = ({ label, listOfCookBooks }) => {
  const [visible, setVisible] = useState(false);
  const translateY = useRef(new Animated.Value(200)).current;

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
    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((recipe, colIndex) => (
          <View key={colIndex} style={styles.gridItem}>
            <Card data={recipe} navigate={false} type="Cookbook" />
          </View>
        ))}
      </View>
    ));
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
    width: '90%',
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
    width:"90%"
  },
  dropdown: {
    backgroundColor: '#fff',
    width: '90%',
    flexDirection: 'column', // Change to column to display rows
    justifyContent: 'flex-start', // Align rows to the top
    maxHeight: 1000,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 5,
  },
  gridItem: {
    flex: 1, // Each item occupies equal space
        alignItems:'center',
    paddingBottom: 50,
  },
});

export default Dropdown;
