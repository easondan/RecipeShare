import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Card } from '../components/Card';
import { useNavigation } from '@react-navigation/native';

const CookbookPage = ({ route }) => {
    const { cookbook } = route.params;
    const navigation = useNavigation();

    if (!cookbook || !cookbook.recipes) {
        // You could render a placeholder here instead
        return (
            <Text styles={styles.text}>There are no recipes</Text>
        );
    }

    console.log(cookbook)

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.grid}>
            {cookbook.recipes.map((recipe, index) => (
                <Card key = {index} data={recipe}/>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  },
  text: {
    textAlign: 'center'
  }
});

export default CookbookPage;