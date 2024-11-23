import { View, Text, StyleSheet } from "react-native";
import React from "react";
// import styles from '@/theme/styles'

const CategoryCard = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <View style={styles.separator} />
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
    
  },
  cardDescription: {
    fontSize: 16,
    padding: 10,
  },
  separator: {
    height: 2,
    backgroundColor: "#000",
  },
});

export default CategoryCard;
