import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import migrateDbIfNeeded from "@/utils/migrateDbIfNeeded";

export default function indexLayout() {
  return (
    <SQLiteProvider databaseName="words.db" onInit={migrateDbIfNeeded}>
      <Slot />
    </SQLiteProvider>
  );
}
