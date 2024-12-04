import ToggleFavorite from "@/utils/ToggleFavorite";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

type Props = {
  word_id: string;
  word: string;
  definition?: string;
  is_favorite: string;
};

function word() {
  const { word_id, word, definition, is_favorite } =
    useLocalSearchParams<Props>();
  if (!word_id || !word) router.back();

  const player = useAudioPlayer(
    `https://spelly.jovantomovic.com/audio/tiktok/${word.toLowerCase()}.mp3`
  );
  const playSound = () => {
    player.seekTo(0);
    player.play();
  };

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
        <View style={styles.heading}>
          <Text style={styles.word}>{word}</Text>
          <TouchableOpacity onPress={playSound}>
            <MaterialCommunityIcons
              name="volume-high"
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.definition}>{definition}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
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
