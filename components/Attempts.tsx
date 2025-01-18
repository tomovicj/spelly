import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Attempt, Word } from "@/utils/migrateDbIfNeeded";
import { buildDateTime } from "@/utils/buildDateTime";
import colors from "@/theme/colors";
import { useQuery } from "@tanstack/react-query";

const Attempts = ({
  word_id,
  style,
}: {
  word_id: string;
  style: StyleProp<ViewStyle>;
}) => {
  const db = useSQLiteContext();
  const { isPending, error, data } = useQuery<Attempt[]>({
    queryKey: ["attempts", word_id],
    queryFn: () =>
      db.getAllAsync(
        "SELECT * FROM attempt WHERE word_id = ? LIMIT 20",
        word_id
      ),
  });

  const { data: word, error: wordError } = useQuery<Word | null>({
    queryKey: ["word", word_id],
    queryFn: () => db.getFirstAsync("SELECT * FROM word WHERE id = ?", word_id),
  });

  if (error || wordError) {
    console.error(error || wordError);
  }

  if (!data || !word) return null;

  return (
    <View style={style}>
      <Text style={styles.title}>Attempts:</Text>
      <FlatList<Attempt>
        data={data}
        renderItem={({ item }) => (
          <AttemptTableRow word={word} attempt={item} />
        )}
        keyExtractor={(attempt) => String(attempt.id)}
      />
    </View>
  );
};

const AttemptTableRow = ({
  word,
  attempt,
}: {
  word: Word;
  attempt: Attempt;
}) => {
  return (
    <View style={styles.trow}>
      <Text style={styles.text}>
        {Array.from(attempt.user_input).map((letter, index) => (
          <Text
            key={index}
            style={{ color: letter === word.word[index] ? "green" : "red" }}
          >
            {letter}
          </Text>
        ))}
      </Text>
      <Text>{buildDateTime(attempt.timestamp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  text: {
    color: colors.primary,
  },
});

export default Attempts;
