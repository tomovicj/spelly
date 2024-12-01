import { Pressable } from "react-native";
import { ReactNode } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ToggleFavorite = ({
  word_id,
  children,
}: {
  word_id: number;
  children: ReactNode;
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
  return <Pressable onPress={() => mutation.mutate()}>{children}</Pressable>;
};

export default ToggleFavorite;
