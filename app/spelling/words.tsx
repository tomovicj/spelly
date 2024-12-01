import React from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToggleFavorite from "@/utils/ToggleFavorite";

const words = () => {
  const db = useSQLiteContext();
  const { isPending, error, data } = useQuery<Word[]>({
    queryKey: ["words"],
    queryFn: () => db.getAllAsync("SELECT * FROM word ORDER BY word"),
  });

  if (isPending)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.container}>
        <Text>An error has occurred: {error.message}</Text>
        <Link href="/">
          <TouchableOpacity>
            <Text>Go back</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.word}</Text>
            <ToggleFavorite word_id={item.id}>
              <MaterialCommunityIcons
                name={item.is_favorite ? "star" : "star-outline"}
                size={32}
                color="yellow"
              />
            </ToggleFavorite>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  itemText: {
    fontSize: 18,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
  },
});

export default words;
