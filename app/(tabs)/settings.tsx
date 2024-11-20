import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import settingsConfig, { SettingConfig } from "@/settings";
import { useSettings, Settings } from "@/context/SettingsContext";

const SettingsPage = () => {
  const router = useRouter();
  const { settings, changeSetting } = useSettings();

  const renderItem = ({ item }: { item: SettingConfig }) => {
    if (item.type === "switch") {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.label}>{item.label}</Text>
          <Switch
            value={settings[item.id] as boolean}
            onValueChange={() =>
              changeSetting(item.id, !settings[item.id] as boolean)
            }
          />
        </View>
      );
    }

    if (item.type === "link") {
      return (
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push(item.route)}
        >
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsConfig}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
