import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import colors from "@/theme/colors";
import getWordForSpelling from "@/utils/getWordForSpelling";
import { Word } from "@/utils/migrateDbIfNeeded";
import { useSQLiteContext } from "expo-sqlite";

const spell = () => {
  const db = useSQLiteContext();
  const [wordForSpelling, setWordForSpelling] = React.useState<Word>();
  React.useEffect(() => {
    getWordForSpelling(db).then((word) => setWordForSpelling(word));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Spelly</Text>
      <Link href={`/spelling/spell/${wordForSpelling?.word}`} asChild>
        <TouchableOpacity style={{...styles.button, backgroundColor: colors.secondary}}>
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
    backgroundColor: colors.neutral,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 300,
  },
  buttonText: {
    color: colors.neutral,
    fontSize: 16,
    textAlign: "center",
  },
});

export default spell;
