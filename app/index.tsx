import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import * as Speech from "expo-speech";
import { green } from "react-native-reanimated/lib/typescript/Colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link
        href={{
          pathname: '/spell/[word]',
          params: { word: "test" },
        }}
        asChild
      >
        <Button title="Take me to the test" />
      </Link>
    </View>
  );
}
