import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useQuery } from "@tanstack/react-query";
import { Word } from "@/utils/migrateDbIfNeeded";
import { Link } from "expo-router";

const words = () => {
  const db = useSQLiteContext();
  const { isPending, error, data } = useQuery<Word[]>({
    queryKey: ["words"],
    queryFn: () => db.getAllAsync("SELECT * FROM word"),
  });

  if (isPending)
    return (
      <View>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>An error has occurred: {error.message}</Text>
        <Link href="/">
          <TouchableOpacity>
            <Text>Go back</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.word}</Text>
          </View>
        )}
      />
      <Text>words</Text>
    </View>
  );
};

export default words;
