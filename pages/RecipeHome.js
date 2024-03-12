import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import ActionButton from '../components/ActionButton';
import { Card } from '../components/Card';
import { recipes } from '../recipes.json';
import { useNavigation } from '@react-navigation/native';

const RecipeHome = () => {
  const navigation = useNavigation();

  const addRecipe = () => {
    navigation.navigate('AddRecipePage');
  };

  // Function to chunk the array into groups of three
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const renderRows = () => {
    const rows = chunkArray(recipes, 3); // Group items into rows of three
    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((recipe, colIndex) => (
          <View key={colIndex} style={styles.gridItem}>
            <Card data={recipe} navigate={true} type="Recipe" />
          </View>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {renderRows()}
      </ScrollView>
      <ActionButton onPress={addRecipe} />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  grid: {
    flexDirection: 'column', // Change to column to display rows
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  gridItem: {
    width: ITEM_WIDTH,
  },
});

export default RecipeHome;
