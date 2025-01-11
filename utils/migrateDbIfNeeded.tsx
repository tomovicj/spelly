import { SQLiteDatabase } from "expo-sqlite";
import NGSLWords from "../words/NGSL_1.2_with_English_definitions.json";

export type Word = {
  id: number;
  word: string;
  definition?: string;
  is_favorite: boolean;
};

export type Attempt = {
  id: number;
  word_id: number;
  user_input: string;
  is_correct: boolean;
  timestamp: string;
};

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = result ? result.user_version : 0;
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  // DB version 0
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE word (
        id INTEGER PRIMARY KEY,
        word TEXT NOT NULL UNIQUE,
        definition TEXT,
        is_favorite BOOLEAN DEFAULT 0
      );
    `);
    await db.execAsync(`
      CREATE TABLE attempt (
        id INTEGER PRIMARY KEY,
        word_id INTEGER NOT NULL,
        user_input TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (word_id) REFERENCES word (id)
      );
    `);
    NGSLWords.forEach(async (word) => {
      await db.runAsync(
        "INSERT INTO word (word, definition) VALUES (?, ?)",
        word.word,
        word.definition
      );
    });
    currentDbVersion = 1;
  }
  // DB version 1
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default migrateDbIfNeeded;
