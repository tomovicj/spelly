import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ToggleFavorite from "@/utils/ToggleFavorite";
import { useRouter } from "expo-router";
import { Word } from "@/utils/migrateDbIfNeeded";
import colors from "@/theme/colors";

const WordListRow = ({ wordData }: { wordData: Word }) => {
  const router = useRouter();
  const [isFavoriteState, setIsFavoriteState] = React.useState<boolean>(
    wordData.is_favorite
  );

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/spelling/words/[word_id]",
          params: {
            word_id: wordData.id,
            ...wordData,
            is_favorite: wordData.is_favorite ? 1 : 0,
          },
        })
      }
    >
      <View style={styles.item}>
        <View style={styles.itemLeftPart}>
          <ToggleFavorite
            word_id={wordData.id}
            onPress={() => setIsFavoriteState((state) => !state)}
          >
            <MaterialCommunityIcons
              name={isFavoriteState ? "star" : "star-outline"}
              size={32}
              color={colors.accent}
            />
          </ToggleFavorite>
          <Text style={styles.wordText}>{wordData.word}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colors.primary,
  },
  wordText: {
    fontSize: 18,
    alignSelf: "center",
    color: colors.primary,
  },
  itemLeftPart: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});

export default WordListRow;
