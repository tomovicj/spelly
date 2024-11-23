import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const words = () => {
    const categoryId = useLocalSearchParams().category;
  return (
    <View>
      <Text>words - {categoryId}</Text>
    </View>
  )
}

export default words