import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
    <View>
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
              <Text style={styles.body}>Japanese</Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
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
    // marginTop: 0
  },
  time: {
    // justifyContent: "center",
    // alignContent: "center",
    alignItems: "center"
  },
  timeSummary: {
    margin: 15,
    // marginTop: 5,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default RecipePage;
