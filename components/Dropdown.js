import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/FontAwesome6';


const Dropdown = ({ label, cookbookList }) => {
  const [visible, setVisible] = useState(true);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleDropdown}>
      <View style = {styles.container}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}
        >
          {/* TODO why is there a touchable with feedback inside a non-feedback lol */}
          {/* I think we just want the arrow to have feedback right? not the full bar */}
          <Text style={styles.dropdownLabel}>{label}</Text>
          <Icon style={styles.icon} size={25} name={visible ? 'chevron-up' : 'chevron-down'} />
        </TouchableOpacity>
        { visible && (
          <View style={styles.grid}>
            {
              cookbookList.map((cookbook, i) => (
                <View key={i}>
                  <Card data={cookbook} isCookbook={true} />
                </View>
              ))
            }
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    width: '100%',
    elevation: 5,
    borderTopWidth: 2,
    borderTopColor: '#efefef',
    zIndex: 1,
  },
  dropdownLabel: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    textAlign: 'left',
    fontSize: 20
  },
  icon: {
    padding: 10,
    marginRight: 20,
  },
  container:{
    flex:1,
    justifyContent: 'center',
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  }
});

export default Dropdown;
