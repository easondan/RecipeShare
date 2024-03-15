import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Platform,Dimensions } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { recipes } from '../recipes.json'

const SearchToolbar = ({ route }) => {

  const navigation = useNavigation();
  
  const { title, searchTest, filters} = route.params;
  const [searchText, setSearchText] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
    setSearchText('');
  }

  const filter = () => {
    console.log("Open filter screen!")
  }

  //In M3 will be prob some search in the Db
  const submitSearch = () => {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // Navigate to the Search screen with filtered data
    navigation.navigate("SearchPage", {
      searchText: searchText,
      title: title,
      filters: [], // You can add filters if needed
      resultData: filteredRecipes // Pass filtered recipes as resultData
    });
  }

  return (
    <View style={[styles.toolbar, styles.toolbarContent]}>
      <TouchableOpacity onPress={() => handleGoBack()} style={styles.navIcon} activeOpacity={0.7}>
        <FAIcon name="chevron-left" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <MaterialIcon name="search" size={24} color="#989898" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={"Search \"" + title + "\""} 
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={submitSearch}
        />
        {!!searchText && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.searchIcon}>
            <MaterialIcon name="close" size={22} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={filter} style={styles.navIcon}>
        <MaterialIcon name="tune" size={30} color="black" style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#A7CCA2",
    flexDirection: "row",
    alignItems: "center",
    height: Platform.OS === "ios" ? Dimensions.get("screen").height / 8 : 75,

    // TODO need an iOS pal to check how the shadow looks
    // TODO once status bar fixed, ensure shadow doesn't show "above" toolbar
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  toolbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  searchContainer: {
    marginTop: Platform.OS === "ios" ? 30 : 0,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9DC698',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    margin: 5, 
    marginLeft: 0,  // Duplicate padding between icons
    marginRight: 0,
  },
  searchIcon: {
    margin: 5
  },
  navIcon: {
    paddingTop: Platform.OS === "ios" ? 30 : 0,
    marginLeft: 25,
    marginRight: 25,
    zIndex: 1,
  }
});

export default SearchToolbar;
