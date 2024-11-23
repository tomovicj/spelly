import React from "react";
import { Stack } from "expo-router";

const spellingLayout = () => {
  return (<Stack>
    <Stack.Screen name="category/index" options={{title: "Categories"}}/>
    <Stack.Screen name="category/[category]/index" />
    <Stack.Screen name="category/[category]/words" />
  </Stack>);
};

export default spellingLayout;
