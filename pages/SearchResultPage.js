import React,{useState} from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SearchRecipeItem from '../components/SearchRecipeItem';

const SearchResultPage = ({ route }) => {
  const { title, searchText, filters, resultData } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  return (
    
    <ScrollView contentContainerStyle={[styles.container, { justifyContent: resultData.length == 0 ? 'center' : '' }]}>
      { 
        resultData.length!== 0 ? (
        resultData.map((data, i) => (
          <SearchRecipeItem key={i} title={title} data={data} />
        )))
      : 
        <View style={styles.splash}>
          <MaterialIcon name="search" size={120} color='rgba(137, 137, 137, 0.3)' />
          <Text style={styles.splash}>No Results</Text>
        </View>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    fontSize: 24,
    color: 'rgba(137, 137, 137, 0.6)',
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default SearchResultPage;
