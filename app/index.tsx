import React from "react";
import { View, Button } from "react-native";
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
      <Link href="/spell" asChild>
        <Button title="Take me to the spelling" />
      </Link>
    </View>
  );
}
