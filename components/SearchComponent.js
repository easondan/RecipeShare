import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
const SearchComponent = ({ route }) => {
  const navigation = useNavigation();
  const {title,searchTest,filters} = route.params;
  
  const [searchText, setSearchText] = useState('');
  const clearText = () => {
    setSearchText('');
  };

  const filter = ()=>{
    console.log()
  }

  const search = ()=>{

        navigation.navigate("Search", {
            searchText: searchText,
            title: title,
            filters: [],
          })  

  }


  const goBack = () =>{

    if (title==='My Recipes'){
      navigation.navigate("RecipeHome");
      return;
    }
    navigation.navigate("CookbookHome");
    
    console.log(title);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backIcon}>
        <MaterialIcon name="arrow-back" size={30} color="black" style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
      {!!searchText && (
          <TouchableOpacity onPress={search} style={styles.clearIcon}>
            <MaterialIcon name="search" size={20} color="black" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder={"Search " + title} 
          value={searchText}
          onChangeText={setSearchText}
        />
        {!!searchText && (
          <TouchableOpacity onPress={clearText} style={styles.clearIcon}>
            <MaterialIcon name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={filter} style={styles.icon}>
        <MaterialIcon name="tune" size={30} color="black" style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#A7CCA2",
    height: 150,
    paddingTop: 20
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    marginLeft: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 50,
  },
  backIcon: {
    marginRight: 5,
  },
  filterIcon: {
    marginLeft: 5,
  },
  clearIcon: {
    padding: 5,
  },
});

export default SearchComponent;
