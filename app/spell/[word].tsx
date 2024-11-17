import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import * as Speech from "expo-speech";

export default function SpellWord() {
  const params = useLocalSearchParams();
  const word: string = (
    Array.isArray(params.word) ? params.word[0] : params.word
  ).toUpperCase();
  const [text, setText] = React.useState<string>("");
  const [showSolution, setShowSolution] = React.useState<boolean>(false);
  const speak = () => {
    Speech.speak(word);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      {showSolution ? (
        <Solution word={word} text={text} />
      ) : (
        <>
          <Text>Hear the word and type it in</Text>
          <Button title="Press to hear the word" onPress={speak} />
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
            }}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Button
            title="Submit the word"
            onPress={() => setShowSolution(true)}
          />
        </>
      )}
    </View>
  );
}

function Solution(props: { word: string; text: string }) {
  interface LetterCheck {
    letter: string;
    correct: boolean;
  }

  const checkText = (word: string, text: string): [boolean, LetterCheck[]] => {
    let correct = true;
    const letters: LetterCheck[] = [];
    for (let i = 0; i < word.length; i++) {
      const isCorrectLetter = word[i] === text[i]?.toUpperCase();
      letters.push({ letter: word[i], correct: isCorrectLetter });
      if (!isCorrectLetter) correct = false;
    }
    return [correct, letters];
  };

  const [correct, letters] = checkText(props.word, props.text);
  return (
    <>
      <Text>{correct ? "Well done!" : ":("}</Text>
      <Text>
        {letters.map((letter, index) => {
          return (
            <Text
              key={index}
              style={{
                color: letter.correct ? "green" : "red",
              }}
            >
              {letter.letter}
            </Text>
          );
        })}
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
        }}
        editable={false}
      >
        {props.text}
      </TextInput>
      <Link href="/" asChild>
        <Button title="Next" onPress={() => {}} />
      </Link>
    </>
  );
}
