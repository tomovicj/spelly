import { Pressable } from "react-native";
import { ReactNode } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ToggleFavorite = ({
  word_id,
  children,
  onPress,
}: {
  word_id: number;
  children: ReactNode;
  onPress?: () => void;
}) => {
  const queryClient = useQueryClient();
  const db = useSQLiteContext();
  const toggle = async () => {
    await db.runAsync(
      "UPDATE word SET is_favorite = NOT is_favorite WHERE id = ?",
      word_id
    );
  };

  const mutation = useMutation({
    mutationFn: toggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
  });

  const handlePress = () => {
    if (onPress) onPress();
    mutation.mutate();
  };

  return <Pressable onPress={handlePress}>{children}</Pressable>;
};

export default ToggleFavorite;
