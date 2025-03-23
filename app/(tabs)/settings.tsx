import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import settingsConfig from "@/settings";
import SettingsItem from "@/components/SettingsItem";
import { useColors } from "@/context/ColorsContext";

const SettingsPage = () => {
  const colors = useColors();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primary }}>
      <FlatList
        data={settingsConfig}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <SettingsItem id={item.key} label={item.label} type={item.type} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsPage;
