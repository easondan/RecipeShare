import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export const RecipeCard = ({ imageUrl, label }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: "2%",
  },
  textStyle: {
    fontSize: 10,
  },
});
