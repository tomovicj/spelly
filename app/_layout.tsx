import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="spell/[word]" options={{ title: "Spell the Word" }} />
    </Stack>
  );
}
