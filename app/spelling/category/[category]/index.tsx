import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const Category = () => {
  const categoryId = useLocalSearchParams().category;
  return (
    <>
      {/* Show dynamic route title */}
      <Stack.Screen options={{ title: String(categoryId) }} />
      <View>
        <Text>Category: {categoryId}</Text>
      </View>
    </>
  );
};

export default Category;
