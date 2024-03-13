import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Card } from '../components/Card';
import { recipes } from '../recipes.json';

const FavouriteRecipes = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {
          recipes.map((recipe, i) => (
            <View key={i} style={styles.gridItem}>
              <Card data={recipe} navigate={true} type="Recipe" />
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    marginBottom: 15
  }
});

export default FavouriteRecipes;
