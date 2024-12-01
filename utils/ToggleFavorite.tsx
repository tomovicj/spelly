import { Pressable } from "react-native";
import { ReactNode } from "react";
import { useSQLiteContext } from "expo-sqlite";

const ToggleFavorite = ({
  word_id,
  children,
}: {
  word_id: number;
  children: ReactNode;
}) => {
  const db = useSQLiteContext();
  const toggle = async () => {
    await db.runAsync(
      "UPDATE word SET is_favorite = NOT is_favorite WHERE id = ?",
      word_id
    );
  };
  return <Pressable onPress={() => toggle()}>{children}</Pressable>;
};

export default ToggleFavorite;
