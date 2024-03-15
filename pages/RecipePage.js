import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, Button } from "react-native";

const RecipePage = ({ route }) => {
  const [showIngredients, setShowIngredients] = useState(true);
  const { data } = route.params;
  
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
        <Image source={{ uri: data.imageUrl }} style={styles.image} />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.recipeName}>{data.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <View>  
              <Text style={styles.header}>Author:</Text>
              <Text style={styles.header}>Course:</Text>
              <Text style={styles.header}>Cuisine:</Text>
              <Text style={styles.header}>Difficulty:</Text>
              <Text style={styles.header}>Servings:</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.body}>{data.author}</Text>
              <Text style={styles.body}>{data.course}</Text>
              <Text style={styles.body}>{data.cuisine}</Text>
              <Text style={styles.body}>{data.difficulty}</Text>
              <Text style={styles.body}>{data.servings}</Text>  
            </View>
          </View>
        </View>
      </View>
      <View style={styles.timeSummary}>
        <View style={styles.time}>
          <Text style={styles.header}>Prep Time</Text>
          <Text style={styles.body}>{minsToHours(data.prepTime)}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.header}>Cook Time</Text>
          <Text style={styles.body}>{minsToHours(data.cookTime)}</Text>
        </View>
        <View style={styles.time}>
          <Text style={styles.header}>Total Time</Text>
          <Text style={styles.body}>{minsToHours(Number(data.cookTime) + Number(data.prepTime))}</Text>
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.header}>Description:</Text>
        <Text style={styles.body}>{data.description}</Text> 
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
          <ScrollView style={styles.view}>
            {
              data.ingredients.map((item, i) => (
                <Text key={i} style={styles.viewText}>{i+1}.&ensp;{item}</Text>
              ))
            }
          </ScrollView>
        ) : (
          <ScrollView style={styles.view}>
            {
              data.directions.map((item, i) => (
                <Text key={i} style={styles.viewText}>{i+1}.&ensp;{item}</Text>
              ))
            }
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
    margin: 10,
    marginBottom: 0
  },
  image: {
    width: 155,
    height: 155,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 3,
  },  
  body: {
    fontSize: 14,
    padding: 3,
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
    borderBottomWidth: 3,
    borderBottomColor: "#D9D9D9",
    backgroundColor: "#F1F1F1",
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabHeading: {
    fontSize: 22,
    color: "#222222",
    letterSpacing: 1.5,
    padding: 13
  },
  activeTab: {
    backgroundColor: "#E2E2E2",
    borderBottomColor: "#D75B3F",
    borderBottomWidth: 3
  },
  view: {
    margin: 20,
    marginTop: 10,
  },
  viewText: {
    fontSize: 18,
    lineHeight: 35
  }
});

export default RecipePage;
