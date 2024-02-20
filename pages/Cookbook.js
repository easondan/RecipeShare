import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';

const Cookbook= () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cookbook</Text>
      <ActionButton></ActionButton>
    </View>
  );
}

export default Cookbook;
