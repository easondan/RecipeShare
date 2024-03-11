import { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

const RecipePage = ({ route }) => {

  const [showIngredients, setShowIngredients] = useState(true);
  const { recipeData } = route.params;

  // TODO for now I'm assuming data is stored in mins
  const minsToHours = (mins) => {
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;

    let result = '';
    if (hours > 0) {
      result += `${hours} hr `;
    }
    if (rem > 0) {
      result += `${rem} mins`;
    }
    return result.trim();
  }

  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Image source={{ uri: recipeData.imageUrl }} style={styles.image} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.recipeName}>{recipeData.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View>  
              <Text style={styles.header}>Author:</Text>
              <Text style={styles.header}>Course:</Text>
              <Text style={styles.header}>Cuisine:</Text>
              <Text style={styles.header}>Difficulty:</Text>
              <Text style={styles.header}>Servings:</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.body}>{recipeData.author}</Text>
              <Text style={styles.body}>{recipeData.course}</Text>
              <Text style={styles.body}>{recipeData.cuisine}</Text>
              <Text style={styles.body}>{recipeData.difficulty}</Text>
              <Text style={styles.body}>{recipeData.servings}</Text>  
            </View>
          </View>
        </View>
      </View>
      <View style={styles.timeSummary}>
        <View style={styles.time}>
          <Text style={styles.header}>Prep Time</Text>
          <Text style={styles.body}>{minsToHours(recipeData.prepTime)}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.header}>Cook Time</Text>
          <Text style={styles.body}>{minsToHours(recipeData.cookTime)}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.header}>Total Time</Text>
          <Text style={styles.body}>{minsToHours(Number(recipeData.cookTime) + Number(recipeData.prepTime))}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.header}>Description:</Text>
        <Text style={styles.body}>{recipeData.description}</Text> 
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabItem, showIngredients ? styles.activeTab : ""]} onPress={() => setShowIngredients(true)}>
          <Text style={[styles.tabHeading, { color : showIngredients ? "#D75B3F" : "#222222"}]}>
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, !showIngredients ? styles.activeTab : ""]} onPress={() => setShowIngredients(false)}>
          <Text style={[styles.tabHeading, { color : !showIngredients ? "#D75B3F" : "#222222"}]}>
            Directions
          </Text>
        </TouchableOpacity>
      </View>
      {
        showIngredients ? (
          <ScrollView>
            <Text>Ingredients List</Text>
          </ScrollView>
        ) : (
          <ScrollView>
             <Text>Directions List</Text>
          </ScrollView>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overview: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    marginBottom: 0
  },
  image: {
    width: 155,
    height: 155,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "bold"
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },  
  body: {
    fontSize: 16,
    padding: 2
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 15,
    marginTop: 0
  },
  time: {
    alignItems: "center"
  },
  timeSummary: {
    margin: 15,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  tabContainer: {
    flexDirection: "row", 
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    backgroundColor: "#D9D9D9"
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabHeading: {
    color: "#222222",
    fontSize: 22,
    padding: 15
  },
  activeTab: {
    backgroundColor: "#E2E2E2",
    borderBottomColor: "#D75B3F",
    borderBottomWidth: 3
  }
});

export default RecipePage;
