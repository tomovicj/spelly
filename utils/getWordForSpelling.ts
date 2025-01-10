import { SQLiteDatabase } from "expo-sqlite";
import { Word } from "./migrateDbIfNeeded";

type WordFromDb = Omit<Word, "is_favorite"> & { is_favorite: number };

const getWordForSpelling = async (db: SQLiteDatabase): Promise<Word> => {
    const word = await db.getFirstAsync<WordFromDb>("SELECT * FROM word ORDER BY RANDOM() LIMIT 1");
    if (!word) {
        throw new Error("No words found");
    }
    return {...word, is_favorite: word.is_favorite === 1};
}

export default getWordForSpelling;