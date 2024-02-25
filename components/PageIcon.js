import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export const PageIcon = ({ imageUrl, label }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{label}</Text>
    </View>
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
    fontFamily: "barlow",
  },
});
