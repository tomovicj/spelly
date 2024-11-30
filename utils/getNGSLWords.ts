import path from "path";
import fs from "fs";

export type NGSLWord = {
  word: string;
  definition: string;
};

const getNGSLWords = (): NGSLWord[] => {
  const words: NGSLWord[] = [];
  const csvFilePath = path.join(
    __dirname,
    "../words/NGSL_1.2_with_English_definitions.csv"
  );
  const fileContent = fs.readFileSync(csvFilePath, "utf-8");
  const rows = fileContent.split("\n");

  for (const row of rows) {
    if (!row.trim()) continue;
    const [word, definition] = row.split(",");
    words.push({ word: word.trim(), definition: definition.trim() });
  }

  return words;
};

export default getNGSLWords;
