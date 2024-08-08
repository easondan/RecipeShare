// SelectField.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const SelectField = ({ label, data, onSelect,editData }) => {
    
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <SelectList
        setSelected={onSelect}
        data={data}
        save="value"
        search={false}
        maxHeight={50}
        boxStyles={styles.selectList}
        {...(editData ? { defaultOption: editData } : { placeholder: "Select Course" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  selectList: {
    marginTop: 10,
    width: '95%',
  },
});

export default SelectField;
