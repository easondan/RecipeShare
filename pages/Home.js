import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Recipe</Text>
      <ActionButton></ActionButton>
    </View>
  );
}

export default Home;
