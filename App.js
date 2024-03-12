import Navigation from "./Navigation";
import { StatusBar, View, StyleSheet } from "react-native";

const App = () => {

  return (
    <View style={styles.root}>
      <StatusBar/>
      <Navigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
