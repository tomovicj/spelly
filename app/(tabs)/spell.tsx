import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import styles from "@/theme/styles";

export default function Index() {
  const [word, setWord] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wordLength, setWordLength] = useState<number>(5);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://random-word-api.herokuapp.com/word?lang=en&length=${wordLength}`
      );
      const word = response.data[0];
      setWord(word);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || "An Axios error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (word !== undefined) router.push(`/spelling/spell/${word}`);
  }, [word]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Spelling</Text>
      <Text style={styles.text}>
        Enter the length of the word you want to spell:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(length) => {
          const parsedLength = parseInt(length, 10);
          if (isNaN(parsedLength)) setWordLength(0);
          else setWordLength(parsedLength);
        }}
        value={wordLength.toString()}
        keyboardType="numeric"
        maxLength={2}
      />
      <Pressable onPress={() => fetchData()} style={styles.button}>
        <Text style={styles.text}>Start with spelling</Text>
      </Pressable>
    </View>
  );
}
