import React,{useState} from 'react';
import { View,StyleSheet } from 'react-native';
import SearchListIcon from '../components/SearchListIcon';
const SearchPage = ({ route }) => {
  const { title,searchText,filters,resultData } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={styles.container}>
      {  resultData.length!==0 ? 
        resultData.map((data, i) => (
          <SearchListIcon key = {i}  title={title} data={data}></SearchListIcon>
        ))
      
    :console.log("Nothing Found")}
    

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "column",
    columnGap: 1,
    rowGap:1,
  },

});
export default SearchPage;
