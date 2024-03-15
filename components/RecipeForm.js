import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FormField from "../components/FormField";
import TimeSelectFields from "../components/TimeSelectFields";
import SelectField from "../components/SelectField";
import UploadIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import DynamicInputList from "../components/DynamicInputList";

const RecipeForm = ({onPress,label,recipe}) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(recipe ? recipe.imageUrl : null);
  const convertTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };
  const [formData, setFormData] = useState(() => {
    if (recipe) {
      const prepTimeConverted = convertTime(parseInt(recipe.prepTime, 10));
      const cookTimeConverted = convertTime(parseInt(recipe.cookTime, 10));

      return {
        authorName: recipe.author || "",
        recipeName: recipe.name || "",
        recipeDescription: recipe.description || "",
        cuisineType: recipe.cuisine || "",
        course: recipe.course || "",
        difficulty: recipe.difficulty || "",
        prepTime: recipe.prepTime || "",
        servings: recipe.servings || "",
        ingredients: recipe.ingredients || [],
        directions: recipe.directions || [],
        prepHour: prepTimeConverted.hours || 0,
        prepMin: prepTimeConverted.minutes || 0,
        cookHour: cookTimeConverted.hours || 0,
        cookMin: cookTimeConverted.minutes || 0,
      };
    } else {
      return {
        authorName: "",
        recipeName: "",
        recipeDescription: "",
        cuisineType: "",
        course: "",
        difficulty: "",
        prepTime: "",
        servings: "",
        ingredients: [],
        directions: [],
        prepHour: 0,
        prepMin: 0,
        cookHour: 0,
        cookMin: 0,
      };
    }
  });




  // const [ingredients, setIngredients] = useState([]);
  // const [directions, setDirections] = useState([]);

  const courseType = [
    { key: "1", value: "Breakfast" },
    { key: "2", value: "Lunch" },
    { key: "3", value: "Dinner" },
    { key: "4", value: "Dessert" },
  ];

  const difficultyType = [
    { key: "1", value: "Easy" },
    { key: "2", value: "Medium" },
    { key: "3", value: "Hard" },
  ];

  const timeOptions = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, index) => ({
      key: `${index + start}`,
      value: `${index + start}`,
    }));

  const hours = timeOptions(1, 24);
  const minutes = timeOptions(1, 60);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Placeholder for a function to create a recipe


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.imageContainer}>
          <Text>Recipe Image</Text>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.frame}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.imageText}>
                    Upload a Recipe Image {"\n\n"}
                    <UploadIcon name="upload" size={30} color="black" />
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <FormField
          label="Recipe Name"
          value={formData.recipeName}
          onChangeText={(value) => handleInputChange("recipeName", value)}
        />
        <FormField
          label="Recipe Description"
          value={formData.recipeDescription}
          onChangeText={(value) =>
            handleInputChange("recipeDescription", value)
          }
          multiline
        />
        <FormField
          label="Author Name"
          value={formData.authorName}
          onChangeText={(value) => handleInputChange("authorName", value)}
        />
        <FormField
          label="Cuisine Type"
          value={formData.cuisineType}
          onChangeText={(value) => handleInputChange("cuisineType", value)}
        />
        <SelectField
          label="Course Type"
          data={courseType}
          onSelect={(value) => handleInputChange("course", value)}
          editData = {courseType[courseType.findIndex(course => course.value === formData.course)]}
        />
        <SelectField
          label="Difficulty"
          data={difficultyType}
          onSelect={(value) => handleInputChange("difficulty", value)}
          editData = {difficultyType[difficultyType.findIndex(difficulty => difficulty.value === formData.difficulty)]}
        />
        <FormField
          label="Servings"
          value={formData.servings}
          onChangeText={(value) => handleInputChange("servings", value)}
        />
        <TimeSelectFields
          label="Preparation Time"
          hours={hours}
          minutes={minutes}
          formData={formData}
          setFormData={setFormData}
          editHour={recipe ? hours[formData.prepHour-1]:null}
          editMinute={recipe ? minutes[formData.prepMin-1]:null}
        />
        <TimeSelectFields
          label="Cooking Time"
          hours={hours}
          minutes={minutes}
          formData={formData}
          setFormData={setFormData}
          isCookingTime
          editHour={recipe ? hours[formData.cookHour-1]: null}
          editMinute={recipe ? minutes[formData.cookMin-1]:null}
        />
        <DynamicInputList
          placeholder="Ingredient"
          items={formData.ingredients}
          setItems={(newItems) =>
            setFormData({ ...formData, ingredients: newItems })
          }
        />

        <DynamicInputList
          placeholder="Direction"
          items={formData.directions}
          setItems={(newItems) =>
            setFormData({ ...formData, directions: newItems })
          }
        />
        <TouchableOpacity style={styles.createButton} onPress={onPress}>
          <Text style={styles.createButtonText}>{label} Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor:'white'
  },
  scrollView: {
    width: "100%",
  },
  createButton: {
    backgroundColor: "#D75B3F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    alignSelf: "center",
    width: "60%",
  },
  createButtonText: {
    color: "white",
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  frame: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    textAlign: "center",
    fontSize: 15,
  },
  image: {
    width: 150,
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
    marginTop: 20,
  },
});

export default RecipeForm;
