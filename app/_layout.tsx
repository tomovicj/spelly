import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import migrateDbIfNeeded from "@/utils/migrateDbIfNeeded";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const queryClient = new QueryClient();

TimeAgo.addDefaultLocale(en);

export default function indexLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider databaseName="words.db" onInit={migrateDbIfNeeded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="spelling/words/index" options={{ headerTitle: "List of words" }} />
        </Stack>
      </SQLiteProvider>
    </QueryClientProvider>
  );
}
