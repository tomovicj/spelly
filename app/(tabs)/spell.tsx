import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import getWordForSpelling from "@/utils/getWordForSpelling";
import { Word } from "@/utils/migrateDbIfNeeded";
import { useSQLiteContext } from "expo-sqlite";
import { useColors } from "@/context/ColorsContext";

const spell = () => {
  const colors = useColors();
  const db = useSQLiteContext();
  const [wordForSpelling, setWordForSpelling] = React.useState<Word>();
  React.useEffect(() => {
    getWordForSpelling(db).then((word) => setWordForSpelling(word));
  }, []);
  return (
    <View style={{...styles.container, backgroundColor: colors.primary }}>
      <Text style={{...styles.headerText, color: colors.neutral }}>Spelly</Text>
      <Link href={`/spelling/spell/${wordForSpelling?.word}`} asChild>
        <TouchableOpacity style={{...styles.button, backgroundColor: colors.secondary}}>
          <Text style={{...styles.buttonText, color: colors.neutral }}>Start Spelling</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/spelling/words" asChild>
        <TouchableOpacity style={{...styles.button,  backgroundColor: colors.secondary }}>
          <Text style={{...styles.buttonText, color: colors.neutral }}>List of Words</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: 300,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default spell;
