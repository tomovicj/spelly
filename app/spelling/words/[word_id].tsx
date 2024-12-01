import ToggleFavorite from "@/utils/ToggleFavorite";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  word_id: string;
  word: string;
  definition?: string;
  is_favorite: string;
};

function word() {
  const { word_id, word, definition, is_favorite } = useLocalSearchParams<Props>();
  if (!word_id || !word) router.back();
  return (
    <>
      <Stack.Screen
        options={{
          title: word,
          headerRight: () => (
            <ToggleFavorite word_id={parseInt(word_id)}>
              <MaterialCommunityIcons
                name={is_favorite === "1" ? "star" : "star-outline"}
                size={32}
                color="yellow"
              />
            </ToggleFavorite>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.definition}>{definition}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
  },
  definition: {
    fontSize: 18,
  },
});

export default word;
