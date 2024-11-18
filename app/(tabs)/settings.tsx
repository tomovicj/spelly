import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Href, useRouter } from "expo-router";

type SettingOption = {
  id: string;
  label: string;
  type: "switch" | "link";
  route?: Href;
};

const settingsOptions: SettingOption[] = [
  { id: "1", label: "Notifications", type: "switch" },
  { id: "2", label: "Dark Mode", type: "switch" },
  { id: "3", label: "Privacy Policy", type: "link" },
  { id: "4", label: "About Us", type: "link" },
];

type SettingsState = {
  [key: string]: boolean;
};

const Settings: React.FC = () => {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    darkMode: false,
  });

  const toggleSwitch = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = ({ item }: { item: SettingOption }) => {
    if (item.type === "switch") {
      const settingKey = item.label.toLowerCase().replace(" ", "");
      return (
        <View style={styles.settingItem}>
          <Text style={styles.label}>{item.label}</Text>
          <Switch
            value={settings[settingKey]}
            onValueChange={() => toggleSwitch(settingKey)}
          />
        </View>
      );
    }

    if (item.type === "link" && item.route) {
      return (
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => router.push(item.route!)}
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
        data={settingsOptions}
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

export default Settings;
