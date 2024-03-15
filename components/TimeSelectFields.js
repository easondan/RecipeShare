// TimeSelectFields.js
import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const TimeSelectFields = ({ label, hours, minutes, formData, setFormData, isCookingTime, editHour,editMinute }) => {
  const keyPrefix = isCookingTime ? 'cook' : 'prep';

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.timeContainer}>
        <SelectList
          setSelected={(val) => setFormData({ ...formData, [`${keyPrefix}Hour`]: val })}
          data={hours}
          save="value"
          search={false}
          maxHeight={50}
          boxStyles={styles.selectTimeList}
          {...(editHour ? { defaultOption: editHour } : { placeholder: "Hour" })}
        />
        <SelectList
          setSelected={(val) => setFormData({ ...formData, [`${keyPrefix}Min`]: val })}
          data={minutes}
          save="value"
          search={false}
          maxHeight={50}
          boxStyles={styles.selectTimeList}
          {...(editMinute ? { defaultOption: editMinute } : { placeholder: "Minute" })}
        />
      </View>
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: Dimensions.get("window").width/6,
    width: '100%',
  },
  selectTimeList: {
    marginTop: 10,
    width: Dimensions.get("window").width/3,
  },
});

export default TimeSelectFields;
