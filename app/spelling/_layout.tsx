import React from "react";
import { Stack } from "expo-router";

const spellingLayout = () => {
  return (<Stack>
    <Stack.Screen name="category/index" options={{title: "Categories"}}/>
    <Stack.Screen name="category/[category]" />
  </Stack>);
};

export default spellingLayout;
