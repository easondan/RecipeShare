import Navigation from "./Navigation";
import { StatusBar, View, StyleSheet } from "react-native";
// import { FavouritesProvider } from './components/FavouritesContext'

const App = () => {

  return (
    <View style={styles.root}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#A7CCA2"/> */}
      <StatusBar />

        <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
