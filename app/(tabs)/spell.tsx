import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const spell = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spelly</Text>
      <Link href="/spelling/spell/test" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Spelling</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/spelling/words" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>List of Words</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 300,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
});

export default spell;
