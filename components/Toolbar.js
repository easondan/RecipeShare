import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity,Platform,Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const Toolbar = ({ title, showMenuIcon = true, showSearch = true, moreOptions = null }) => {

  const navigation = useNavigation();
  const navigateSearch  = () =>{
    navigation.navigate("Search",{title: title,searchText: "",filters:[], resultData: []})
  }
  return (
    <View id="toolbar" style={styles.toolbar}>
      {
        showMenuIcon &&     // Render hamburger menu on main pages
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.toggleDrawer()} activeOpacity={0.7}>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
      }
      { !showMenuIcon &&   // Render back arrow on internal pages
        <TouchableOpacity style={styles.navIcon} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Icon name="chevron-back-outline" size={28} color="black"/>
        </TouchableOpacity>
      }
      {
        showSearch &&
        <TouchableOpacity style={[styles.icon, { right: !moreOptions ? 25 : 55 }]} activeOpacity={0.7} onPress={navigateSearch}>
          {/* TODO search icon navigates to search page for current context */}
          <Icon name="search" size={28} color="black"/>
        </TouchableOpacity>
      }
      {
        moreOptions &&
        // TODO implement more options dropdown
        <TouchableOpacity style={[styles.icon, { right: 25 }]} activeOpacity={0.7}>
          <SimpleIcon name="options-vertical" size={25} color="black"/>
        </TouchableOpacity>
      }
      <Text style={styles.title}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  toolbar: {
    marginTop: Platform.OS === 'ios' ? 0:25,

    backgroundColor: "#A7CCA2",
    flexDirection: "row",
    alignItems: 'center',
    height: Platform.OS === 'ios'? Dimensions.get("screen").height/8:75,

    // TODO need an iOS pal to check how the shadow looks
    // TODO once status bar fixed, ensure shadow doesn't show "above" toolbar
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  title: {
    paddingTop: Platform.OS === 'ios' ? 30:0,
    flex: 1,
    color: "black",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 26,
  },
  navIcon: {
    paddingTop: Platform.OS === 'ios' ? 30:0,
    position: "absolute",
    left: 25,
    zIndex: 1,
  },
  icon: {
    paddingTop: Platform.OS === 'ios' ? 30:0,
    position: "absolute",
    zIndex: 1
  }
});

export default Toolbar;
