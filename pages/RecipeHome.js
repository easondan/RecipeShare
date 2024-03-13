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
      <ActionButton/>
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
  gridItem: {
    marginBottom: 15
  }
});

export default RecipeHome;
