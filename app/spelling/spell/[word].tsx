import React from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAudioPlayer } from "expo-audio"
import styles from "@/theme/styles";

export default function SpellWord() {
  const params = useLocalSearchParams<{ word?: string }>();
  const word: string | undefined = params.word?.toUpperCase();

  if (!word) {
    router.replace("/spell");
    return null;
  }

  const [text, setText] = React.useState<string>("");
  const [showSolution, setShowSolution] = React.useState<boolean>(false);

  const player = useAudioPlayer("https://spelly.jovantomovic.com/audio/tiktok/" + word.toLowerCase() + ".mp3");
  const playSound = () => {
    player.seekTo(0);
    player.play();
  };

  if (showSolution) {
    return <Solution word={word} text={text} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hear the word and type it in</Text>
      <Pressable onPress={playSound} style={styles.button}>
        <Text style={styles.buttonText}>Press to hear the word</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Pressable onPress={() => setShowSolution(true)} style={styles.button}>
        <Text style={styles.buttonText}>Submit the word</Text>
      </Pressable>
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

    if (word.length != text.length) correct = false;

    for (let i = 0; i < word.length; i++) {
      const isCorrectLetter = word[i] === text[i]?.toUpperCase();
      letters.push({ letter: word[i], correct: isCorrectLetter });
      if (!isCorrectLetter) correct = false;
    }
    return [correct, letters];
  };

  const [correct, letters] = checkText(props.word, props.text);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{correct ? "Well done!" : ":("}</Text>
      <Text style={styles.textXL}>
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
      <TextInput style={styles.input} editable={false}>
        {props.text.toUpperCase()}
      </TextInput>
      <Pressable
        onPress={() => {
          router.back();
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Back</Text>
      </Pressable>
    </View>
  );
}
