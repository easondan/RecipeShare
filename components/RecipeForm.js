import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import FormField from "../components/FormField";
import TimeSelectFields from "../components/TimeSelectFields";
import SelectField from "../components/SelectField";
import UploadIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import DynamicInputList from "../components/DynamicInputList";
import { supabase } from "../lib/supabase";
import { decode } from "base64-arraybuffer";

const RecipeForm = ({ checkAdd, label, recipe }) => {
  const AddOrEditRecipe = async () => {
    const value = await supabase.auth.getUser();
    const { data: profilesData, error: profilesError } = await supabase
      .from("users")
      .select()
      .eq("id", value.data.user.id);
    let imageUrl = "";
    let sendData = {
      imageUrl: recipe!=null ? recipe.imageUrl :"",
      name: formData.recipeName,
      description: formData.recipeDescription,
      cuisine: formData.cuisineType,
      course: formData.course,
      difficulty: formData.difficulty,
      prepTime: Number(formData.prepHour) * 60 + Number(formData.prepMin),
      cookTime: Number(formData.cookHour) * 60 + Number(formData.cookMin),
      servings: formData.servings,
      ingredients: formData.ingredients.map((item) => item.value!=null ? item.value : item),
      directions: formData.directions.map((item) => item.value!=null ? item.value : item ),
      author: profilesData[0].full_name,
    };
    // imageUrl: link.publicUrl,
    if (checkAdd == true) {
      // console.log(formData);

      console.log(sendData);
      await supabase.from("recipes").insert(sendData);
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("id")
        .match({ owner_id: value.data.user.id });
      console.log(recipeData[recipeData.length - 1].id);
      const recipeId = recipeData[recipeData.length - 1].id;
      if (selectedImage !== null) {
        const { error: uploadImageError } = await supabase.storage
          .from("avatars")
          .upload(
            value.data.user.id + "/myRecipe/" + recipeId + ".jpg",
            decode(selectedImage),
            {
              contentType: "image/png",
            }
          );
        if (uploadImageError) {
          Alert.alert("Unable to upload image");
          console.log(uploadImageError2);
          imageUrl =
            "https://ixdiitlvaifwubdmmozg.supabase.co/storage/v1/object/public/avatars/public/filler.jpg";
          return;
        } else {
          const { data: link, error: errorlink } = await supabase.storage
            .from("avatars")
            .getPublicUrl(
              value.data.user.id + "/myRecipe/" + recipeId + ".jpg"
            );
          imageUrl = link.publicUrl;
        }
      } else {
        imageUrl =
          "https://ixdiitlvaifwubdmmozg.supabase.co/storage/v1/object/public/avatars/public/filler.jpg";
      }

      const { error } = await supabase
        .from("recipes")
        .update({ imageUrl: imageUrl })
        .eq("id", recipeId);

    } else {
      console.log(value.data.user.id + "/myRecipe/" + recipe.id + ".jpg");

      const { error: uploadImageError } = await supabase.storage
        .from("avatars")
        .update(
          value.data.user.id + "/myRecipe/" + recipe.id + ".jpg",
          decode(selectedImage),
        );
      if (uploadImageError) {
        console.log(uploadImageError);
        Alert.alert("Unable to upload image");
        imageUrl =
          "https://ixdiitlvaifwubdmmozg.supabase.co/storage/v1/object/public/avatars/public/filler.jpg";
        return;
      } else {
        const { data: link, error: errorlink } = await supabase.storage
          .from("avatars")
          .getPublicUrl(value.data.user.id + "/myRecipe/" + recipe.id + ".jpg");
        sendData.imageUrl = link.publicUrl;
      }
      const {data , error} = await supabase.from("recipes").update(sendData).eq("id", recipe.id);
    }
    navigation.navigate("RecipeHome");
  };
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(
    recipe ? recipe.imageUrl : null
  );
  const [selectedImageUri, setSelectedImageUri] = useState(
    recipe ? recipe.imageUrl : null
  );
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
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      let manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,

        [{ resize: { width: 500, height: 500 } }],
        { format: "jpeg", base64: true }
      );

      setSelectedImage(manipResult.base64);
      setSelectedImageUri(manipResult.uri);
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
                <Image
                  source={{ uri: selectedImageUri }}
                  style={styles.image}
                />
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
          label="Cuisine Type"
          value={formData.cuisineType}
          onChangeText={(value) => handleInputChange("cuisineType", value)}
        />
        <SelectField
          label="Course Type"
          data={courseType}
          onSelect={(value) => handleInputChange("course", value)}
          editData={
            courseType[
              courseType.findIndex((course) => course.value === formData.course)
            ]
          }
        />
        <SelectField
          label="Difficulty"
          data={difficultyType}
          onSelect={(value) => handleInputChange("difficulty", value)}
          editData={
            difficultyType[
              difficultyType.findIndex(
                (difficulty) => difficulty.value === formData.difficulty
              )
            ]
          }
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
          editHour={recipe ? hours[formData.prepHour - 1] : null}
          editMinute={recipe ? minutes[formData.prepMin - 1] : null}
        />
        <TimeSelectFields
          label="Cooking Time"
          hours={hours}
          minutes={minutes}
          formData={formData}
          setFormData={setFormData}
          isCookingTime
          editHour={recipe ? hours[formData.cookHour - 1] : null}
          editMinute={recipe ? minutes[formData.cookMin - 1] : null}
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
        <TouchableOpacity style={styles.createButton} onPress={AddOrEditRecipe}>
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
    backgroundColor: "white",
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
    marginTop: 20,
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
    marginTop: 0,
  },
});

export default RecipeForm;
