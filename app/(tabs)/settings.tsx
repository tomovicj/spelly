import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import settingsConfig, { SettingsConfig } from "@/settings";
import { SettingsContext } from "@/context/SettingsContext";
import SettingsItem from "@/components/SettingsItem";


const SettingsPage = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  return (
    <View style={styles.container}>
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
    backgroundColor: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsPage;
