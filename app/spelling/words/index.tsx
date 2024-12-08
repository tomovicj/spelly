import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useQuery } from "@tanstack/react-query";
import { Word } from "@/utils/migrateDbIfNeeded";
import { Link } from "expo-router";
import WordListRow from "@/components/WordListRow";
import WordListFilter, { WordFilters } from "@/components/WordListFilter";
import colors from "@/theme/colors";

const wordList = () => {
  const [wordFilters, setWordFilters] = useState<WordFilters>({
    searchText: "",
    sortOrder: "asc",
    onlyFavorites: false,
  });

  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  const db = useSQLiteContext();
  const { isPending, error, data } = useQuery<Word[]>({
    queryKey: ["words"],
    queryFn: () => db.getAllAsync("SELECT * FROM word ORDER BY word"),
  });

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter(word => {
      if (wordFilters.onlyFavorites && !word.is_favorite) return false;
      if (wordFilters.searchText && !word.word.includes(wordFilters.searchText.toUpperCase())) return false;
      return true;
    });

    if (wordFilters.sortOrder === "desc") filtered.reverse();

    setFilteredWords(filtered);
  }, [data, wordFilters])

  if (isPending)
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>An error has occurred: {error.message}</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Go back</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );

  return (
    <>
      <WordListFilter filters={wordFilters} setFilters={setWordFilters} />
      <View style={styles.container}>
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WordListRow wordData={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.neutral,
  },
  title: {
    fontSize: 32,
  },
  text: {
    alignSelf: "center",
    color: colors.primary,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

export default wordList;
